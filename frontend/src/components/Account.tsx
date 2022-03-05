import { useEthers } from "@usedapp/core";
import { useState } from "react";
import WordleEngine from "./Wordle/WordleEngine";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Authereum from "authereum";

const Account = () => {
  const { activate, deactivate, account } = useEthers();
  const [gameRunning, runGame] = useState(false);
  function handleConnectWallet() {
    activateProvider();
  }
  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          infuraId: "14a0951f47e646c1b241aa533e150219",
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: "FORTMATIC_KEY",
          network: {
            rpcUrl: "https://rpc-mainnet.maticvigil.com",
            chainId: 137,
          },
        },
      },
      authereum: {
        package: Authereum,
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
    } catch (error: any) {}
  };

  return (
    <div className="max-w-4xl mx-auto md:px-1 px-3">
      {account ? (
        <div className="ktq4">
          <h3 className="font-semibold text-lg text-[#1D3557]">
            Welcome back `${account.slice(0, 6)}...$
            {account.slice(account.length - 4, account.length)}`!
          </h3>
          <br />
          <p>
            <button
              onClick={deactivate}
              className="bg-[#A8DADC] hover:bg-[#1D3557] hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4 rounded-full"
            >
              Disconnect
            </button>
          </p>
          <br />
          {!gameRunning ? (
            <p>
              <button
                onClick={() => runGame(true)}
                className="bg-[#E63946] hover:bg-[#457B9D] hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4  rounded-full"
                type="button"
              >
                Play Wordle!
              </button>
            </p>
          ) : (
            <WordleEngine />
          )}
        </div>
      ) : (
        <button
        className="bg-[#E63946] hover:bg-[#457B9D] hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4  rounded-full"
        onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Account;
