import { Quote } from './SoloRace';

export interface Store{
  raceStarted: boolean,
  raceFinished: boolean,
  quote: Quote,
  quoteMap: any,
  currentWord: number,
  currentLetter: number,
  wordArray: [],
  letterArray: [],
  pointerIndex: number,
  firstIncorrectIndex: null | number,
  gameTimer: number,
  actions: any
}