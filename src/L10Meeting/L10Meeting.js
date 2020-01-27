import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Agenda from '../Agenda/Agenda';
import Todos from '../Todos/Todos';
import Issues from '../Issues/Issues';
import MessagesToCascade from '../MessagesToCascade/MessagesToCascade';
import MeetingRating from '../MeetingRating/MeetingRating';

class L10Meeting extends Component {
  render() {
    return (
      <div className='l10-meeting'>
        <Nav />
        <Agenda />
        <Todos />
        <Issues />
        <MessagesToCascade />
        <MeetingRating />
        <button>Close Meeting</button>
      </div>
    );
  };
};

export default L10Meeting;