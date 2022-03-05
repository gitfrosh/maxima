import { useRef, useState } from "react";
import DraggableSVG from "react-draggable-svg";

const DraggableEmoji = ({ emoji }: any) => {
  const [position, setPosition] = useState({ x: 50, y: 50, coords: {} as any });
  console.log(emoji);
  const handleMouseMove = useRef((e: any) => {
    setPosition((position) => {
      const xDiff = position.coords.x - e.pageX;
      const yDiff = position.coords.y - e.pageY;
      return {
        x: position.x - xDiff,
        y: position.y - yDiff,
        coords: {
          x: e.pageX,
          y: e.pageY,
        },
      };
    });
  });

  const handleMouseDown = (e: any) => {
    console.log(e);
    const pageX = e.pageX;
    const pageY = e.pageY;
    setPosition((position) =>
      Object.assign({}, position, {
        coords: {
          x: pageX,
          y: pageY,
        },
      })
    );
    document.addEventListener("mousemove", handleMouseMove.current);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove.current);
    setPosition((position) => Object.assign({}, position, { coords: {} }));
  };

  return (
    <g onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <text
        x={position.x}
        y={position.y}
        font-family="Verdana"
        font-size="35"
        fill="blue"
      >
        {emoji}
      </text>
    </g>
  );
};

export default DraggableEmoji;
