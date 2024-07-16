import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { ALL_BLOCKS_TYPES } from "../common/constants";
import { Actions } from "../duck/actions";

export default function PreviewArea() {
  const canvasRef = useRef(null);
  const [posX, setPosX] = useState(200);
  const [posY, setPosY] = useState(200);
  const [say, setSay] = useState("");
  const [degree, setDegree] = useState(0);
  const [time, setTime] = useState(0);
  const [think, setThink] = useState("");

  const dispatch = useDispatch();

  const actionBlocks = useSelector((state) => state.code.actionBlocks);
  const actionHistory = useSelector((state) => state.code.actionHistory);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = "/cat-sprite.png";

    image.onload = () => {
      context.save();

      context.translate(posX + 75, posY + 60);

      context.rotate((degree * Math.PI) / 180);

      context.drawImage(image, -75, -60, 150, 130);

      context.restore();
    };

    if (say.length > 0) {
      context.font = "20px sans";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(say, posX + 130, posY - 10);
    }

    context.font = "20px sans";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(think, posX + 150, posY - 10);

    if (time) {
      setTimeout(() => {
        setThink("");
        setTime(0);
      }, time * 1000);
    }

    if (actionBlocks?.length) {
      dispatch(Actions.addToActionHistory(actionBlocks));
    }

    dispatch(Actions.setActionEvents([]));
  }, [posX, posY, say, degree, time, think]);

  useEffect(() => {
    let x = null;
    let y = null;
    let say = null;
    let think = null;
    let degree = null;
    let time = null;
    if (actionBlocks?.length) {
      actionBlocks.forEach((_action) => {
        if (_action.inputs.y) {
          y += parseInt(_action.inputs.y);
        }
        if (_action.inputs.x) {
          x += parseInt(_action.inputs.x);
        }
        switch (_action?.blockType) {
          case ALL_BLOCKS_TYPES.MOVE_X:
            x += parseInt(_action.inputs.x);
            break;
          case ALL_BLOCKS_TYPES.MOVE_XY:
            x += parseInt(_action.inputs.x);
            y += parseInt(_action.inputs.y);
            break;
          case ALL_BLOCKS_TYPES.SAY_HELLO:
            say = _action.inputs.say;
            break;
          case ALL_BLOCKS_TYPES.ROTATE_FORWARD:
            degree += parseInt(_action.inputs.degree);
            break;
          case ALL_BLOCKS_TYPES.THINK_FOR_X_SECONDS:
            think = _action.inputs.think;
            time += parseInt(_action.inputs.time);
            break;
          default:
            break;
        }
      });
      if (x) {
        setPosX(posX + x);
      }
      if (y) {
        setPosY(posY + y);
      }
      if (say) {
        setSay(say);
      }
      if (think) {
        setThink(think);
      }
      if (degree) {
        setDegree((prev) => prev + degree);
      }
      if (time) {
        setTime(time);
      }
    }
  }, [actionBlocks]);

  return (
    <>
      <div className="flex justify-between px-5 my-5">
        <Icon
          name="flag"
          size={20}
          className="mx-2 text-green-600 cursor-pointer"
        />
        <div className="flex space-x-3">
          <span>
            <b>X:</b> {posX}
          </span>
          <span>
            <b>Y:</b> {posY}
          </span>
          <span>
            <b>Degree:</b> {degree}
          </span>
        </div>
        <div
          className="text-blue-800 cursor-pointer select-none w-max"
          onClick={() => {
            setPosX(200);
            setPosY(200);
            setDegree(0);
            setSay("");
          }}
        >
          Reset
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={620}
        height={500}
        className="border border-red-900 shadow-lg"
      ></canvas>

      <div className="px-4 py-3 h-60">
        <div className="flex justify-between font-medium">
          <span>Action History</span>{" "}
          <div
            className="text-blue-500 cursor-pointer w-max"
            onClick={() => {
              dispatch(Actions.clearActionHistory());
            }}
          >
            Clear all
          </div>
        </div>
        <div className="py-2 mt-1 space-y-2 overflow-y-auto h-60">
          {actionHistory?.map((action, index) => (
            <div
              className="text-blue-800 cursor-pointer select-none w-max"
              key={index}
              onClick={() => {
                dispatch(Actions.setActionEvents(action));
              }}
            >
              {index + 1} : Action performed starts with {action[0].blockType}
            </div>
          ))}
          {actionHistory?.length === 0 && (
            <div>No actions performed so far!</div>
          )}
        </div>
      </div>
    </>
  );
}
