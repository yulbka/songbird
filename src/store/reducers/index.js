import {
  GAME_INITIALIZING,
  LEVELS_NUMBER,
  BIRDS_DATA,
  CURRENT_BIRD
} from '../actions';

const initState = {
  isBlock: false,
  isInitialized: false,
  isInitializing: false,
  levelsNum: null,
  birds: [],
  currentBird: null,
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case GAME_INITIALIZING:
      return {
        ...state,
        isBlock: true,
        isInitializing: true,
      }
    case LEVELS_NUMBER:
      return {
        ...state,
        levelsNum: action.num
      }
    case BIRDS_DATA:
      return {
        ...state,
        birds: action.birds
      }
    case CURRENT_BIRD: {
      return {
        ...state,
        currentBird: action.currentBird
      }
    }
    default: 
      return state;
  }
}

export default gameReducer;