import React,{Component} from 'react';
import {connect} from 'react-redux';
import {postMessage}  from '../../actions/chat';
import {withRouter} from 'react-router-dom';

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
      <button className="button send" onClick={()=> this.onClickHandler()}>Send Question!</button>
      )
  }
}
const mapStateToProps = (state => {
  return ({
    questions: state.chatroom.questions,
    questionNumberToDisplay: state.chatroom.questionNumberToDisplay
  })
})


export default withRouter(connect(mapStateToProps)(sendQuestion));

