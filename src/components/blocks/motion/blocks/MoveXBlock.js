import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../../../duck/actions";

function MoveXBlock({ blockInfo, isOver }) {
  const dispatch = useDispatch();
  const { blockId } = blockInfo;

  const [inputs, setInputs] = useState({ x: blockInfo?.inputs?.x || 10 });
  return (
    <>
      <div
        className={`flex flex-row items-center px-2 py-2.5 space-x-2 text-xs text-white bg-blue-500 rounded-lg cursor-pointer w-max`}
      >
        <div>move x:</div>
        <input
          onClick={(e) => e.stopPropagation()}
          className="w-10 px-2 text-black rounded-full outline-white"
          type="text"
          name=""
          value={inputs.x}
          onChange={(e) => {
            setInputs({ x: e.target.value });

            if (blockId) {
              dispatch(
                Actions.updateBlockInputs({
                  blockId,
                  inputs: { x: e.target.value },
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

export default MoveXBlock;
