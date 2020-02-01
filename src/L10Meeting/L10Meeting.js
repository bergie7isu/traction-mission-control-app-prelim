import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Agenda from '../Agenda/Agenda';
import Todos from '../Todos/Todos';
import Issues from '../Issues/Issues';
import MessagesToCascade from '../MessagesToCascade/MessagesToCascade';
import MeetingRating from '../MeetingRating/MeetingRating';
import TractionMissionControlContext from '../TractionMissionControlContext';

class L10Meeting extends Component {
  static contextType = TractionMissionControlContext;

  render() {
    return (
      <div className='l10-meeting'>
        <h1 className='route-heading'>Level 10 Meeting</h1>
        <Nav />
        <Agenda />
        <Todos />
        <Issues />
        <MessagesToCascade />
        <MeetingRating />
        <button
          className='close-meeting-button'
          onClick={() => this.context.closeMeeting()}>
            Close Meeting
        </button>
      </div>
    );
  };
};

export default L10Meeting;