import create from 'zustand';
import { Store, gameState } from './interfaces/Store';
import { GAME_TIMER } from './constantVariables';
import gameStateActions from './actions/gameStateActions';

export const initialState: gameState = {
  raceStarted: false,
  raceFinished: false,
  quote: { content: '', author: '', tags: [] },
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
};

const useGameStore = create<Store>((set: any, get: any) => ({
  ...initialState,
  actions: gameStateActions(set, get),
}));

export default useGameStore;
