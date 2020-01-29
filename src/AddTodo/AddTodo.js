import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';
import uuid from 'uuid';

class AddTodo extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            todoTodo: {
                value: "",
                touched: false
            },
            todoWho: {
                value: "",
                touched: false
            },
            todoDue: {
                value: moment(Date.now()).add(7,'d').format('YYYY-MM-DD'),
                touched: false
            },
            todoIssue: {
                value: "",
                touched: false
            }
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const issue = this.context.issues.filter(issue => issue.issue.trim() === event.target['todo-issue'].value.trim());
        const newTodo = {
            id: uuid(),
            todo: event.target['todo-todo'].value,
            who: event.target['todo-who'].value,
            created: moment(Date.now()).format('YYYY-MM-DD'),
            due: event.target['todo-due'].value,
            status: "",
            issue: issue.length === 1 ? issue[0].id : ""
        };
        this.context.addTodo(newTodo);
        this.props.history.goBack()
    };

    updateTodoTodo(todoTodo) {
        this.setState({
            todoTodo: {
                value: todoTodo,
                touched: true
            }
        });
    };

    updateTodoWho(todoWho) {
        this.setState({
            todoWho: {
                value: todoWho,
                touched: true
            }
        });
    };

    updateTodoDue(todoDue) {
        this.setState({
            todoDue: {
                value: todoDue,
                touched: true
            }
        });
    };

    updateTodoIssue(todoIssue) {
        this.setState({
            todoIssue: {
                value: todoIssue,
                touched: true
            }
        });
    };

    validateTodoTodo() {
        const todoTodo = this.state.todoTodo.value.trim();
        if (todoTodo === "") {
            return "Enter a todo!"
        }
    };

    validateTodoWho() {
        const todoWho = this.state.todoWho.value.trim();
        if (todoWho === "--Select an owner!--" || todoWho === "") {
            return "Someone needs to own it!"
        }
    };

    validateTodoDue() {
        const todoDue = this.state.todoDue.value.trim();
        if (todoDue === "") {
            return "Commit to a due date!"
        }
    };

    render() {
        const { issues } = this.context;
        const { team } = this.context;
        const todoTodoError = this.validateTodoTodo();
        const todoWhoError = this.validateTodoWho();
        const todoDueError = this.validateTodoDue();
        return (
            <div>
                <h2>Add a Todo!</h2>
                <form
                    className="add-todo-form"
                    onSubmit={this.handleSubmit}>
                        <div className='add-todo-inputs'>
                            <div className='add-todo-todo'>
                                <label htmlFor='todo-todo'>
                                    What's the todo?
                                </label>
                                <input
                                    type='string'
                                    name='todo-todo'
                                    id='todo-todo'
                                    placeholder="Action!"
                                    onChange={e => this.updateTodoTodo(e.target.value)}/>
                            </div>
                            {this.state.todoTodo.touched && <ValidationError message={todoTodoError} />}
                            <div className='add-todo-who'>
                                <label htmlFor='todo-who'>
                                    Whose todo is it?
                                </label>
                                <select
                                    type='string'
                                    name='todo-who'
                                    id='todo-who'
                                    onChange={e => this.updateTodoWho(e.target.value)}>
                                        <option>--Select an owner!--</option>
                                        {team.map(name =>
                                            <option
                                                key={name}>
                                                    {name}
                                            </option>
                                        )}
                                </select>
                            </div>
                            {this.state.todoWho.touched && <ValidationError message={todoWhoError} />}
                            <div className='add-todo-due'>
                                <label htmlFor='todo-due'>
                                    When is this todo due?
                                </label>
                                <input
                                    type='date'
                                    name='todo-due'
                                    id='todo-due'
                                    defaultValue={moment(Date.now()).add(7,'d').format('YYYY-MM-DD')}
                                    onChange={e => this.updateTodoDue(e.target.value)}
                                    />
                            </div>
                            {this.state.todoDue.touched && <ValidationError message={todoDueError} />}
                            <div className='add-todo-issue'>
                                <label htmlFor='todo-issue'>
                                    What issue is this todo related to?
                                </label>
                                <select
                                    type='string'
                                    name='todo-issue'
                                    id='todo-issue'
                                    onChange={e => this.updateTodoIssue(e.target.value)}>
                                        <option>--Select an issue!--</option>
                                        {issues.map(issue =>
                                            <option
                                                key={issue.id}>
                                                    {issue.issue}
                                            </option>
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className='add-todo-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateTodoTodo() ||
                                    this.validateTodoWho() ||
                                    this.validateTodoDue()}>
                                Add Todo!
                            </button>
                            {'  '}
                            <button
                                type='button'
                                onClick={() => this.props.history.goBack()}>
                                    Cancel
                            </button>
                        </div>
                </form>
            </div>
        );
    };
};

export default AddTodo;