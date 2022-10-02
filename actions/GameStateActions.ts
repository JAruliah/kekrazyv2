import { GAME_TIMER } from '../constantVariables';
import { initialState } from '../stores/GameStore';
import axios from 'axios';

const GameStateActions = (set: any, get: any) => {
  return {
    // set state
    setGameState: (input: any) => {
      set((state: any) => ({ ...state, ...input }));
    },

    // start the game timer
    startGameTimer: (session: any) => {
      let scoreCalculateInterval: NodeJS.Timer;
      // get the state
      const gameTimer = get().gameTimer;
      let gameTimerCopy = gameTimer;
      // set an interval
      const gameTime = setInterval(() => {
        const raceFinished = get().raceFinished;
        if (scoreCalculateInterval == undefined) {
          // set an interval to update game scores while playing
          scoreCalculateInterval = setInterval(() => {
            const completedWords = get().completedWords;
            const raceFinished = get().raceFinished;
            const correctInputs = get().correctInputs;
            const incorrectInputs = get().incorrectInputs;
            const pointerIndex = get().pointerIndex;
            // calculate wpm
            let timePassed = GAME_TIMER - gameTimerCopy;
            let wpm = Math.floor(completedWords / (timePassed / 60));
            //calculate accuracy
            let accuracy = Math.floor(
              ((correctInputs - incorrectInputs) / pointerIndex) * 100
            );
            set(() => ({ wpmScore: wpm }));
            if (accuracy <= 100) {
              set(() => ({ accuracyScore: accuracy }));
            }
            if (raceFinished) {
              clearInterval(scoreCalculateInterval);
            }
          }, 1000);
        }
        set((state: any) => ({ gameTimer: state.gameTimer - 1 }));
        // if the timer reaches 0 clear the interval
        if (gameTimerCopy == 0 || raceFinished) {
          set(() => ({ raceFinished: true }));
          set(() => ({ raceStarted: false }));
          clearInterval(gameTime);
          if (session) {
            const afterGameState = get();
            saveMatchStats(afterGameState);
          }
        }
        gameTimerCopy--;
      }, 1000);
    },

    // play a new game
    playAgain: (quote: {}) => {
      set({ ...initialState, quote: quote });
    },

    // reset the game state
    resetGameState: () => {
      set(initialState);
    },
  };
};
export default GameStateActions;
// save match stats to the database
const saveMatchStats = async (gameState: any) => {
  const { wpmScore, accuracyScore, startedAt, quote, mode } = gameState;
  const endedAt = new Date();
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
  } catch (error: any) {
    console.log(error.message);
  }
};
