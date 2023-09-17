import { GAME_TIMER } from '../constantVariables';
import { initialState } from '../stores/GameStore';
import axios from 'axios';

const GameStoreActions = (set: any, get: any) => {
  return {
    // set state
    setGameState: (input: any) => {
      set((state: any) => ({ ...state, ...input }));
    },

    // start the game timer
    startGameTimer: (session: any) => {
      let scoreCalculateInterval: NodeJS.Timer;
      let startedAt = new Date();
      set(() => ({ startedAt: startedAt }));
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
        if (scoreCalculateInterval == undefined) {
          // set an interval to update game scores while playing
          scoreCalculateInterval = setInterval(() => {
            const completedWords = get().completedWords;
            const raceFinished = get().raceFinished;
            const correctInputs = get().correctInputs;
            const incorrectInputs = get().incorrectInputs;
            const pointerIndex = get().pointerIndex;
            // calculate wpm
            let secondsPassed = startedAt.getTime() - new Date().getTime();
            let timePassed = Math.abs(secondsPassed / 1000);
            let wpm = Math.floor(completedWords / (timePassed / 60));
            //calculate accuracy
            let accuracy = Math.floor(
              ((correctInputs - incorrectInputs) / pointerIndex) * 100
            );
            set(() => ({ wpmScore: wpm }));
            if (accuracy <= 100) {
              set(() => ({ accuracyScore: accuracy }));
            }
          }, 1000);
        }
        set((state: any) => ({ gameTimer: state.gameTimer - 1 }));
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
export default GameStoreActions;
// save match stats to the database
const saveMatchStats = async (gameState: any) => {
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
  } catch (error: any) {
    console.log(error.message);
  }
};
