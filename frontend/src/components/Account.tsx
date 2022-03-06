import { useEthers } from "@usedapp/core";
import { useState } from "react";
import Login from "./Login";
import WordleEngine from "./Wordle/WordleEngine";


const Account = ({provider, chainAlert}: any) => {
  const { active, account } = useEthers();
  const [gameRunning, runGame] = useState(false);

  return (
    <div className="max-w-4xl mx-auto md:px-1 px-3">
      {account && active ? (
        <>
          <div>
            <br />
            {!gameRunning && !chainAlert ? (
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
              !chainAlert ? <WordleEngine provider={provider} /> : null
            )}
          </div>
        </>
      ) : (
       <Login runGame={runGame} />
      )}
    </div>
  );
};

export default Account;
