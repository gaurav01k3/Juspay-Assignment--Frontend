import { CODE_TYPES } from "../common/constants";
import {
  CLEAR_ACTION_HISTORY,
  DROP_BLOCK_ON_CANVAS,
  LAST_MOUSE_DOWN,
  REMOVE_BLOCK_FROM_CANVAS,
  SET_ACTION_HISTORY,
  SET_ACTIONS_EVENTS,
  SET_CODE_TYPE,
  SET_USER_NAME,
  TOGGLE_USERNAME_MODAL,
  UPDATE_BLOCK_INFO,
  UPDATE_BLOCK_INPUTS,
} from "./types";

const initialState = {
  userName: "",
  triggerNameModal: true,
  codeType: CODE_TYPES.MOTION,
  droppedBlocks: {},
  lastMouseDown: { x: 0, y: 0 },
  actionBlocks: null,
  actionHistory: [],
};

const codeReducer = (state = initialState, action) => {
  const updatedBlocks = { ...state.droppedBlocks };
  const blockId = action?.payload?.blockId;

  switch (action.type) {
    case SET_CODE_TYPE:
      return {
        ...state,
        codeType: action.payload,
      };
    case DROP_BLOCK_ON_CANVAS:
      return {
        ...state,
        droppedBlocks: { ...state.droppedBlocks, ...action.payload },
      };
    case REMOVE_BLOCK_FROM_CANVAS:
      action.payload.forEach((_blockId) => {
        delete updatedBlocks[_blockId];
      });

      return {
        ...state,
        droppedBlocks: updatedBlocks,
      };
    case LAST_MOUSE_DOWN:
      return {
        ...state,
        lastMouseDown: action.payload,
      };
    case UPDATE_BLOCK_INFO:
      updatedBlocks[blockId] = {
        ...updatedBlocks[blockId],
        next: action.payload.next,
      };

      return {
        ...state,
        droppedBlocks: updatedBlocks,
      };

    case UPDATE_BLOCK_INPUTS:
      updatedBlocks[blockId] = {
        ...updatedBlocks[blockId],
        inputs: action.payload.inputs,
      };

      return {
        ...state,
        droppedBlocks: updatedBlocks,
      };

    case SET_ACTIONS_EVENTS:
      return {
        ...state,
        actionBlocks: action.payload,
      };

    case SET_ACTION_HISTORY:
      return {
        ...state,
        actionHistory: [...state.actionHistory, action.payload],
      };

    case CLEAR_ACTION_HISTORY:
      return {
        ...state,
        actionHistory: [],
      };

    case SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };

    case TOGGLE_USERNAME_MODAL:
      return {
        ...state,
        triggerNameModal: !state.triggerNameModal,
      };

    default:
      return state;
  }
};

export default codeReducer;
