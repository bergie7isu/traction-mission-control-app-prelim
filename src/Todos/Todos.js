import React, { Component } from 'react';
import data from '../dummy-store';
import Todo from '../Todo/Todo';

class Todos extends Component {
  render() {
    const todos = data.todos;
    return (
        <div className='todos'>
            <h2>Todos</h2>
            {todos.map(todo =>
                <Todo
                    key={todo.id}
                    id={todo.id}
                    todo={todo.todo}
                    who={todo.who}
                    created={todo.created}
                    due={todo.due}
                    status={todo.status}
                    issue={todo.issue}
                />
            )}
        </div>
    );
  };
};

export default Todos;