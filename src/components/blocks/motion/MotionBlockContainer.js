import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ALL_BLOCKS_TYPES, DRAG_SOURCE } from "../../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../duck/actions";
import uniqid from "uniqid";
import MoveXBlock from "./blocks/MoveXBlock";
import MoveXYBlock from "./blocks/MoveXYBlock";
import LookSayHello from "./blocks/LookSayHello";
import MotionRotateXBlock from "./blocks/MotionRotateXBlock";
import LookThinkForSeconds from "./blocks/LookThinkForSeconds";

const renderBlockWithType = (blockType, blockInfo, isOver) => {
  switch (blockType) {
    case ALL_BLOCKS_TYPES.MOVE_X:
      return <MoveXBlock blockInfo={blockInfo} isOver={isOver} />;
    case ALL_BLOCKS_TYPES.MOVE_XY:
      return <MoveXYBlock blockInfo={blockInfo} isOver={isOver} />;
    case ALL_BLOCKS_TYPES.SAY_HELLO:
      return <LookSayHello blockInfo={blockInfo} isOver={isOver} />;
    case ALL_BLOCKS_TYPES.THINK_FOR_X_SECONDS:
      return <LookThinkForSeconds blockInfo={blockInfo} isOver={isOver} />;
    case ALL_BLOCKS_TYPES.ROTATE_FORWARD:
      return <MotionRotateXBlock blockInfo={blockInfo} isOver={isOver} />;
    default:
      return null;
  }
};

const getInputs = (blockType) => {
  switch (blockType) {
    case ALL_BLOCKS_TYPES.MOVE_X:
      return { x: 10 };
    case ALL_BLOCKS_TYPES.MOVE_XY:
      return { x: 10, y: 10 };
    case ALL_BLOCKS_TYPES.ROTATE_FORWARD:
      return { degree: 20 };
    case ALL_BLOCKS_TYPES.SAY_HELLO:
      return { say: "Hello" };
    case ALL_BLOCKS_TYPES.THINK_FOR_X_SECONDS:
      return { think: "Hmm", time: 2 };
    default:
      return null;
  }
};

function MotionBlockContainer({
  blockInfo = {},
  dragSource,
  blockType,
  isDraggable = true,
}) {
  const elemRef = useRef(null);
  const dispatch = useDispatch();

  const droppedBlocks = useSelector((state) => state.code.droppedBlocks);

  const [linkedBlocks, setLinkedBlocks] = useState(null);
  const [beingDragged, setBeingDragged] = useState(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "block",
      item: () => {
        setBeingDragged(true);

        if (blockInfo?.parent) {
          dispatch(
            Actions.updateBlockInfo({
              blockId: blockInfo.parent,
              next: null,
            })
          );
        }

        const newBlockInfo = {
          ...blockInfo,
          blockId: uniqid.time(),
          dragSource,
          blockType,
          inputs: blockInfo?.inputs || getInputs(blockType),
          linkedBlocks,
          parent: null,
          blockHeight: elemRef.current.getBoundingClientRect().height,
        };
        return newBlockInfo;
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      options: {
        previewEnabled: false,
      },
      canDrag: isDraggable,
    }),
    [linkedBlocks, blockInfo, blockType]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "block",
      drop: (nestedBlockInfo) => {
        if (!blockInfo?.next) {
          const block = {
            ...nestedBlockInfo,
            dropAreaX: blockInfo.dropAreaX,
            dropAreaY:
              blockInfo.dropAreaY +
              elemRef.current.getBoundingClientRect().height,
            parent: blockInfo.blockId,
          };
          dispatch(
            Actions.updateBlockInfo({
              blockId: blockInfo.blockId,
              next: nestedBlockInfo.blockId,
            })
          );
          dispatch(
            Actions.dropBlockOnCanvas({ [nestedBlockInfo?.blockId]: block })
          );
        } else {
          dispatch(
            Actions.dropBlockOnCanvas({
              [nestedBlockInfo?.blockId]: {
                ...nestedBlockInfo,
                dropAreaX: blockInfo.dropAreaX + 10,
                dropAreaY: blockInfo.dropAreaY - 10,
              },
            })
          );
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
      canDrop: () => {
        return blockInfo?.blockId;
      },
    }),
    [blockInfo]
  );

  const getAllChainedBlocks = useCallback(
    (parentBlock) => {
      const chainedBlocks = [];
      let currentBlock = parentBlock;

      while (currentBlock?.next) {
        currentBlock = droppedBlocks[currentBlock.next];
        chainedBlocks.push(currentBlock);
      }

      return chainedBlocks;
    },
    [droppedBlocks]
  );

  useEffect(() => {
    if (isDragging && dragSource === DRAG_SOURCE.MID_AREA) {
      const blockIds = linkedBlocks.map((_block) => _block?.blockId);
      dispatch(
        Actions.removeBlockFromCanvas([blockInfo?.blockId, ...blockIds])
      );
    }
  }, [isDragging]);

  useEffect(() => {
    const chainedBlocks = getAllChainedBlocks(blockInfo);
    setLinkedBlocks(chainedBlocks);
  }, [droppedBlocks]);

  return (
    <div
      ref={(node) => {
        drop(node);
        elemRef.current = node;
        drag(node);
      }}
      className="relative w-max"
      onMouseDown={(e) => {
        const rect = elemRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        dispatch(Actions.lastMouseDown({ x, y }));
      }}
      onClick={() => {
        if (blockInfo?.blockId) {
          let highestParent = blockInfo;
          while (highestParent?.parent) {
            highestParent = droppedBlocks[highestParent.parent];
          }
          const chainedBlocks = getAllChainedBlocks(highestParent);
          dispatch(Actions.setActionEvents([highestParent, ...chainedBlocks]));
        }
      }}
    >
      {renderBlockWithType(blockType, blockInfo, isOver)}
      {beingDragged &&
        linkedBlocks?.map((block) => {
          return renderBlockWithType(block.blockType, blockInfo, isOver);
        })}
    </div>
  );
}

export default MotionBlockContainer;
