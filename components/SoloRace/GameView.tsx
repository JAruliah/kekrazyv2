import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../store';
import { GameStats } from './GameStats';

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
    setGameState
  } = useStore();

  const inputRef = useRef<any>(null);

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

  const handleChange = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key !== "shift key"){
      // if the letter is equal to the current letter of the current word
      if(e.key == quoteMap[`${wordArray[currentWord]}`][currentLetter]){
        // check if everything entered correct up until the current letter of the current word
        console.log(inputRef.current.value+e.key, "input");
        console.log(wordArray[currentWord]+"".slice(0, currentLetter+1), 'target word')
        console.log({currentWord},{currentLetter})
        // if(inputRef.current.value+e.key == wordArray[currentWord]+" ".slice(0, currentLetter+1)){
          console.log('made it ')
          // check if the end of the word
          if(currentLetter+1 == quoteMap[`${wordArray[currentWord]}`].length){
            // console.log('end')
            //check if the value is the last word and last letter in the race
            if(currentWord+1 == wordArray.length){
              setGameState({
                raceFinished:true,
                raceStarted: false,
              })
            }
            // check if the value inside the input is correct
            if(inputRef.current.value == wordArray[currentWord]){
              // move to the next word and clear input
              setInputValue("");
              setGameState({
                currentLetter: 0,
                currentWord: currentWord + 1,
                pointerIndex: pointerIndex + 1
              });
            }
          }
          // otherwise move to the next letter
          else{
            setGameState({
              currentLetter: currentLetter + 1,
              pointerIndex: pointerIndex + 1
            });
          }
        // }
      }
    }
  }



  return (
    <>
      <GameStats />
      <div className='row justify-content-center mb-4'>
        <div className='col-md-6'>
          {quote.content.split('').map((letter, index) => {
            return <span key={index} className = {pointerIndex == index? "bg-success":"" }>{letter}</span>
          })}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input 
            className='form-control' 
            onChange={(e) => setInputValue(e.target.value.trim())} 
            onKeyDown={(e) => handleChange(e)} 
            ref={inputRef} 
            value={inputValue} 
            disabled={raceFinished == true && raceStarted == false ? true: false }
          />
        </div>
      </div>
    </>
  )
}