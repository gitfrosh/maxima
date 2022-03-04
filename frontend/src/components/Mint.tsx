import { ethers } from "ethers";
import contractAbi from "../abi/Maxima.json";
import { useState } from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { v4 as uuidv4 } from "uuid";
import testpic from "../testpic.png";
const { REACT_APP_FLEEK_KEY, REACT_APP_FLEEK_SECRET } = process.env;

const Mint = () => {
  const [isMinting, toggleMint] = useState(false);

  const askContractToMintNft = async () => {
    toggleMint(true);
    try {
      if (REACT_APP_FLEEK_SECRET && REACT_APP_FLEEK_KEY) {
        const date = new Date();
        const timestamp = date.getTime();
        const newTokenId = uuidv4();
        const input = await fleekStorage.upload({
          apiKey: REACT_APP_FLEEK_KEY,
          apiSecret: REACT_APP_FLEEK_SECRET,
          key: `nft/${newTokenId}-${timestamp}`,
          data: testpic,
        });
        console.log(input);
        toggleMint(false);
        // createNFTTransaction(hash)
      }
    } catch (e) {
      console.error(e);
      toggleMint(false);
    }
    // try {
    //   const { ethereum } = window;

    //   if (ethereum) {
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //     const signer = provider.getSigner();
    //     const connectedContract = new ethers.Contract(
    //       "0x7b7127Da4419656e2D76Ec3104605ba7B1F29Ca1",
    //       contractAbi.abi,
    //       signer
    //     );

    //     console.log("Going to pop wallet now to pay gas...");
    //     let nftTxn = await connectedContract.makeWordleNFT();

    //     console.log("Mining...please wait.");
    //     await nftTxn.wait();
    //     console.log(nftTxn);
    //     console.log(
    //       `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
    //     );
    //     toggleMint(false);
    //   } else {
    //     console.log("Ethereum object doesn't exist!");
    //     toggleMint(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toggleMint(false);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto md:px-1 px-3">
      {!isMinting ? (
        <button
          className="bg-teal-600 hover:bg-teal-500 hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4 rounded-full"
          onClick={() => askContractToMintNft()}
        >
          Mint NFT now!
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
