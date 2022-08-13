export interface Store{
  raceStarted: boolean,
  setRaceStarted: (input:boolean) => void,
  raceFinished: boolean,
  setRaceFinished: (input:boolean) => void
}