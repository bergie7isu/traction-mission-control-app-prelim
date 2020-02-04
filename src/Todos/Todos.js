import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Todo from '../Todo/Todo';
import TractionMissionControlContext from '../TractionMissionControlContext';

class Todos extends Component {
  static contextType = TractionMissionControlContext;
  render() {
    const { todos } = this.context;
    return (
      <div className='todos'>
        <h2>Todos</h2>
        {todos.map(todo => 
          (todo.reviewed === "no")
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
              buttons=''
            />
            : null
        )}
        <Link to={'/AddTodo'}>
          <button
            className='add-todo'>
              Add Todo
          </button>
        </Link>
      </div>
    );
  };
};

export default Todos;