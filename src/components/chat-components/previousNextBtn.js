import React,{Component, /* Fragment */} from 'react';
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
import {displayPreviousNextQuestion} from '../../actions/chat-room';
import {mod} from '../../utils';
// import Back from './backBtn'

export class PreviousNextBtn extends Component {
  constructor(props) {
    super(props)
    
  }

  //show previous question or next
  onClickHandler(){
    if(this.props.prevNext === 'next'){
      let questionNumberToDisplay = (this.props.questionNumberToDisplay + 1) % this.props.questions.length
      this.props.dispatch(displayPreviousNextQuestion(questionNumberToDisplay))
    }else{
      let questionNumberToDisplay = (this.props.questionNumberToDisplay - 1 );
      questionNumberToDisplay = mod(questionNumberToDisplay, this.props.questions.length)
      this.props.dispatch(displayPreviousNextQuestion(questionNumberToDisplay))
    }
    
  }
  buttonToDisplay(){
    if(this.props.prevNext === 'next'){
      return '>'
    }else{
      return '<'
    }
  }
  
  render(){
    return (
      <button className="button prev-next" onClick={()=> this.onClickHandler()}>{this.buttonToDisplay()}</button>
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

