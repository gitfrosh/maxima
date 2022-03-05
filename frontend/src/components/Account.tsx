import { useEthers } from "@usedapp/core";
import { useState } from "react";
import WordleEngine from "./Wordle/WordleEngine";

const Account = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const [gameRunning, runGame] = useState(false);
  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return (
    <div className="max-w-4xl mx-auto md:px-1 px-3">
      {account ? (
        <div className="ktq4">
          <h3 className="font-semibold text-lg text-teal-600">
            Welcome back `${account.slice(0, 6)}...$
            {account.slice(account.length - 4, account.length)}`!
          </h3>
          <br />
          <p>
            <button
              onClick={deactivate}
              className="bg-teal-200 hhover:bg-teal-500 hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4 rounded-full"
            >
              Disconnect
            </button>
          </p>
          <br />
          {!gameRunning ? (
            <p>
              <button
                onClick={() => runGame(true)}
                className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-500 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
          className="bg-teal-200 hover:bg-teal-500 hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4  rounded-full"
          onClick={handleConnectWallet}
        >
          Connect with MetaMask
        </button>
      )}
    </div>
  );
};

export default Account;
