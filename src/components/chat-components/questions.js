import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PreviousNextBtn from './previousNextBtn';
import Send from './sendQuestion';
import './questions.css';
// import Back from './backBtn'

export class Questions extends Component {
  render() {
    return (
      <section className="questions-area">
        <div className="questions">
          {this.props.questions[this.props.questionNumberToDisplay]}
        </div>
        <PreviousNextBtn prevNext={'previous'} />
        <Send />
        <PreviousNextBtn prevNext={'next'} />
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    questions: state.chatroom.questions,
    questionNumberToDisplay: state.chatroom.questionNumberToDisplay,
  };
};

export default withRouter(connect(mapStateToProps)(Questions));
