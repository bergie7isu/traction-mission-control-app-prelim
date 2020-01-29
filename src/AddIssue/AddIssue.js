import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';
import uuid from 'uuid';

class AddIssue extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            issueIssue: {
                value: "",
                touched: false
            },
            issueWho: {
                value: "",
                touched: false
            }
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const newIssue = {
            id: uuid(),
            issue: event.target['issue-issue'].value,
            who: event.target['issue-who'].value,
            created: moment(Date.now()).format('YYYY-MM-DD'),
            status: "",
        };
        this.context.addIssue(newIssue);
        this.props.history.goBack()
    };

    updateIssueIssue(issueIssue) {
        this.setState({
            issueIssue: {
                value: issueIssue,
                touched: true
            }
        });
    };

    updateIssueWho(issueWho) {
        this.setState({
            issueWho: {
                value: issueWho,
                touched: true
            }
        });
    };

    validateIssueIssue() {
        const issueIssue = this.state.issueIssue.value.trim();
        if (issueIssue === "") {
            return "Enter an issue!"
        }
    };

    validateIssueWho() {
        const issueWho = this.state.issueWho.value.trim();
        if (issueWho === "--Select an owner!--" || issueWho === "") {
            return "Someone needs to own it!"
        }
    };

    render() {
        const { team } = this.context;
        const issueIssueError = this.validateIssueIssue();
        const issueWhoError = this.validateIssueWho();
        return (
            <div>
                <h2>Add an Issue!</h2>
                <form
                    className="add-issue-form"
                    onSubmit={this.handleSubmit}>
                        <div className='add-issue-inputs'>
                            <div className='add-issue-issue'>
                                <label htmlFor='issue-issue'>
                                    What's the issue?
                                </label>
                                <input
                                    type='string'
                                    name='issue-issue'
                                    id='issue-issue'
                                    placeholder="Problem, idea, communication..."
                                    onChange={e => this.updateIssueIssue(e.target.value)}/>
                            </div>
                            {this.state.issueIssue.touched && <ValidationError message={issueIssueError} />}
                            <div className='add-issue-who'>
                                <label htmlFor='issue-who'>
                                    Whose issue is it?
                                </label>
                                <select
                                    type='string'
                                    name='issue-who'
                                    id='issue-who'
                                    onChange={e => this.updateIssueWho(e.target.value)}>
                                        <option>--Select an owner!--</option>
                                        {team.map(name =>
                                            <option
                                                key={name}>
                                                    {name}
                                            </option>
                                        )}
                                </select>
                            </div>
                            {this.state.issueWho.touched && <ValidationError message={issueWhoError} />}
                        </div>
                        <div className='add-issue-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateIssueIssue() ||
                                    this.validateIssueWho()}>
                                Add Issue!
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

export default AddIssue;