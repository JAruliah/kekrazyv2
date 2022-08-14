import create from 'zustand';
import { Store } from './interfaces/Store'; 

const useStore = create<Store>((set: any) => ({
  raceStarted: false,
  raceFinished: false,
  quote: {content:"", author:"", tags:[]},
  quoteMap: {},
  currentWord: 0,
  currentLetter: 0,
  wordArray: [],
  letterArray: [],
  pointerIndex: 0,
  firstIncorrectIndex: null,
  setGameState: ( input: any ) => set((state:any) => ({...state, ...input}))
}))

export default useStore;