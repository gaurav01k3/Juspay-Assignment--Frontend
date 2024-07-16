import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import MotionBlockContainer from "./blocks/motion/MotionBlockContainer";
import { DRAG_SOURCE } from "../common/constants";

export default function DropAreaComponent({ onDrop = () => {} }) {
  const dropAreaRef = useRef(null);

  const droppedBlocks = useSelector((state) => state.code.droppedBlocks);
  const lastMouseDown = useSelector((state) => state.code.lastMouseDown);

  const lastMouseDownRef = useRef({ x: 0, y: 0 });

  const getBlocksInfo = (blockInfo, parentDropX, parentDropY) => {
    const { linkedBlocks } = blockInfo;

    const droppableBlocks = {};

    const parentBlock = {
      ...blockInfo,
      dropAreaX: parentDropX,
      dropAreaY: parentDropY,
    };

    delete parentBlock.linkedBlocks;

    droppableBlocks[blockInfo?.blockId] = { ...parentBlock };

    linkedBlocks.forEach((_block, index) => {
      const newBlock = {
        ..._block,
        dropAreaX: parentBlock.dropAreaX,
        dropAreaY:
          parentBlock.dropAreaY + parentBlock.blockHeight * (index + 1),
        parent: index === 0 ? parentBlock?.blockId : _block.parent,
      };

      droppableBlocks[newBlock.blockId] = newBlock;
    });

    return droppableBlocks;
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "block",
      drop: (blockInfo, monitor) => {
        const clientOffset = monitor.getClientOffset();
        const dropArea = dropAreaRef.current;
        if (dropArea && clientOffset) {
          const rect = dropArea.getBoundingClientRect();
          const dropAreaX =
            clientOffset.x - rect.left - lastMouseDownRef.current.x;
          const dropAreaY =
            clientOffset.y - rect.top - lastMouseDownRef.current.y;

          const droppableBlocks = getBlocksInfo(
            blockInfo,
            dropAreaX,
            dropAreaY
          );

          onDrop(droppableBlocks);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  useEffect(() => {
    lastMouseDownRef.current = lastMouseDown;
  }, [lastMouseDown]);

  return (
    <div
      ref={(node) => {
        drop(node);
        dropAreaRef.current = node;
      }}
      className={`relative w-full h-full border border-green-500 shadow-2xl ${
        isOver ? "bg-gray-200" : ""
      }`}
    >
      {Object.values(droppedBlocks).map((block, index) => (
        <div
          key={index}
          className="absolute text-center bg-blue-500 rounded-lg"
          style={{
            top: `${block.dropAreaY}px`,
            left: `${block.dropAreaX}px`,
          }}
        >
          <MotionBlockContainer
            blockInfo={block}
            blockType={block.blockType}
            dragSource={DRAG_SOURCE.MID_AREA}
          />
        </div>
      ))}
    </div>
  );
}
