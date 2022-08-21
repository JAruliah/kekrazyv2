const actions = (set:any, get:any) => {
  return{
    // set state
    setGameState: ( input: any ) => {
      set((state:any) => ({...state, ...input}))
    },

    // start the game timer
    startGameTimer: () => {
      // get the state
      const storeState = get();
      // set an interval
      const gameTime = setInterval(() => {
        set((state:any) => ({gameTimer: state.gameTimer - 1}))
      }, 1000)
      // if the timer reaches 0 clear the interval
      if(storeState.gameTimer == 0){
        clearInterval(gameTime);
      }
    }
    
  }
}
export default actions;