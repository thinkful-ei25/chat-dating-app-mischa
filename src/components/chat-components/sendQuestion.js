import React,{Component, /* Fragment */} from 'react';
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
import {displayPreviousNextQuestion} from '../../actions/chat-room';

// import Back from './backBtn'

export class PreviousNextBtn extends Component {
  
  onClickHandler(){
    
  }

  render(){
    return (
      <button onClick={()=> this.onClickHandler()}>Send Question!</button>
      )
  }
}
const mapStateToProps = (state => {
  // console.log(state.next);
  return ({
    questions: state.chatroom.questions,
    questionNumberToDisplay: state.chatroom.questionNumberToDisplay
  })
})


export default connect(mapStateToProps)(PreviousNextBtn);

