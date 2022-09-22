import React, { useEffect, useRef, useState } from 'react';
import useGameStore from '../../stores/GameStore';
import { GameHeader } from './GameHeader';
import Grid from '@mui/material/Grid';
import styles from '../../styles/SoloRace.module.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useGeneralStore from '../../stores/GeneralStore';
interface GameViewProps {}

export const GameView: React.FC<GameViewProps> = ({}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const {
    quote,
    raceStarted,
    quoteMap,
    currentWord,
    wordArray,
    pointerIndex,
    raceFinished,
    firstIncorrectIndex,
    completedWords,
    correctInputs,
    incorrectInputs,
    actions,
  } = useGameStore();
  const { themeMode } = useGeneralStore();
  const inputRef = useRef<any>(null);
  // on mount, change status to race started and format the game quote
  useEffect(() => {
    formatGameQuote();
    if (raceStarted) {
      inputRef.current?.focus();
      actions.setGameState({ startedAt: new Date(), mode: 'solo' });
    }
  }, [raceStarted]);

  // we need to split the quote into an array
  const formatGameQuote = () => {
    let quoteArray = quote.content.split(' ');
    let quoteMapCopy: any = {};
    // map the words to the array of characters
    quoteArray.forEach((word) => {
      const wordArray = word.split('').concat(' ');
      quoteMapCopy[`${word}`] = wordArray;
    });
    actions.setGameState({
      wordArray: quoteArray,
      quoteMap: quoteMapCopy,
    });
  };

  // handle changes in input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let currentWordArray = quoteMap[`${wordArray[currentWord]}`];
    let currentWordString = wordArray[currentWord] + ' ';
    let inputFieldLength = e.target.value.length;
    let pointerIndexDiff = inputFieldLength - inputValue.length;
    let currentWordUpUntil = currentWordString.slice(0, inputFieldLength);
    // don't allow more characters than the current word
    if (inputFieldLength <= currentWordArray.length) {
      //if the character inputted is incorrect , keep track of it's index
      if (e.target.value != currentWordUpUntil) {
        actions.setGameState({ incorrectInputs: incorrectInputs + 1 });
        if (firstIncorrectIndex == null) {
          actions.setGameState({
            firstIncorrectIndex: pointerIndex,
          });
        }
      } else {
        if (pointerIndexDiff > 0) {
          actions.setGameState({ correctInputs: correctInputs + 1 });
        }
        actions.setGameState({
          firstIncorrectIndex: null,
        });
      }
      //if it is the last word ignore the white space at the end
      if (currentWord + 1 == wordArray.length) {
        // if it is the last letter
        if (inputFieldLength == currentWordArray.length - 1) {
          // if the word inputted is correct end the game
          if (e.target.value == currentWordString.trim()) {
            setInputValue('');
            actions.setGameState({
              raceFinished: true,
              raceStarted: false,
              pointerIndex: 0,
              currentWord: 0,
              firstIncorrectIndex: null,
              completedWords: completedWords + 1,
            });
          }
        }
        // if it's not the last letter keep moving pointer
        else {
          setInputValue(e.target.value);
          actions.setGameState({
            pointerIndex: pointerIndex + pointerIndexDiff,
          });
        }
      }
      // if it is the last letter of the word
      else if (inputFieldLength == currentWordArray.length) {
        // if the word inputted is correct move to next word
        if (e.target.value == currentWordString) {
          setInputValue('');
          actions.setGameState({
            pointerIndex: pointerIndex + pointerIndexDiff,
            currentWord: currentWord + 1,
            completedWords: completedWords + 1,
          });
        }
      }
      // other wise just move on to next letter of the word
      else {
        setInputValue(e.target.value);
        actions.setGameState({ pointerIndex: pointerIndex + pointerIndexDiff });
      }
    }
  };
  // render the words for the game
  const renderWords = () => {
    let currentLetterIndex = 0;
    return wordArray.map((word: string, index: number) => {
      return quoteMap[word].map((letter: string, i: number) => {
        currentLetterIndex++;
        return (
          <Box
            component={'span'}
            key={currentLetterIndex - 1}
            color={
              pointerIndex > currentLetterIndex - 1 &&
              (firstIncorrectIndex == null ||
                currentLetterIndex - 1 < firstIncorrectIndex)
                ? 'success.main'
                : firstIncorrectIndex != null &&
                  currentLetterIndex - 1 < pointerIndex &&
                  currentLetterIndex - 1 >= firstIncorrectIndex
                ? 'error.main'
                : ''
            }
            className={
              pointerIndex > currentLetterIndex - 1 &&
              (firstIncorrectIndex == null ||
                currentLetterIndex - 1 < firstIncorrectIndex)
                ? 'success'
                : firstIncorrectIndex != null &&
                  currentLetterIndex - 1 < pointerIndex &&
                  currentLetterIndex - 1 >= firstIncorrectIndex
                ? 'error'
                : currentLetterIndex - 1 == pointerIndex && themeMode == 'dark'
                ? `${styles.currentLetterCursorLight}`
                : currentLetterIndex - 1 == pointerIndex && themeMode == 'light'
                ? `${styles.currentLetterCursorDark}`
                : ''
            }
            id={`${currentLetterIndex - 1}`}
          >
            {
              // if this is the current word underline it
              currentWord == index ? <u>{letter}</u> : letter
            }
          </Box>
        );
      });
    });
  };

  return (
    <>
      {raceStarted || raceFinished ? <GameHeader /> : null}
      <Grid container justifyContent={'center'} mb={5}>
        <Grid
          item
          md={6}
          className={
            raceFinished ? `${styles.gameWords}` : `${styles.gameWords}`
          }
          sx={raceFinished ? { bgcolor: 'secondary.main' } : {}}
        >
          {renderWords()}
        </Grid>
      </Grid>
      <Grid container justifyContent={'center'}>
        <Grid item xs={10} md={6}>
          <TextField
            onChange={(e) => handleChange(e)}
            fullWidth
            autoComplete='off'
            id='outlined-basic'
            variant='outlined'
            size='small'
            inputRef={inputRef}
            value={inputValue}
            disabled={
              raceFinished == true || raceStarted == false ? true : false
            }
          />
        </Grid>
      </Grid>
    </>
  );
};
