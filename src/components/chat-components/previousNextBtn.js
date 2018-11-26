import React,{Component, /* Fragment */} from 'react';
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
import {displayPreviousNextQuestion} from '../../actions/chat-room';

// import Back from './backBtn'

export class PreviousNextBtn extends Component {
  
  //from https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
  mod(x, n) {
    return (x % n + n) % n  
  }
  //show previous question or next
  onClickHandler(){
    if(this.props.prevNext === 'next'){
      let questionNumberToDisplay = (this.props.questionNumberToDisplay + 1) % this.props.questions.length
      this.props.dispatch(displayPreviousNextQuestion(questionNumberToDisplay))
    }else{
      let questionNumberToDisplay = (this.props.questionNumberToDisplay - 1 );
      questionNumberToDisplay = this.mod(questionNumberToDisplay, this.props.questions.length)
      this.props.dispatch(displayPreviousNextQuestion(questionNumberToDisplay))
    }
    
  }

  render(){
    return (
      <button onClick={()=> this.onClickHandler()}>{this.props.prevNext}</button>
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

