import React from 'react';
import PreviousNextBtn from '../PreviousNextBtn';
import './questions.css';

function onClick(socket, question, url, username) {
  socket.emit('send_message', {
    message: question,
    url,
    username,
  });
}

export default function Questions({ question, socket, username, url }) {
  return (
    <section className="questions-area">
      <div className="questions">{question}</div>
      <div className="question-btns">
        <PreviousNextBtn prevNext={'previous'} />
        <button
          className="button send"
          onClick={e => onClick(socket, question, url, username)}
        >
          Ask Question
        </button>
        <PreviousNextBtn prevNext={'next'} />
      </div>
    </section>
  );
}
