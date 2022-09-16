import { StateCreator } from 'zustand';
import { Quote } from './SoloRace';

export interface gameState {
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
}
