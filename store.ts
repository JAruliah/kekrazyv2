import create from 'zustand';
import { Store } from './interfaces/Store'; 
import { GAME_TIMER } from './constantVariables';
import actions from './actions';

const useStore = create<Store>((set: any, get: any) => ({
  raceStarted: false,
  raceFinished: false,
  quote: {content:"", author:"", tags:[]},
  quoteMap: {},
  currentWord: 0,
  wordArray: [],
  pointerIndex: 0,
  firstIncorrectIndex: null,
  gameTimer: GAME_TIMER,
  completedWords: 0,
  correctInputs: 0,
  incorrectInputs: 0,
  wpmScore: 0,
  accuracyScore: 0,
  actions: actions(set, get)
}))

export default useStore;