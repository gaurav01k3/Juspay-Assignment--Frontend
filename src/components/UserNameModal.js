import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../duck/actions";

function UserNameModal({ name }) {
  const [userName, setUserName] = useState(name);

  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-64 space-y-3 bg-blue-200 border rounded-lg shadow-2xl w-96">
        <div className="flex justify-center">
          <img src="/cat-sprite.png" alt="" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-blue-800">Enter your Name</div>
          <input
            placeholder="Type here..."
            className="pl-2 border min-w-20"
            type="text"
            name=""
            id=""
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <button
          className={`px-4 py-1 ${
            userName?.length
              ? "bg-blue-400 text-gray-900"
              : "bg-blue-300 text-gray-600"
          } border rounded-lg`}
          disabled={!userName?.length}
          onClick={() => {
            dispatch(Actions.setUserName(userName));
            dispatch(Actions.toggleUserNameModal());
          }}
        >
          Enter
        </button>
      </div>
    </>
  );
}

export default UserNameModal;
