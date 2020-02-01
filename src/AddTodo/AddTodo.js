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
            todo: {
                value: "",
                touched: false
            },
            who: {
                value: "",
                touched: false
            },
            due: {
                value: moment(Date.now()).add(7,'d').format('YYYY-MM-DD'),
                touched: false
            },
            issue: {
                value: "",
                touched: false
            }
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const issue = this.context.issues.filter(issue => issue.issue.trim() === event.target['issue'].value.trim());
        const newTodo = {
            id: uuid(),
            todo: event.target['todo'].value,
            who: event.target['who'].value,
            created: moment(Date.now()).format('YYYY-MM-DD'),
            due: event.target['due'].value,
            status: "",
            reviewed: "no",
            issue: issue.length === 1 ? issue[0].id : ""
        };
        this.context.addTodo(newTodo);
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
        const todoError = this.validateTodo();
        const whoError = this.validateWho();
        const dueError = this.validateDue();
        return (
            <div>
                <h2>Add a Todo!</h2>
                <form
                    className="add-todo-form"
                    onSubmit={this.handleSubmit}>
                        <div className='add-todo-inputs'>
                            <div className='add-todo-todo'>
                                <label htmlFor='todo'>
                                    What's the todo?
                                </label>
                                <input
                                    type='string'
                                    name='todo'
                                    id='todo'
                                    placeholder="Action!"
                                    onChange={e => this.updateTodo(e.target.value)}/>
                            </div>
                            {this.state.todo.touched && <ValidationError message={todoError} />}
                            <div className='add-todo-who'>
                                <label htmlFor='who'>
                                    Whose todo is it?
                                </label>
                                <select
                                    type='string'
                                    name='who'
                                    id='who'
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
                            <div className='add-todo-due'>
                                <label htmlFor='due'>
                                    When is this todo due?
                                </label>
                                <input
                                    type='date'
                                    name='due'
                                    id='due'
                                    defaultValue={moment(Date.now()).add(7,'d').format('YYYY-MM-DD')}
                                    onChange={e => this.updateDue(e.target.value)}
                                    />
                            </div>
                            {this.state.due.touched && <ValidationError message={dueError} />}
                            <div className='add-todo-issue'>
                                <label htmlFor='issue'>
                                    What issue is this todo related to?
                                </label>
                                <select
                                    type='string'
                                    name='issue'
                                    id='issue'
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
                        <div className='add-todo-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateTodo() ||
                                    this.validateWho() ||
                                    this.validateDue()}>
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