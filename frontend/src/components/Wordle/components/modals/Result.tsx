import { getGuessStatuses } from "../../lib/statuses";

type ResultProps = {
  guesses: string[];
};

const Result = ({ guesses }: ResultProps) => {
  const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
    console.log(guesses);
    const row = guesses
      ?.map((guess) => {
        const status = getGuessStatuses(guess);
        console.log(guess, status);
        const emoji = guess
          .split("")
          .map((_, i) => {
            console.log(_);

            switch (status[i]) {
              case "correct":
                return tiles[0];
              case "present":
                return tiles[1];
              default:
                return tiles[2];
            }
          })
          .join("\n");
        console.log(emoji);
        return emoji;
      })
      .join("\n");
    console.log(row);
    return row;
  };

  return (
    <div>
      <div style={{ width: "130px" }}>
        {generateEmojiGrid(guesses, ["💚", "💛", "🖤"])}
      </div>
    </div>
  );
};

export default Result;
