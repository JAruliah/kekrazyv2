import { Quote } from './SoloRace';

export type QuoteCharacterMap = Record<string, string[]>;

export interface GameState {
  raceStarted: boolean;
  raceFinished: boolean;
  quote: Quote;
  quoteMap: QuoteCharacterMap;
  currentWord: number;
  wordArray: string[];
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
  setGameState: (input: Partial<GameState>) => void;
  startGameTimer: (session?: unknown) => void;
  playAgain: (quote: Quote) => Promise<void> | void;
  resetGameState: () => void;
}

export interface Store extends GameState {
  actions: Actions;
}
