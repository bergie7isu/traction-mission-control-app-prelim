import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import Todo from '../Todo/Todo';
import moment from 'moment';

class FilteredTodos extends Component {
  static contextType = TractionMissionControlContext;

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      who: 'All',
      date_start: '',
      date_end: '',
      status: 'All',
    };
  };

  filterText(text) {
    this.setState({
      text: text
    });
  };

  filterWho(who) {
    this.setState({
      who: who
    });
  };

  filterStartDate(date) {
    this.setState({
      date_start: date
    });
  };

  filterEndDate(date) {
    this.setState({
      date_end: date
    });
  };

  filterStatus(status) {
    this.setState({
      status: status
    });
  };

  todoFilterText() {
    const { todos } = this.context;
    if (this.state.text === '') {
      return todos
    } else {
      return todos.filter(todo => todo.todo.toLowerCase().includes(this.state.text.toLowerCase()))
    }
  };

  todoFilterWho(todos) {
    if (this.state.who === 'All') {
      return todos
    } else {
      return todos.filter(todo => todo.who === this.state.who)
    }
  };

  todoFilterStartDate(todos) {
    if (this.state.date_start === '') {
      return todos
    } else {
      return todos.filter(todo => moment(todo.created).isSameOrAfter(moment(this.state.date_start)))
    }
  };

  todoFilterEndDate(todos) {
    if (this.state.date_end === '') {
      return todos
    } else {
      return todos.filter(todo => moment(todo.created).isSameOrBefore(moment(this.state.date_end)))
    }
  };

  todoFilterStatus(todos) {
    if (this.state.status === 'All') {
      return todos
    } else {
      return todos.filter(todo => todo.status === this.state.status)
    }
  };

  noTodos(filteredTodos) {
    if (filteredTodos.length === 0) {
      return <h3>No todos match your filter!</h3>
    }
  };

  render() {
    const { team } = this.context;
    const filteredTodos = this.todoFilterStatus(this.todoFilterEndDate(this.todoFilterStartDate(this.todoFilterWho(this.todoFilterText()))));
    return (
      <div className='filtered-todos'>
        <div className='filter-todo-text'>
          <label htmlFor='text'>
            Todo text:
          </label>
          <textarea
            name='text'
            id='text'
            value={this.state.text}
            onChange={e => this.filterText(e.target.value)}>
          </textarea>
        </div>
        <div className='filter-todo-who'>
          <label htmlFor='who'>
            Who:
          </label>
          <select
            type='string'
            name='who'
            id='who'
            value={this.state.who}
            onChange={e => this.filterWho(e.target.value)}>
              <option>All</option>
              {team.map(name =>
                <option
                  key={name}>
                    {name}
                </option>
              )}
          </select>
        </div>
        <div className='filter-todo-start-date'>
          <label htmlFor='start-date'>
            Start date:
          </label>
          <input
            type='date'
            name='start-date'
            id='start-date'
            value={this.state.date_start}
            onChange={e => this.filterStartDate(e.target.value)}
          />
        </div>
        <div className='filter-todo-end-date'>
          <label htmlFor='end-date'>
            End date:
          </label>
          <input
            type='date'
            name='end-date'
            id='end-date'
            value={this.state.date_end}
            onChange={e => this.filterEndDate(e.target.value)}
          />
        </div>
        <div className='filter-todo-status'>
        <label htmlFor='status'>
            Status:
          </label>
          <select
            type='string'
            name='status'
            id='status'
            value={this.state.status}
            onChange={e => this.filterStatus(e.target.value)}>
              <option>All</option>
              <option>Done</option>
              <option>Not Done</option>
          </select>
        </div>
        <div className='filted-todos'>
          {filteredTodos.map(todo => 
            (todo.reviewed === "yes")
              ? <Todo
                key={todo.id}
                id={todo.id}
                todo={todo.todo}
                who={todo.who}
                created={todo.created}
                due={todo.due}
                status={todo.status}
                reviewed={todo.reviewed}
                issue={todo.issue}
                buttons='hidden'
              />
              : null
          )}
          {this.noTodos(filteredTodos)}
        </div>
      </div>
    );
  };
};

export default FilteredTodos;