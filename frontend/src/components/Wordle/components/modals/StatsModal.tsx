import Countdown from "react-countdown";
import { StatBar } from "../stats/StatBar";
import { GameStats } from "../../lib/localStorage";
import { tomorrow } from "../../lib/words";
import { BaseModal } from "./BaseModal";
import { STATISTICS_TITLE, NEW_WORD_TEXT } from "../../constants/strings";
import Mint from "../../../Mint";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  gameStats: GameStats;
  isGameLost: boolean;
  isGameWon: boolean;
  handleShareToClipboard: () => void;
  provider: any;
};

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  provider,
}: Props) => {
  const GoAhead = () => (
    <>Go ahead and play your today's Wordle! You'll find your result here.</>
  );

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <GoAhead />
      </BaseModal>
    );
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {isGameLost || isGameWon ? (
        <Mint provider={provider} isGameWon={isGameWon} guesses={guesses} />
      ) : (
        <GoAhead />
      )}
    </BaseModal>
  );
};
