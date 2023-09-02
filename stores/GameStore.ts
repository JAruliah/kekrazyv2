import create from 'zustand';
import { Store, GameState } from '../interfaces/GameStore';
import { GAME_TIMER } from '../constantVariables';
import GameStoreActions from '../actions/GameStoreActions';

export const initialState: GameState = {
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
  startedAt: new Date(),
  mode: 'solo',
};

const useGameStore = create<Store>((set: any, get: any) => ({
  ...initialState,
  actions: GameStoreActions(set, get),
}));

export default useGameStore;
