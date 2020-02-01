import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Todo.css';
import moment from 'moment';
import TractionMissionControlContext from '../TractionMissionControlContext';

class Todo extends Component {
  static contextType = TractionMissionControlContext;

  render() {
    const todoId = this.props.id;
    return (
      <div className={`todo ${this.props.status.replace(" ", "-").toLowerCase()}`}>
        <section className='todo-status-buttons'>
          <button 
            className='todo-done-button'
            onClick={() => this.context.todoStatus(todoId, "Done")}>
              Done
          </button>
          <button 
            className='todo-not-done-button'
            onClick={() => this.context.todoStatus(todoId, "Not Done")}>
              Not Done
          </button>
          <button 
            className='todo-hold-button'
            onClick={() => this.context.todoStatus(todoId, "Hold")}>
              Hold
          </button>
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
          <Link to={`/EditTodo/${this.props.id}`}>
            <button>Edit</button>
          </Link>
        </section>
      </div>
    );
  };
};

export default Todo;