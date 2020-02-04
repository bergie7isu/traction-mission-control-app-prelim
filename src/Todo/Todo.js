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
          
        <section className={`todo-buttons ${this.props.buttons}`}>
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