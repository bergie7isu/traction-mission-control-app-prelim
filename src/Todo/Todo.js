import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Todo.css';
import moment from 'moment';
import TractionMissionControlContext from '../TractionMissionControlContext';
import config from '../config';

class Todo extends Component {
  static contextType = TractionMissionControlContext;

  handleStatus(status, status_date) {
    const todoId = this.props.id;
    const updatedTodo = {...this.props, status: status, status_date: status_date};
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
    if (status === 'Not Done') {
      const newIssue = {
        issue: `Todo not done: ${updatedTodo.todo}`,
        who: `${updatedTodo.who}`,
        created: moment(Date.now()).format('YYYY-MM-DD'),
        status: null,
        status_date: null,
        reviewed: "no"
      };
      fetch(config.API_ENDPOINT + `/api/issues`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newIssue)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)}
        return response.json()
      })
      .then((jsonNewIssue) => {
        this.context.addIssue(jsonNewIssue);
      })
      .catch(error => {
          console.error({ error });
      });
    }
  };

  render() {
    let status;
    if (this.props.status !== null) {
      status = this.props.status.toLowerCase().replace(' ', '-');
    } else {
      status = '';
    }
    return (
      <div className={`todo ${status}`}>

        <section className='todo-content'>
          <section className='todo-todo-wrapper'>
            <section className='todo-todo'>
              <h3>{this.props.todo}</h3>
            </section>
            <section className='todo-who'>
              <h4>{this.props.who}</h4>
            </section>
          </section>
          <section className='todo-dates'>
            <section className='todo-created'>
              <b>Created: </b><br/>{moment(this.props.created).format('L')}
            </section>
            <section className='todo-due'>
              <b>Due: </b><br/>{moment(this.props.due).format('L')}
            </section>
          </section>
        </section>

        <section className={`todo-status ${this.props.show_status}`}>
          <b>Status: </b>{this.props.status} <b>Status Date: </b> {moment(this.props.status_date).format('L')}
        </section>  
        <section className={`todo-buttons ${this.props.buttons}`}>
          <button 
            className='todo-done-button'
            onClick={() => this.handleStatus('Done', moment(Date.now()).format('YYYY-MM-DD'))}>
              Done
          </button>
          <button 
            className='todo-not-done-button'
            onClick={() => this.handleStatus('Not Done', moment(Date.now()).format('YYYY-MM-DD'))}>
              Not Done
          </button>
          <button 
            className='todo-hold-button'
            onClick={() => this.handleStatus('Hold', moment(Date.now()).format('YYYY-MM-DD'))}>
              Hold
          </button>
          <Link to={`/EditTodo/${this.props.id}`}>
            <button
              className='todo-edit'>
                Edit
            </button>
          </Link>
        </section>

      </div>
    );
  };
};

export default Todo;