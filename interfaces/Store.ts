import { Quote } from './SoloRace';

export interface Store{
  raceStarted: boolean,
  raceFinished: boolean,
  quote: Quote,
  quoteMap: any,
  currentWord: number,
  wordArray: [],
  pointerIndex: number,
  firstIncorrectIndex: null | number,
  gameTimer: number,
  actions: any
}