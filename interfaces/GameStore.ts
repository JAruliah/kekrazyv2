import { Quote } from './SoloRace';

export interface GameState {
  raceStarted: boolean;
  raceFinished: boolean;
  quote: Quote;
  quoteMap: any;
  currentWord: number;
  wordArray: [];
  pointerIndex: number;
  firstIncorrectIndex: null | number;
  gameTimer: number;
  completedWords: number;
  correctInputs: number;
  incorrectInputs: number;
  wpmScore: number;
  accuracyScore: number;
  startedAt: Date;
  finishedAt: Date;
  mode: 'solo' | 'multiplayer';
}

export interface Actions {
  setGameState: () => void;
  startGameTimer: () => void;
  playAgain: () => void;
  resetGameState: () => void;
}
export interface Store {
  raceStarted: boolean;
  raceFinished: boolean;
  quote: Quote;
  quoteMap: any;
  currentWord: number;
  wordArray: [];
  pointerIndex: number;
  firstIncorrectIndex: null | number;
  gameTimer: number;
  completedWords: number;
  correctInputs: number;
  incorrectInputs: number;
  wpmScore: number;
  accuracyScore: number;
  actions: any;
  startedAt: Date;
  mode: 'solo' | 'multiplayer';
}
