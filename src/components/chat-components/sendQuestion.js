import React,{Component} from 'react';
import {connect} from 'react-redux';
import {postMessage}  from '../../actions/chat';
import {withRouter} from 'react-router-dom';


// import Back from './backBtn'

export class sendQuestion extends Component {
  
  onClickHandler(){
    const question = this.props.questions[this.props.questionNumberToDisplay]
    const url = this.props.location.pathname
    this.props.dispatch(postMessage({
        message: question
      }, url)
      )
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


export default withRouter(connect(mapStateToProps)(sendQuestion));

