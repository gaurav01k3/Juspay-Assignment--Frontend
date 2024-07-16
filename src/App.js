import React from "react";
import PreviewArea from "./components/PreviewArea";
import DropAreaContainer from "./components/DropAreaContainer";
import SelectBlockArea from "./components/SelectBlockArea";
import { useDispatch, useSelector } from "react-redux";
import UserNameModal from "./components/UserNameModal";
import { Actions } from "./duck/actions";

export default function App() {
  const userName = useSelector((state) => state.code.userName);
  const triggerNameModal = useSelector((state) => state.code.triggerNameModal);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex px-8 py-2 space-x-1 text-xl">
        <div>Hello</div>
        <div
          className={`${
            triggerNameModal && "border-2 border-black px-0.5 rounded-lg"
          }`}
          onClick={() => {
            dispatch(Actions.toggleUserNameModal());
          }}
        >
          {userName}👋
        </div>
      </div>
      <div className="flex w-screen px-8 py-3 pb-8 space-x-4 font-sans bg-blue-300">
        <div className="bg-white border w-42 border-red">
          <SelectBlockArea />
        </div>
        <div className="flex-1 overflow-auto bg-white border">
          <DropAreaContainer />
        </div>
        <div className="bg-white border w-max h-max">
          <PreviewArea />
        </div>
      </div>
      <div className="mt-1 font-medium text-center">
        Made by{" "}
        <a className="text-blue-800" href={`mailto:gk956842@gmail.com`}>
          Gaurav Kumar
        </a>
      </div>
      {triggerNameModal && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="z-50"
        >
          <UserNameModal name={userName} />
        </div>
      )}
    </>
  );
}
