import { useState } from "react";
import Countdown from "react-countdown";
import { StatBar } from "../stats/StatBar";
import { GameStats } from "../../lib/localStorage";
import { tomorrow } from "../../lib/words";
import { BaseModal } from "./BaseModal";
import {
  STATISTICS_TITLE,
  NEW_WORD_TEXT,
} from "../../constants/strings";
import Result from "./Result";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  gameStats: GameStats;
  isGameLost: boolean;
  isGameWon: boolean;
  handleShareToClipboard: () => void;
  isHardMode: boolean;
  isDarkMode: boolean;
  isHighContrastMode: boolean;
};

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    );
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {(isGameLost || isGameWon) && (
        <>
          <div className="mt-5 mb-5 sm:mt-6 columns-2 dark:text-white content-center	">
            <div>
              <h5>{NEW_WORD_TEXT}</h5>
              <Countdown
                className="text-lg font-medium text-gray-900 dark:text-gray-100"
                date={tomorrow}
                daysInHours={true}
              />
            </div>
          </div>
          <div className="grid place-items-center">
          <Result guesses={guesses} />
</div>
          <div className="dark:text-white content-center	">
          </div>
        </>
      )}
    </BaseModal>
  );
};
