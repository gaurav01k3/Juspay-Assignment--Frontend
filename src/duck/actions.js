import {
  DROP_BLOCK_ON_CANVAS,
  REMOVE_BLOCK_FROM_CANVAS,
  SET_CODE_TYPE,
  LAST_MOUSE_DOWN,
  UPDATE_BLOCK_INFO,
  UPDATE_BLOCK_INPUTS,
  SET_ACTIONS_EVENTS,
  SET_ACTION_HISTORY,
  CLEAR_ACTION_HISTORY,
  SET_USER_NAME,
  TOGGLE_USERNAME_MODAL,
} from "./types";

const setCodeType = (payload) => {
  return {
    type: SET_CODE_TYPE,
    payload,
  };
};

const dropBlockOnCanvas = (payload) => {
  return {
    type: DROP_BLOCK_ON_CANVAS,
    payload,
  };
};

const removeBlockFromCanvas = (payload) => {
  return {
    type: REMOVE_BLOCK_FROM_CANVAS,
    payload,
  };
};

const lastMouseDown = (payload) => {
  return {
    type: LAST_MOUSE_DOWN,
    payload,
  };
};

const updateBlockInfo = (payload) => {
  return {
    type: UPDATE_BLOCK_INFO,
    payload,
  };
};

const updateBlockInputs = (payload) => {
  return {
    type: UPDATE_BLOCK_INPUTS,
    payload,
  };
};

const setActionEvents = (payload) => {
  return {
    type: SET_ACTIONS_EVENTS,
    payload,
  };
};

const clearActionHistory = () => {
  return {
    type: CLEAR_ACTION_HISTORY,
  };
};

const addToActionHistory = (payload) => {
  return {
    type: SET_ACTION_HISTORY,
    payload,
  };
};

const setUserName = (payload) => {
  return {
    type: SET_USER_NAME,
    payload,
  };
};

const toggleUserNameModal = () => {
  return {
    type: TOGGLE_USERNAME_MODAL,
  };
};

export const Actions = {
  setCodeType,
  dropBlockOnCanvas,
  removeBlockFromCanvas,
  lastMouseDown,
  updateBlockInfo,
  updateBlockInputs,
  setActionEvents,
  addToActionHistory,
  clearActionHistory,
  setUserName,
  toggleUserNameModal,
};
