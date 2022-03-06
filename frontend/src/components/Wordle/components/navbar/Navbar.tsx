import {  InformationCircleIcon } from "@heroicons/react/outline";
import { GAME_TITLE } from "../../constants/strings";

type Props = {
  setIsInfoModalOpen: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
};

export const Navbar = ({ setIsInfoModalOpen, setIsStatsModalOpen }: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <p className="text-xl ml-2.5 font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
          <button
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              setIsStatsModalOpen(true)
            } }
            className="bg-[#E63946] hover:bg-[#457B9D] hover:text-white active:bg-teal-500  text-white font-bold py-1y px-4  rounded-full"
          >
            Show result!
          </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
