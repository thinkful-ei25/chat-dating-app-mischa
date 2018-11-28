import React,{Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PreviousNextBtn from './previousNextBtn';
// import Back from './backBtn'

export class Questions extends Component {

  
  render(){
    console.log('questions props: ', this.props);
    return (
      <Fragment>
        <div>
          {this.props.questions[this.props.questionNumberToDisplay]}
        </div>
        
        <PreviousNextBtn prevNext={'previous'}/>
        <PreviousNextBtn prevNext={'next'}/>
     </Fragment>
      )
  }
}
const mapStateToProps = (state => {
  return ({
    questions: state.chatroom.questions,
    questionNumberToDisplay: state.chatroom.questionNumberToDisplay
  })
  
})

export default withRouter(connect(mapStateToProps)(Questions));

