import { useEthers } from "@usedapp/core";
import { useState } from "react";
import Emoji from "./Emoji";
import Picker from "emoji-picker-react";

const Editor = ({ printRef }: any) => {
  const [chosenEmoji, setChosenEmoji] = useState<any>(null);
  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };
  return (
    <div className="flex flex-row">
        <div
        className="basis-1/2"
        style={{ background: "purple", height: 400, width: 400 }}
        ref={printRef}
      >
        <svg
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Emoji emoji={chosenEmoji?.emoji} />
        </svg>
      </div>
    <div style={{ marginLeft: 12 }} className="basis-1/2"><Picker onEmojiClick={onEmojiClick} /></div>
    {/* https://tailwind-elements.com/docs/standard/forms/range/ */}
 </div>
  
  );
};

export default Editor;
