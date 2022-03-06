import { useEthers } from "@usedapp/core";
import Account from "../components/Account";
import { ethers } from "ethers";
import { useState } from "react";

const Home = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const { account } = useEthers();
  const [chainAlert, setChainAlert] = useState(false);

  provider.on("network", (newNetwork, oldNetwork) => {
    if (newNetwork?.name !== "rinkeby") {
      setChainAlert(true);
    } else {
      setChainAlert(false);
    }
  });
  return (
    <>
      <div className="max-w-5xl pt-32 mx-auto">
        {chainAlert ? (
          <div
            className=" mb-12 flex items-center bg-[#E63946] text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>
              This app currently lives on Rinkeby. Please change chain network.
            </p>
          </div>
        ) : null}
      </div>
      <div className="max-w-5xl pb-24 mx-auto">
        {!account ? (
          <>
            <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-[#1D3557] lg:text-7xl md:text-6xl">
              The Wordle that gives back!
            </h2>

            <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-black-400 text-center">
              To get started with today's Wordle, simply connect your wallet to
              play. <br />
            </h2>
          </>
        ) : null}
        <div className="ml-6 text-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline">
          <div className="flex text-lg">
            <Account chainAlert={chainAlert} provider={provider} />
          </div>
        </div>
      </div>

      <p className="mx-auto text-xl text-center text-[#000000] font-normal leading-relaxed fs521 lg:w-2/3">
        By minting your Wordle result on the blockchain, it directly helps one
        of these great charities:
      </p>

      <div className="pt-12 pb-64 max-w-4xl mx-auto fsac4 md:px-1 px-3">
        <div className="ktq4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h3 className="pt-3 font-bold text-lg text-[#FFFFFF]">Charity #1</h3>
          <p className="pt-2 value-text text-md text-[#FFFFFF] fkrr1">
          This is where information regarding the organization/charity goes. For now, this is simply placeholder text, as we are waiting to hear back from a few educational charities. As such, this is just to function as a section placeholder until the project moves closer to completion .
          </p>
        </div>
        <div className="ktq4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h3 className="pt-3 font-bold text-lg text-[#FFFFFF]">Charity #2</h3>
          <p className="pt-2 value-text text-md text-[#FFFFFF] fkrr1">
          This is where information regarding the organization/charity goes. For now, this is simply placeholder text, as we are waiting to hear back from a few educational charities. As such, this is just to function as a section placeholder until the project moves closer to completion .
          </p>
        </div>
        <div className="ktq4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h3 className="pt-3 font-bold text-lg text-[#FFFFFF]">Charity #3</h3>
          <p className="pt-2 value-text text-md text-[#FFFFFF] fkrr1">
          This is where information regarding the organization/charity goes. For now, this is simply placeholder text, as we are waiting to hear back from a few educational charities. As such, this is just to function as a section placeholder until the project moves closer to completion .
          </p>
        </div>
        <div className="ktq4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h3 className="pt-3 font-bold text-lg text-[#FFFFFF]">Charity #4</h3>
          <p className="pt-2 value-text text-md text-[#FFFFFF] fkrr1">
          This is where information regarding the organization/charity goes. For now, this is simply placeholder text, as we are waiting to hear back from a few educational charities. As such, this is just to function as a section placeholder until the project moves closer to completion .
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
