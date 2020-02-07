import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class EditTodo extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state={
            todo: {
                value: ''
            },
            who: {
                value: ''
            },
            created: '',
            due: {
               value: ''
            },
            status: '',
            reviewed: '',
            issue: '',
            issueText: '',
            ready: false
        }
    };

    componentDidMount() {
        const todoId = this.props.match.params.id;
        fetch(config.API_ENDPOINT + `/api/todos/${todoId}`)
        .then(todoResponse => {
            if (!todoResponse.ok) {
            throw new Error(todoResponse.status)
            }
            return todoResponse.json()
        })
        .then(todo => {
            this.setState({
                todo: {
                    value: todo.todo,
                    touched: false
                },
                who: {
                    value: todo.who,
                    touched: false
                },
                created: todo.created,
                due: {
                    value: todo.due,
                    touched: false
                },
                status: todo.status,
                reviewed: todo.reviewed,
                issue: todo.issue
            });
            return fetch(config.API_ENDPOINT + `/api/issues/${todo.issue}`)
        })
        .then(issueResponse => {
            if (!issueResponse.ok) {
                throw new Error(issueResponse.status)
                }
            return issueResponse.json()})
        .then(issue => {
            this.setState({
                issueText: issue.issue,
                ready: true
            })
        })
        .catch(editTodoError => this.setState({ editTodoError }));
    };

    handleSubmit = event => {
        event.preventDefault();
        const todoId = this.props.match.params.id;
        const updatedTodo = {
            id: todoId,
            todo: this.state.todo.value,
            who: this.state.who.value,
            created: this.state.created,
            due: this.state.due.value,
            status: this.state.status,
            reviewed: this.state.reviewed,
            issue: this.state.issue
        };
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
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error });
        });
    };

    handleDelete = event => {
        event.preventDefault();
        const todoId = this.props.match.params.id;
        fetch(config.API_ENDPOINT + `/api/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)}
        })
        .then(() => {
            this.context.deleteTodo(todoId);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error })
        });
    };

    updateTodo(todo) {
        this.setState({
            todo: {
                value: todo,
                touched: true
            }
        });
    };

    updateWho(who) {
        this.setState({
            who: {
                value: who,
                touched: true
            }
        });
    };

    updateDue(due) {
        this.setState({
            due: {
                value: due,
                touched: true
            }
        });
    };

    updateIssue(issueText) {
        const { issues } = this.context;
        const whichIssue = issues.filter(issue => issue.issue === issueText);
        if (whichIssue.length !== 0) {
            const issue = whichIssue[0].id;
            this.setState({
                issue: issue,
                issueText: issueText
            });
        } else {
            this.setState({
                issue: null,
                issueText: ""
            });
        }
    };

    validateTodo() {
        const todo = this.state.todo.value.trim();
        if (todo === "") {
            return "Enter a todo!"
        }
    };

    validateWho() {
        const who = this.state.who.value.trim();
        if (who === "--Select an owner!--" || who === "") {
            return "Someone needs to own it!"
        }
    };
 
    validateDue() {
        const due = this.state.due.value.trim();
        if (due === "") {
            return "Commit to a due date!"
        }
    };

    render() {
        if (!this.state.ready) {
            return null
        } else {
            const { issues } = this.context;
            const { team } = this.context;
            const todoError = this.validateTodo();
            const whoError = this.validateWho();
            const dueError = this.validateDue();
            return (
                <div>
                    <h2>Edit a Todo!</h2>
                    <form
                        className="edit-todo-form"
                        onSubmit={this.handleSubmit}>
                            <div className='edit-todo-inputs'>
                                <div className='edit-todo-todo'>
                                    <label htmlFor='todo'>
                                        What's the todo?
                                    </label>
                                    <input
                                        type='string'
                                        name='todo'
                                        id='todo'
                                        placeholder='Action!'
                                        value={this.state.todo.value}
                                        onChange={e => this.updateTodo(e.target.value)}/>
                                </div>
                                {this.state.todo.touched && <ValidationError message={todoError} />}
                                <div className='edit-todo-who'>
                                    <label htmlFor='who'>
                                        Whose todo is it?
                                    </label>
                                    <select
                                        type='string'
                                        name='who'
                                        id='who'
                                        value={this.state.who.value}
                                        onChange={e => this.updateWho(e.target.value)}>
                                            <option>--Select an owner!--</option>
                                            {team.map(name =>
                                                <option
                                                    key={name}>
                                                        {name}
                                                </option>
                                            )}
                                    </select>
                                </div>
                                {this.state.who.touched && <ValidationError message={whoError} />}
                                <div className='edit-todo-due'>
                                    <label htmlFor='due'>
                                        When is this todo due?
                                    </label>
                                    <input
                                        type='date'
                                        name='due'
                                        id='due'
                                        value={this.state.due.value}
                                        onChange={e => this.updateDue(e.target.value)}
                                        />
                                </div>
                                {this.state.due.touched && <ValidationError message={dueError} />}
                                <div className='edit-todo-issue'>
                                    <label htmlFor='issue'>
                                        What issue is this todo related to?
                                    </label>
                                    <select
                                        type='string'
                                        name='issue'
                                        id='issue'
                                        value={this.state.issueText}
                                        onChange={e => this.updateIssue(e.target.value)}>
                                            <option>--Select an issue!--</option>
                                            {issues.map(issue =>
                                                (issue.reviewed === "no")
                                                    ? <option
                                                    key={issue.id}>
                                                        {issue.issue}
                                                    </option>
                                                    : null
                                            )}
                                    </select>
                                </div>
                            </div>
                            <div className='edit-todo-buttons'>
                                <button
                                    type='submit'
                                    disabled={
                                        this.validateTodo() ||
                                        this.validateWho() ||
                                        this.validateDue()}>
                                    Update Todo!
                                </button>
                                {'  '}
                                <button
                                    type='button'
                                    onClick={() => this.props.history.goBack()}>
                                        Cancel
                                </button>
                                {'  '}
                                <button
                                    type='button'
                                    onClick={this.handleDelete}>
                                        Delete Todo
                                </button>
                            </div>
                    </form>
                </div>
            );
        };
    };
};

export default EditTodo;