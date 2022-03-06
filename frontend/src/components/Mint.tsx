import { useRef, useState } from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import contractAbi from "../abi/Maxima.json";
import { useEthers } from "@usedapp/core";
import { getGuessStatuses } from "./Wordle/lib/statuses";
import Charity from "./Charity";
import moment from "moment";
import Picker from "emoji-picker-react";

const { REACT_APP_FLEEK_KEY, REACT_APP_FLEEK_SECRET } = process.env;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "0x4e59c6eE5D27b3677253916E5d2491acBAFa2fCb";
const donation = ethers.utils.parseEther("0.00001");
const baseURI = "https://ipfs.fleek.co/ipfs";

type ResultProps = {
  guesses: string[];
  isGameWon: boolean;
};

type TEmoji = {
  emoji: string;
};

const charities = [
  {
    name: "Test Charity on Rinkeby",
    address: "0x03D28Df4b4c3a4bb1eA5D0a518E4D045172a6559",
    disabled: false,
  },
  {
    name: "UkraineDAO",
    address: "",
    disabled: true,
  },
  {
    name: "Room to Read",
    address: "",
    disabled: true,
  },
];

const Mint = ({ guesses, isGameWon }: ResultProps) => {
  const printRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { account } = useEthers();
  const [charity, setCharity] = useState(charities[0]);
  const [chosenEmoji, setChosenEmoji] = useState<TEmoji>();
  const [emojiPickerOpen, toggleEmojiPicker] = useState(false);

  const onEmojiClick = (event: any, emojiObject: TEmoji) => {
    setChosenEmoji(emojiObject);
    toggleEmojiPicker(false);
  };

  const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
    const rows = guesses?.map((guess, i) => {
      const status = getGuessStatuses(guess);
      const emoji = guess.split("").map((_, i) => {
        const isLastElement = i === guess.length - 1;
        switch (status[i]) {
          case "correct":
            return (
              <>
                <span>{tiles[0]}</span>
                {isLastElement && <br />}
              </>
            );
          case "present":
            return (
              <>
                <span>{tiles[1]}</span>
                {isLastElement && <br />}
              </>
            );
          default:
            return (
              <>
                <span>{tiles[2]}</span>
                {isLastElement && <br />}
              </>
            );
        }
      });
      return emoji;
    });
    return <>{rows}</>;
  };

  const [isMinting, toggleMint] = useState(false);
  const mintToken = async (medadataURI: string) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi.abi,
      signer
    );
    const result = await contract.mintAndDonate(charity.address, medadataURI, {
      value: donation,
    });
    return await result.wait();
  };

  async function storeImageAndMetadata(key: string, buffer: Buffer) {
    if (REACT_APP_FLEEK_SECRET && REACT_APP_FLEEK_KEY) {
      const input = await fleekStorage.upload({
        apiKey: REACT_APP_FLEEK_KEY,
        apiSecret: REACT_APP_FLEEK_SECRET,
        key: `nft/${key}`,
        data: buffer,
      });
      const metadata = {
        description: "A collection of proudly minted Wordle NFTs.",
        external_url: input.publicUrl,
        image: `${baseURI}/${input.hash}`,
        name: moment().format("MM/DD/YYYY"),
      };
      const metadataURI = await fleekStorage.upload({
        apiKey: REACT_APP_FLEEK_KEY,
        apiSecret: REACT_APP_FLEEK_SECRET,
        key: key,
        data: Buffer.from(JSON.stringify(metadata)),
      });
      return metadataURI;
    }
    throw Error("no env vars set fleek");
  }

  const askContractToMintNft = async () => {
    toggleMint(true);
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const createKey = async () => {
      const date = new Date();
      const timestamp = date.getTime();
      const newTokenId = uuidv4();
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return Buffer.from(
        `${address}-${newTokenId}-${timestamp}`,
        "binary"
      ).toString("base64");
    };
    const saveToIpfs = async (reader: any) => {
      const buffer = Buffer.from(reader.result);
      try {
        if (REACT_APP_FLEEK_SECRET && REACT_APP_FLEEK_KEY) {
          const key = await createKey();
          const metadataURI = await storeImageAndMetadata(key, buffer);
          await mintToken(`${baseURI}/${metadataURI.hash}`);
          toggleMint(false);
        }
      } catch (e) {
        console.error(e);
        toggleMint(false);
      }
    };
    canvas.toBlob(function (blob) {
      if (blob) {
        let reader: any = new FileReader();
        reader.onloadend = () => saveToIpfs(reader);
        reader.readAsArrayBuffer(blob);
      }
    });
  };

  return (
    <div className="grid place-items-center">
      {!emojiPickerOpen && (
        <div className="p-4 border" ref={printRef}>
          <p>
            New <b>Wordle</b> on the block
          </p>
          {generateEmojiGrid(guesses, ["💚", "💛", "🖤"])}
          <p>
            {moment().format("MM/DD/YYYY")} {chosenEmoji?.emoji || ''}
          </p>
        </div>
      )}
      <br />
      {!isMinting && account ? (
        <>
          <p>{isGameWon ? <b>Good job! 🚀</b> : <b>Nice try!</b>}</p>
          {emojiPickerOpen ? (
            <Picker onEmojiClick={onEmojiClick} />
          ) : (
            <button
              className="bg-[#457B9D] hover:bg-[#A8DADC] hover:text-white active:bg-teal-400  text-white py-1 px-3 rounded-full"
              onClick={() => toggleEmojiPicker(true)}
            >
              Click here to add your reaction!
            </button>
          )}
          {!emojiPickerOpen && (
            <div>
              <br />
              <br/>
              <p>Please choose a charity before minting.</p>
              <Charity
                charities={charities}
                setCharity={setCharity}
                charity={charity}
              />
      <br />
              <button
                className="bg-[#E63946] hover:bg-[#E63946] hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4 rounded-full"
                onClick={() => askContractToMintNft()}
              >
                Mint my Wordle result now!
              </button>
            </div>
          )}
        </>
      ) : (
        <span>
          <b>Processing...</b>
          <br /> (Follow instructions in your wallet)
        </span>
      )}
    </div>
  );
};

export default Mint;
