import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Agenda from '../Agenda/Agenda';
import Todos from '../Todos/Todos';
import Issues from '../Issues/Issues';
import MessagesToCascade from '../MessagesToCascade/MessagesToCascade';
import MeetingRating from '../MeetingRating/MeetingRating';
import TractionMissionControlContext from '../TractionMissionControlContext';
import config from '../config';

class L10Meeting extends Component {
  static contextType = TractionMissionControlContext;

  handleCloseMeeting() {
    const { todos, issues } = this.context;
    todos.filter(todo => todo.reviewed === 'no' && todo.status !== null && todo.status !== 'Hold')
    .map(todo => {
      const todoId = todo.id
      const updatedTodo = {...todo, reviewed: 'yes'};
      fetch(config.API_ENDPOINT + `/api/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.context.editTodo(updatedTodo);
      })
      .catch(error => {
        console.error({ error });
      });
      return updatedTodo;
    });
    issues.filter(issue => issue.reviewed === 'no' && issue.status !== null)
    .map(issue => {
      const issueId = issue.id
      const updatedIssue = {...issue, reviewed: 'yes'};
      fetch(config.API_ENDPOINT + `/api/issues/${issueId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedIssue)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.context.editIssue(updatedIssue);
      })
      .catch(error => {
        console.error({ error });
      });
      return updatedIssue;
    });
  };

  render() {
    return (
      <div className='l10-meeting'>
        <Nav />
        <h1 className='route-heading'>Level 10 Meeting</h1>
        <Agenda />
        <Todos />
        <Issues />
        <MessagesToCascade />
        <MeetingRating />
        <button
          className='close-meeting-button'
          onClick={() => this.handleCloseMeeting()}>
            Close Meeting
        </button>
      </div>
    );
  };
};

export default L10Meeting;