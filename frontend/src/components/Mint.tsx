import React, {useRef, useState} from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import {v4 as uuidv4} from "uuid";
import html2canvas from "html2canvas";
import {Buffer} from "buffer";
import {ethers} from "ethers";
import contractAbi from "../abi/Maxima.json";

const {REACT_APP_FLEEK_KEY, REACT_APP_FLEEK_SECRET} = process.env;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const charity = "0x03D28Df4b4c3a4bb1eA5D0a518E4D045172a6559";
const contractAddress = "0x4e59c6eE5D27b3677253916E5d2491acBAFa2fCb";
const donation = ethers.utils.parseEther("0.00001");
const baseURI = "https://ipfs.fleek.co/ipfs";

const Mint = () => {
    const [isMinting, toggleMint] = useState(false);
    const printRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const mintToken = async (medadataURI: string) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            contractAbi.abi,
            signer
        );
        const result = await contract.mintAndDonate(charity, medadataURI, {
            value: donation
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
                "description": "A collection of proudly minted Wordle NFTs.",
                "external_url": input.publicUrl,
                "image": `${baseURI}/${input.hash}`,
                "name": "Wordle #1"
            }
            const metadataURI = await fleekStorage.upload({
                apiKey: REACT_APP_FLEEK_KEY,
                apiSecret: REACT_APP_FLEEK_SECRET,
                key: key,
                data: Buffer.from(JSON.stringify(metadata))
            });
            console.log(input);
            return metadataURI;
        }
        throw Error("no env vars set fleek");
    }
    class Result extends React.Component {
        render() {
            return (
                <div>hello wordle 4/6
                    <p>⬛🟨⬛⬛⬛</p>
                    <p>🟨⬛🟩⬛⬛</p>
                    <p>⬛⬛🟨⬛🟩</p>
                    <p>🟩🟩🟩🟩🟩</p>
                </div>
            );
        }
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
            const address = await signer.getAddress()
            return Buffer.from(`${address}-${newTokenId}-${timestamp}`, 'binary').toString('base64');
        }
        const saveToIpfs = async (reader: any) => {
            const buffer = Buffer.from(reader.result);
            try {
                if (REACT_APP_FLEEK_SECRET && REACT_APP_FLEEK_KEY) {
                    const key = await createKey();
                    console.log(key);
                    const metadataURI = await storeImageAndMetadata(key, buffer);
                    await mintToken(`${baseURI}/${metadataURI.hash}`);
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
            <div style={{background: "purple", height: 200}} ref={printRef}>
                <Result/>
            </div>
            <br/>
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
