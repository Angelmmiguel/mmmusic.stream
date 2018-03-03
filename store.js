import { createStore, applyMiddleware } from 'redux';

// Initial state of the application
const initialState = {
  channel: '',
  muted: false,
  playing: false,
  volume: 75,
};

// Available actions
export const actionTypes = {
  STOP_PLAY: 'STOP_PLAY',
  TOGGLE_MUTE: 'TOGGLE_MUTE',
  TOGGLE_PLAY: 'TOGGLE_PLAY',
  UPDATE_CHANNEL: 'UPDATE_CHANNEL',
  UPDATE_VOLUME: 'UPDATE_VOLUME',
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STOP_PLAY:
      return Object.assign({}, state, { playing: false });
    case actionTypes.TOGGLE_MUTE:
      return Object.assign({}, state, { muted: !state.muted });
    case actionTypes.TOGGLE_PLAY:
      return Object.assign({}, state, { playing: !state.playing });
    case actionTypes.UPDATE_CHANNEL:
      return Object.assign({}, state, { channel: action.channel, playing: true });
    case actionTypes.UPDATE_VOLUME:
      return Object.assign({}, state, { volume: action.volume });
    default:
      return state;
  }
}

// ACTIONS
export const stopPlay = () => {
  return { type: actionTypes.STOP_PLAY };
}

export const toogleMute = () => {
  return { type: actionTypes.TOGGLE_MUTE };
}

export const tooglePlay = () => {
  return { type: actionTypes.TOGGLE_PLAY };
}

export const updateChannel = (channel) => {
  return { type: actionTypes.UPDATE_CHANNEL, channel };
}

export const updateVolume = (volume) => {
  return { type: actionTypes.UPDATE_VOLUME, volume };
}

// Initialize the store
const initStore = (state = initialState) => {
  return createStore(reducer, state);
}

export default initStore;
