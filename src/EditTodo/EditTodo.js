import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';
import uuid from 'uuid';

class EditTodo extends Component {
    static contextType = TractionMissionControlContext;

    componentDidMount() {
        const todoId = this.props.params.id;
        console.log(todoId);
        this.setState({
            id: ,
            todo: ,
            who: ,
            created: ,
            due: ,
            status: ,
            issue: 
        })
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
        this.context.editTodo(newTodo);
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
                <h2>Edit a Todo!</h2>
                <form
                    className="edit-todo-form"
                    onSubmit={this.handleSubmit}>
                        <div className='edit-todo-inputs'>
                            <div className='edit-todo-todo'>
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
                            <div className='edit-todo-who'>
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
                            <div className='edit-todo-due'>
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
                            <div className='edit-todo-issue'>
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
                        <div className='edit-todo-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateTodoTodo() ||
                                    this.validateTodoWho() ||
                                    this.validateTodoDue()}>
                                Update Todo!
                            </button>
                            {'  '}
                            <button
                                type='button'
                                onClick={() => this.props.history.goBack()}>
                                    Cancel
                            </button>
                            <button
                                type='button'
                                onClick={() => this.props.history.goBack()}>
                                    Delete Todo
                            </button>
                        </div>
                </form>
            </div>
        );
    };
};

export default EditTodo;