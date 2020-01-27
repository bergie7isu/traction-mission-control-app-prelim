import React, { Component } from 'react';
import './Todo.css';
import moment from 'moment';

class Todo extends Component {
  render() {
    return (
      <div className='todo'>
        <section className='todo-status-buttons'>
          <button className='todo-done-button'>Done</button>
          <button className='todo-not-done-button'>Not Done</button>
          <button className='todo-hold-button'>Hold</button>
        </section>
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
            <b>Created: </b>{moment(this.props.created).format('L')}
          </section>
          <section className='todo-due'>
            <b>Due: </b>{moment(this.props.due).format('L')}
          </section>
        </section>
        <section className='todo-status'>
          <section><b>Status:</b></section>
          {this.props.status}
        </section>
        <section className='todo-edit'>
          <button>Edit</button>
        </section>
      </div>
    );
  };
};

export default Todo;