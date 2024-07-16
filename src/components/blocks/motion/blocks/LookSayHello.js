import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../../../duck/actions";

function LookSayHello({ blockInfo, isOver }) {
  const dispatch = useDispatch();
  const { blockId } = blockInfo;

  const [inputs, setInputs] = useState({
    say: blockInfo?.inputs?.say || "Hello",
  });
  return (
    <>
      <div
        style={{
          background: "#9966ff",
        }}
        className={`flex flex-row items-center px-2 py-2.5 space-x-2 text-xs text-white rounded-lg cursor-pointer w-max`}
      >
        <div>say: </div>
        <input
          onClick={(e) => e.stopPropagation()}
          className="px-2 text-black rounded-full w-14 outline-white"
          type="text"
          name=""
          value={inputs.say}
          onChange={(e) => {
            setInputs({ say: e.target.value });

            if (blockId) {
              dispatch(
                Actions.updateBlockInputs({
                  blockId,
                  inputs: { say: e.target.value },
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

export default LookSayHello;
