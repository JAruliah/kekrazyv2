import axios from 'axios';
import { Actions, GameState, Store } from '../interfaces/GameStore';
import { initialState } from '../stores/GameStore';

type SetState = (
  partial: Partial<Store> | ((state: Store) => Partial<Store>),
  replace?: boolean
) => void;

type GetState = () => Store;

const GameStoreActions = (set: SetState, get: GetState): Actions => {
  return {
    // set state
    setGameState: (input) => {
      set((state) => ({ ...state, ...input }));
    },

    // start the game timer
    startGameTimer: (session) => {
      let scoreCalculateInterval: ReturnType<typeof setInterval> | undefined;
      // get the state
      const gameTimer = get().gameTimer;
      let gameTimerCopy = gameTimer;
      // set an interval
      const gameTime = setInterval(() => {
        const raceFinished = get().raceFinished;
        // if the timer reaches 0 clear the interval
        if (raceFinished || gameTimerCopy == 0) {
          clearInterval(gameTime);
          clearInterval(scoreCalculateInterval);
          set(() => ({ raceFinished: true }));
          set(() => ({ raceStarted: false }));
          // if a user is logged in save the match stats
          if (session) {
            const afterGameState = get();
            saveMatchStats(afterGameState);
          }
          return;
        }
        if (scoreCalculateInterval === undefined) {
          // set an interval to update game scores while playing
          scoreCalculateInterval = setInterval(() => {
            const completedWords = get().completedWords;
            const raceFinished = get().raceFinished;
            const correctInputs = get().correctInputs;
            const incorrectInputs = get().incorrectInputs;
            const startedAtTime = get().startedAt;
            if (raceFinished) {
              return;
            }
            // calculate wpm
            const timePassedSeconds = Math.max(
              (new Date().getTime() - startedAtTime.getTime()) / 1000,
              0
            );
            const timePassedMinutes = timePassedSeconds / 60;
            const wpm =
              timePassedMinutes > 0
                ? Math.floor(completedWords / timePassedMinutes)
                : 0;
            //calculate accuracy
            const totalInputs = correctInputs + incorrectInputs;
            const accuracy =
              totalInputs > 0
                ? Math.floor((correctInputs / totalInputs) * 100)
                : 100;
            set(() => ({ wpmScore: wpm }));
            set(() => ({ accuracyScore: Math.min(accuracy, 100) }));
          }, 1000);
        }
        set((state) => ({ gameTimer: state.gameTimer - 1 }));
        gameTimerCopy--;
      }, 1000);
    },

    // play a new game
    playAgain: async (quote) => {
      set({ ...initialState, quote });
    },

    // reset the game state
    resetGameState: () => {
      set(initialState);
    },
  };
};
export default GameStoreActions;
// save match stats to the database
const saveMatchStats = async (gameState: GameState) => {
  const { wpmScore, accuracyScore, startedAt, quote, mode, finishedAt } =
    gameState;
  const endedAt = finishedAt;
  const { author, content, length, tags } = quote;
  const timeTaken = Math.floor(
    (endedAt.getTime() - startedAt.getTime()) / 1000
  );
  const matchStats = {
    wpmScore,
    accuracyScore,
    author,
    content,
    startedAt,
    endedAt,
    length,
    tags,
    mode,
    timeTaken,
  };
  try {
    await axios.post('/api/saveMatchHistory', matchStats);
  } catch (error) {
    console.error(error);
  }
};
