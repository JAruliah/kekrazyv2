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
  actions: actions(set, get)
}))

export default useStore;