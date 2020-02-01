import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';

class EditTodo extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state={
            id: {
                value: '',
                touched: false
            },
            todo: {
                value: '',
                touched: false
            },
            who: {
                value: '',
                touched: false
            },
            created: {
                value: '',
                touched: false
            },
            due: {
                value: '',
                touched: false
            },
            status: {
                value: '',
                touched: false
            },
            reviewed: {
                value: '',
                touched: false
            },
            issue: {
                value: '',
                touched: false
            },
        }
    };

    componentDidMount() {
        const clickedTodo = this.context.todos.filter(todo => todo.id === this.props.match.params.id);
        this.setState({
            id: {
                value: clickedTodo[0].id,
                touched: false
            },
            todo: {
                value: clickedTodo[0].todo,
                touched: false
            },
            who: {
                value: clickedTodo[0].who,
                touched: false
            },
            created: {
                value: clickedTodo[0].created,
                touched: false
            },
            due: {
                value: clickedTodo[0].due,
                touched: false
            },
            status: {
                value: clickedTodo[0].status,
                touched: false
            },
            reviewed: {
                value: clickedTodo[0].reviewed,
                touched: false
            },
            issue: {
                value: clickedTodo[0].issue,
                touched: false
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const issue = this.context.issues.filter(issue => issue.issue.trim() === event.target['issue'].value.trim());
        const updatedTodo = {
            id: this.props.match.params.id,
            todo: event.target['todo'].value,
            who: event.target['who'].value,
            created: moment(this.state.created.value).format('YYYY-MM-DD'),
            due: event.target['due'].value,
            status: this.state.status.value,
            reviewed: this.state.reviewed.value,
            issue: issue.length === 1 ? issue[0].id : ""
        };
        this.context.editTodo(updatedTodo);
        this.props.history.goBack();
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

    updateIssue(issue) {
        this.setState({
            issue: {
                value: issue,
                touched: true
            }
        });
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
        const { issues } = this.context;
        const { team } = this.context;
        const issue = issues.filter(issue => issue.id === this.state.issue.value);
        const issueText = issue.length === 1 ? issue[0].issue : "";
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
                                    value={moment(this.state.due.value).format('YYYY-MM-DD')}
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
                                    value={issueText}
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
                                onClick={() => {
                                    this.context.deleteTodo(this.props.match.params.id);
                                    this.props.history.goBack();
                                }}>
                                    Delete Todo
                            </button>
                        </div>
                </form>
            </div>
        );
    };
};

export default EditTodo;