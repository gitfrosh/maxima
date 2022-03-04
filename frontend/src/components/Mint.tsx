import { useRef, useState } from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import contractAbi from "../abi/Maxima.json";

const { REACT_APP_FLEEK_KEY, REACT_APP_FLEEK_SECRET } = process.env;
const provider = new ethers.providers.Web3Provider(window.ethereum);

const Mint = () => {
  const [isMinting, toggleMint] = useState(false);
  const printRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const mintToken = async (metadataURI: string) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        contractAbi.abi,
        signer
    );
    const connection = contract.connect(signer);
    const result = await contract.payToMint(metadataURI, {
      value: ethers.utils.parseEther('0.0005')
    });

    await result.wait();
  };
  const askContractToMintNft = async () => {
    toggleMint(true);
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const saveToIpfs = async (reader: any) => {
      const buffer = Buffer.from(reader.result);
      console.log(buffer);
      try {
        if (REACT_APP_FLEEK_SECRET && REACT_APP_FLEEK_KEY) {
          const date = new Date();
          const timestamp = date.getTime();
          const newTokenId = uuidv4();
          const input = await fleekStorage.upload({
            apiKey: REACT_APP_FLEEK_KEY,
            apiSecret: REACT_APP_FLEEK_SECRET,
            key: `nft/${newTokenId}-${timestamp}`,
            data:  buffer,
          });
          console.log(input);
          // mintToken("https://ipfs.fleek.co/ipfs/bafybeibidatmi6aav7b6rud6p2agrymwfg2oed2kxfy4dapbgyd4fw3qxm");
          mintToken(input.publicUrl);
          // after final uploading to fleek, next step would be
          // to trigger connectedContract.makeWordleNFT() here, but with
          // image fleek/ipfs URI
          toggleMint(false);
        }
      } catch (e) {
        console.error(e);
        toggleMint(false);
      }
    };
    console.log(canvas);
    canvas.toBlob(function (blob) {
      if (blob) {
        let reader: any = new FileReader();
        reader.onloadend = () => saveToIpfs(reader);
        reader.readAsArrayBuffer(blob);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto md:px-1 px-3">
      <div style={{ background: "purple", height: 200 }} ref={printRef}>
        I will be in the image.
      </div>
      <br />
      {!isMinting ? (
        <button
          className="bg-teal-600 hover:bg-teal-500 hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4 rounded-full"
          onClick={() => askContractToMintNft()}
        >
          Send ugly purple div above as image to Fleek!
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="bg-teal-600 hover:bg-teal-500 hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4 rounded-full"
        >
          Processing...
        </button>
      )}
    </div>
  );
};

export default Mint;
