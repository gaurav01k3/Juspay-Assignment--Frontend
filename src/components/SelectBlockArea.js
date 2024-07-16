import React from "react";
import MotionBlockContainer from "./blocks/motion/MotionBlockContainer";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../duck/actions";
import {
  CODE_TYPES,
  DRAG_SOURCE,
  LOOKS_BLOCK_TYPES,
  MOTION_BLOCK_TYPES,
} from "../common/constants";

export default function SelectBlockArea() {
  const dispatch = useDispatch();

  const codeType = useSelector((state) => state.code.codeType);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="flex flex-col space-y-3 border-r-0.5">
        <div
          onClick={() => {
            dispatch(Actions.setCodeType(CODE_TYPES.MOTION));
          }}
          className={`flex flex-col items-center px-3 py-2 space-y-1 text-sm cursor-pointer ${
            codeType === CODE_TYPES.MOTION && "bg-blue-100"
          } `}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
          <div>Motion</div>
        </div>
        <div
          onClick={() => {
            dispatch(Actions.setCodeType(CODE_TYPES.LOOKS));
          }}
          className={`flex flex-col items-center px-3 py-2 space-y-1 text-sm cursor-pointer ${
            codeType === CODE_TYPES.LOOKS && "bg-blue-100"
          } `}
        >
          <div
            className="w-10 h-10 rounded-full"
            style={{ background: "#9966ff" }}
          ></div>
          <div>Looks</div>
        </div>
      </div>
      <div className="flex flex-col flex-1 pt-4 pl-2 pr-8 space-y-3 border">
        {codeType === CODE_TYPES.MOTION ? (
          <>
            <div>Motion</div>
            {Object.values(MOTION_BLOCK_TYPES).map((_type, index) => {
              return (
                <MotionBlockContainer
                  key={index}
                  dragSource={DRAG_SOURCE.SELECT_BLOCK_AREA}
                  blockType={_type}
                />
              );
            })}
          </>
        ) : (
          <>
            <div>Looks</div>
            {Object.values(LOOKS_BLOCK_TYPES).map((_type, index) => {
              return (
                <MotionBlockContainer
                  key={index}
                  dragSource={DRAG_SOURCE.SELECT_BLOCK_AREA}
                  blockType={_type}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
{
  /* <div className="font-bold"> {"Events"} </div>
<div className="flex flex-row flex-wrap px-2 py-1 my-2 text-sm text-white bg-yellow-500 cursor-pointer">
  {"When "}
  <Icon name="flag" size={15} className="mx-2 text-green-600" />
  {"clicked"}
</div>
<div className="flex flex-row flex-wrap px-2 py-1 my-2 text-sm text-white bg-yellow-500 cursor-pointer">
  {"When this sprite clicked"}
</div>
<div className="font-bold"> {"Motion"} </div>
<div className="flex flex-row flex-wrap px-2 py-1 my-2 text-sm text-white bg-blue-500 cursor-pointer">
  {"Move 10 steps"}
</div>
<div className="flex flex-row flex-wrap px-2 py-1 my-2 text-sm text-white bg-blue-500 cursor-pointer">
  {"Turn "}
  <Icon name="undo" size={15} className="mx-2 text-white" />
  {"15 degrees"}
</div>
<div className="flex flex-row flex-wrap px-2 py-1 my-2 text-sm text-white bg-blue-500 cursor-pointer">
  {"Turn "}
  <Icon name="redo" size={15} className="mx-2 text-white" />
  {"15 degrees"}
</div> */
}
