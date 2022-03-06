import Footer from "./components/Footer";
import Header from "./components/Header";
import Account from "./components/Account";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { useState } from "react";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");


function App() {
  const { account } = useEthers();
  const [chainAlert, setChainAlert] = useState(false);

  provider.on("network", (newNetwork, oldNetwork) => {
    if (newNetwork?.name !== "rinkeby" ) {
      setChainAlert(true)
    } else {
      setChainAlert(false)

    }
});
  return (
    <div className="text-teal-600 bg-[#FFFFFF]">
      <Header />

      <section className="text-gray-600 body-font">
        <div className="max-w-5xl pt-32 pb-24 mx-auto">
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
          <p>This app currently lives on Rinkeby. Please change chain network.</p>
        </div>
      ) : null}
          {account ? (
              <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-4 text-black-400 text-center">
              Welcome back `${account.slice(0, 6)}...$
              {account.slice(account.length - 4, account.length)}`!
            </h2>
          ) : null}
          {!account ? (
            <>
        <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-[#1D3557] lg:text-7xl md:text-6xl">
              The Wordle that gives back!
              </h2>
             
              <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-black-400 text-center">
                To get started with today's Wordle, simply connect your wallet
                to play. <br />
              </h2>
            </>
          ) : null}
          <div className="ml-6 text-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline">
            <div className="flex text-lg">
              <Account chainAlert={chainAlert} provider={provider} />
            </div>
          </div>
        </div>

        <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
          By minting your Wordle result on the blockchain, it directly helps one
          of these great charities:
        </p>
       
        <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
          <div className="ktq4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path d="M130.7 313.9C126.5 300.4 137.8 288 151.1 288H364.5C378.7 288 389.9 300.4 385.8 313.9C368.1 368.4 318.2 408 258.2 408C198.2 408 147.5 368.4 130.7 313.9V313.9zM208.4 192C208.4 209.7 194 224 176.4 224C158.7 224 144.4 209.7 144.4 192C144.4 174.3 158.7 160 176.4 160C194 160 208.4 174.3 208.4 192zM281.9 214.6C273.9 207 273.5 194.4 281 186.3C295.6 170.8 316.3 164 335.6 164C354.1 164 375.7 170.8 390.2 186.3C397.8 194.4 397.4 207 389.3 214.6C381.2 222.1 368.6 221.7 361 213.7C355.6 207.8 346.3 204 335.6 204C324.1 204 315.7 207.8 310.2 213.7C302.7 221.7 290 222.1 281.9 214.6zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </svg>
            <h3 className="pt-3 font-bold text-lg text-[#1D3557]">
              Charity #1
            </h3>
            <p className="pt-2 value-text text-md text-[#F1FAEE] fkrr1">
              This is where information regarding the organization/charity goes.
              For now, this is simply placeholder text, as we are waiting to
              hear back from a few educational charities. As such, this is just
              to function as a section placeholder until the project moves
              closer to completion.
            </p>
          </div>
          <div className="ktq4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path d="M130.7 313.9C126.5 300.4 137.8 288 151.1 288H364.5C378.7 288 389.9 300.4 385.8 313.9C368.1 368.4 318.2 408 258.2 408C198.2 408 147.5 368.4 130.7 313.9V313.9zM208.4 192C208.4 209.7 194 224 176.4 224C158.7 224 144.4 209.7 144.4 192C144.4 174.3 158.7 160 176.4 160C194 160 208.4 174.3 208.4 192zM281.9 214.6C273.9 207 273.5 194.4 281 186.3C295.6 170.8 316.3 164 335.6 164C354.1 164 375.7 170.8 390.2 186.3C397.8 194.4 397.4 207 389.3 214.6C381.2 222.1 368.6 221.7 361 213.7C355.6 207.8 346.3 204 335.6 204C324.1 204 315.7 207.8 310.2 213.7C302.7 221.7 290 222.1 281.9 214.6zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </svg>
            <h3 className="pt-3 font-bold text-lg text-[#1D3557]">
              Charity #2
            </h3>
            <p className="pt-2 value-text text-md text-[#F1FAEE] fkrr1">
              This is where information regarding the organization/charity goes.
              For now, this is simply placeholder text, as we are waiting to
              hear back from a few educational charities. As such, this is just
              to function as a section placeholder until the project moves
              closer to completion.
            </p>
          </div>
          <div className="ktq4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path d="M130.7 313.9C126.5 300.4 137.8 288 151.1 288H364.5C378.7 288 389.9 300.4 385.8 313.9C368.1 368.4 318.2 408 258.2 408C198.2 408 147.5 368.4 130.7 313.9V313.9zM208.4 192C208.4 209.7 194 224 176.4 224C158.7 224 144.4 209.7 144.4 192C144.4 174.3 158.7 160 176.4 160C194 160 208.4 174.3 208.4 192zM281.9 214.6C273.9 207 273.5 194.4 281 186.3C295.6 170.8 316.3 164 335.6 164C354.1 164 375.7 170.8 390.2 186.3C397.8 194.4 397.4 207 389.3 214.6C381.2 222.1 368.6 221.7 361 213.7C355.6 207.8 346.3 204 335.6 204C324.1 204 315.7 207.8 310.2 213.7C302.7 221.7 290 222.1 281.9 214.6zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </svg>
            <h3 className="pt-3 font-bold text-lg text-[#1D3557]">
              Charity #3
            </h3>
            <p className="pt-2 value-text text-md text-[#F1FAEE] fkrr1">
              This is where information regarding the organization/charity goes.
              For now, this is simply placeholder text, as we are waiting to
              hear back from a few educational charities. As such, this is just
              to function as a section placeholder until the project moves
              closer to completion.
            </p>
          </div>
          <div className="ktq4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path d="M130.7 313.9C126.5 300.4 137.8 288 151.1 288H364.5C378.7 288 389.9 300.4 385.8 313.9C368.1 368.4 318.2 408 258.2 408C198.2 408 147.5 368.4 130.7 313.9V313.9zM208.4 192C208.4 209.7 194 224 176.4 224C158.7 224 144.4 209.7 144.4 192C144.4 174.3 158.7 160 176.4 160C194 160 208.4 174.3 208.4 192zM281.9 214.6C273.9 207 273.5 194.4 281 186.3C295.6 170.8 316.3 164 335.6 164C354.1 164 375.7 170.8 390.2 186.3C397.8 194.4 397.4 207 389.3 214.6C381.2 222.1 368.6 221.7 361 213.7C355.6 207.8 346.3 204 335.6 204C324.1 204 315.7 207.8 310.2 213.7C302.7 221.7 290 222.1 281.9 214.6zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </svg>
            <h3 className="pt-3 font-bold text-lg text-[#1D3557]">
              Charity #4
            </h3>
            <p className="pt-2 value-text text-md text-[#F1FAEE] fkrr1">
              This is where information regarding the organization/charity goes.
              For now, this is simply placeholder text, as we are waiting to
              hear back from a few educational charities. As such, this is just
              to function as a section placeholder until the project moves
              closer to completion.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
