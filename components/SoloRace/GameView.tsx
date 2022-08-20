import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../store';
import { GameHeader } from './GameStats';
interface GameViewProps {

}

export const GameView: React.FC<GameViewProps> = ({}) => {
  const [ inputValue, setInputValue ] = useState<string>("");
  const { 
    quote, 
    raceStarted,  
    quoteMap,
    currentWord,
    currentLetter,
    wordArray,
    letterArray,
    pointerIndex,
    raceFinished,
    firstIncorrectIndex,
    setGameState
  } = useStore();

  const inputRef = useRef<any>(null);
  // on mount, change status to race started and format the game quote
  useEffect(() => {
    if(raceStarted == true){
      formatGameQuote();
    }
    inputRef.current?.focus();
  }, [])


  // we need to split the quote into an array
  const formatGameQuote = () => {
    let quoteArray = quote.content.split(' ');
    let quoteMapCopy:any = {};
    // map the words to the array of characters
    quoteArray.forEach((word) => {
      const wordArray = word.split('').concat(' ');
      quoteMapCopy[`${word}`] = wordArray; 
    })
    setGameState({
      wordArray: quoteArray,
      quoteMap: quoteMapCopy
    });
  }

  // handle changes in input
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    let currentWordArray = quoteMap[`${wordArray[currentWord]}`];
    let currentWordString = wordArray[currentWord]+" ";
    let inputFieldLength = e.target.value.length;
    let pointerIndexDiff = inputFieldLength - inputValue.length;
    let currentWordUpUntil = currentWordString.slice(0, inputFieldLength);
    // don't allow more characters than the current word
    if(inputFieldLength <= currentWordArray.length){
      //if the character inputted is incorrect , keep track of it's index
      if(e.target.value != currentWordUpUntil){
        if(firstIncorrectIndex == null){
          setGameState({
            firstIncorrectIndex: pointerIndex
          });
        }
      }else{
        setGameState({
          firstIncorrectIndex: null
        });
      }
      //if it is the last word ignore the white space at the end
      if(currentWord+1 == wordArray.length){
        // if it is the last letter
        if(inputFieldLength == currentWordArray.length-1){
          // if the word inputted is correct end the game
          if(e.target.value == currentWordString.trim()){
            setInputValue('');
            setGameState({
              raceFinished: true,
              raceStarted: false,
              pointerIndex: 0,
              currentWord: 0
            });
          }
        }
        // if it's not the last letter keep moving pointer
        else{
          setInputValue(e.target.value);
          setGameState({pointerIndex: pointerIndex + pointerIndexDiff});
        }
      }
      // if it is the last letter of the word
      if(inputFieldLength == currentWordArray.length){
        // if the word inputted is correct move to next word
        if(e.target.value == currentWordString){
          setInputValue('');
          setGameState({
            pointerIndex: pointerIndex + pointerIndexDiff,
            currentWord: currentWord + 1
          });
        }
      }
      // other wise just move on to next letter of the word
      else{
        setInputValue(e.target.value);
        setGameState({pointerIndex: pointerIndex + pointerIndexDiff});
      }
    }
  }

  return (
    <>
      <GameHeader />
      <div className='row justify-content-center mb-4'>
        <div className='col-md-6'>
          {quote.content.split('').map((letter, index) => {
            return (
              <span 
                key={index} 
                className = {
                pointerIndex == index && firstIncorrectIndex == null? 
                  "bg-success":
                  firstIncorrectIndex != null
                  && (index <= pointerIndex && index > firstIncorrectIndex)? 
                  "bg-danger":""
              }>
                {letter}
              </span>
            )
          })}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input 
            className='form-control' 
            onChange={(e) => handleChange(e)} 
            ref={inputRef} 
            value={inputValue} 
            disabled={raceFinished == true && raceStarted == false ? true: false }
          />
        </div>
      </div>
    </>
  )
}