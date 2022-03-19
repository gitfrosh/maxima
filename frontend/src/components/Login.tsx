import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Authereum from "authereum";
import { useEthers } from "@usedapp/core";

const Login = ({runGame}: any) => {
  const { activate} = useEthers();
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
    } catch (error: any) {
      console.log(error)
    }
  };
  function handleConnectWallet() {
    activateProvider();
    runGame(false)
  }
  return (
    <button
      className="bg-[#E63946] hover:bg-[#457B9D] hover:text-white active:bg-teal-500  text-white font-bold py-2 px-4  rounded-full"
      onClick={handleConnectWallet}
    >
      Connect Wallet
    </button>
  );
};


export default Login