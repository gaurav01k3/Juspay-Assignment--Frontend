import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../../../duck/actions";

function MoveXYBlock({ blockInfo, isOver }) {
  const dispatch = useDispatch();
  const { blockId } = blockInfo;

  const [inputs, setInputs] = useState({
    x: blockInfo?.inputs?.x || 10,
    y: blockInfo?.inputs?.y || 10,
  });

  return (
    <>
      <div
        className={`flex flex-row items-center px-2 py-2.5 space-x-2 text-xs text-white bg-blue-500 rounded-lg cursor-pointer w-max`}
      >
        <div>go to x:</div>
        <input
          className="w-10 px-1 text-black rounded-full outline-white"
          type="text"
          name=""
          value={inputs.x}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, x: e.target.value }));
            if (blockId) {
              dispatch(
                Actions.updateBlockInputs({
                  blockId,
                  inputs: { x: e.target.value, y: inputs.y },
                })
              );
            }
          }}
        />
        <div>y:</div>
        <input
          className="w-10 px-1 text-black rounded-full outline-white"
          type="text"
          name=""
          value={inputs.y}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, y: e.target.value }));
            if (blockId) {
              dispatch(
                Actions.updateBlockInputs({
                  blockId,
                  inputs: { x: inputs.x, y: e.target.value },
                })
              );
            }
          }}
        />
      </div>
      {blockId && (
        <div
          className={`absolute ${
            !isOver && "hidden"
          } w-full h-full bg-gray-600 rounded-lg opacity-40`}
        ></div>
      )}
    </>
  );
}

export default MoveXYBlock;
