import create from 'zustand';
import { Store } from './interfaces/Store'; 

const useStore = create<Store>((set: any) => ({
  raceStarted: false,
  setRaceStarted: (input: boolean) => set(() => ({ raceStarted: input })),
  raceFinished: false,
  setRaceFinished: (input: boolean) => set(() => ({ raceFinished: input })),
  quote: {content:"", author:"", tags:[]},
  setQuote: (input: {}) => set(() => ({ quote: input }))
}))

export default useStore;