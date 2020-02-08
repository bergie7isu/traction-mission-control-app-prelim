import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class EditIssue extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            issue: {
                value: ""
            },
            who: {
                value: ""
            },
            created: "",
            status: "",
            status_date: "",
            reviewed: "",
            ready: false
        };
    };

    componentDidMount() {
        const issueId = this.props.match.params.id;
        fetch(config.API_ENDPOINT + `/api/issues/${issueId}`)
        .then(issueResponse => {
            if (!issueResponse.ok) {
            throw new Error(issueResponse.status)
            }
            return issueResponse.json()
        })
        .then(issue => {
            this.setState({
                issue: {
                    value: issue.issue,
                    touched: false
                },
                who: {
                    value: issue.who,
                    touched: false
                },
                created: issue.created,
                status: issue.status,
                status_date: issue.status_date,
                reviewed: issue.reviewed,
                ready: true
            });
        })
        .catch(editIssueError => this.setState({ editIssueError }));
    };

    handleSubmit = event => {
        event.preventDefault();
        const issueId = this.props.match.params.id;
        const updatedIssue = {
            id: issueId,
            issue: this.state.issue.value,
            who: this.state.who.value,
            created: this.state.created,
            status: this.state.status,
            status_date: this.state.status_date,
            reviewed: this.state.reviewed
        };
        fetch(config.API_ENDPOINT + `/api/issues/${issueId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedIssue)
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.context.editIssue(updatedIssue);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error });
        });
    };

    handleDelete = event => {
        event.preventDefault();
        const issueId = this.props.match.params.id;
        fetch(config.API_ENDPOINT + `/api/issues/${issueId}`, {
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
            this.context.deleteIssue(issueId);
            this.props.history.goBack();
        })
        .catch(error => {
            console.error({ error })
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

    updateWho(who) {
        this.setState({
            who: {
                value: who,
                touched: true
            }
        });
    };

    validateIssue() {
        const issue = this.state.issue.value.trim();
        if (issue === "") {
            return "Enter an issue!"
        }
    };

    validateWho() {
        const who = this.state.who.value.trim();
        if (who === "--Select an owner!--" || who === "") {
            return "Someone needs to own it!"
        }
    };

    render() {
        const { team } = this.context;
        const issueError = this.validateIssue();
        const whoError = this.validateWho();
        return (
            <div>
                <h2>Edit an Issue!</h2>
                <form
                    className="edit-issue-form"
                    onSubmit={this.handleSubmit}>
                        <div className='edit-issue-inputs'>
                            <div className='edit-issue-issue'>
                                <label htmlFor='issue'>
                                    What's the issue?
                                </label>
                                <input
                                    type='string'
                                    name='issue'
                                    id='issue'
                                    placeholder="Problem, idea, communication..."
                                    value={this.state.issue.value}
                                    onChange={e => this.updateIssue(e.target.value)}/>
                            </div>
                            {this.state.issue.touched && <ValidationError message={issueError} />}
                            <div className='edit-issue-who'>
                                <label htmlFor='who'>
                                    Whose issue is it?
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
                        </div>
                        <div className='edit-issue-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateIssue() ||
                                    this.validateWho()}>
                                Update Issue!
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
                                    Delete Issue
                            </button>
                        </div>
                </form>
            </div>
        );
    };
};

export default EditIssue;