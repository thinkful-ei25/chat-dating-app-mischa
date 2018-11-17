
const initialState={
  chatWindow : ['someText']
}

function reducer(state=initialState, action) {
  // switch(action.type){
  //   case FETCHCHEESESREQUEST: 
  //     return ({
  //       ...state,
  //       loading: true
  //     })
  //   case FETCHCHEESESSUCCESS: 
  //     return({
  //       ...state,
  //       cheeses: action.cheeseList
  //     })
  //   case FETCHCHEESESERROR:
  //     return({
  //       ...state,
  //       err: action.err
  //     })
  //   default: 
  //     return state;
  // }
  console.log(state);
  return state;
};
export default reducer;