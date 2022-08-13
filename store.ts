import create from 'zustand';
import { Store } from './interfaces/Store'; 

const useStore= create<Store>((set) => ({
  raceStarted: false,
  setRaceStarted: (input: boolean) => set(() => ({ raceStarted: input })),
  raceFinished: false,
  setRaceFinished: (input: boolean) => set(() => ({ raceFinished: input }))
}))

export default useStore;