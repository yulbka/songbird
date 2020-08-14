export const GAME_INITIALIZING = 'GAME_INITIALIZING';
export const LEVELS_NUMBER = 'fetch/LEVELS_NUMBER';
export const BIRDS_DATA = 'fetch/BIRDS_DATA';
export const CURRENT_BIRD = 'fetch/CURRENT_BIRD'

export const init = () => ({  
  type: GAME_INITIALIZING
});

export const setLevelsNumber = (num) => ({
  type: LEVELS_NUMBER,
  num,
});

export const setBirdsData = (birds) => ({
  type: BIRDS_DATA,
  birds,
});

export const setCurrentBird = (birds) => ({
  type: CURRENT_BIRD,
  currentBird: birds[Math.floor(Math.random() * Math.floor(birds.length))],
});

export const initAsync = (level) => (dispatch) => {
  fetch('http://localhost:3000/count')
      .then(res => res.text())
      .then(data => {
        dispatch(setLevelsNumber(data))
      });  
  dispatch(init());
  dispatch(getBirdsDataAsync(level));
}

export const getBirdsDataAsync = (level) => (dispatch) => {
  fetch(`http://localhost:3000/${level}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setBirdsData(data));
        dispatch(setCurrentBird(data));
      });
}