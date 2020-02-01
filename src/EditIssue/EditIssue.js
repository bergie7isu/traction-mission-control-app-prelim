import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import ValidationError from '../ValidationError/ValidationError';
import moment from 'moment';

class EditIssue extends Component {
    static contextType = TractionMissionControlContext;

    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: "",
                touched: false
            },
            issue: {
                value: "",
                touched: false
            },
            who: {
                value: "",
                touched: false
            },
            created: {
                value: "",
                touched: false
            },
            status: {
                value: "",
                touched: false
            },
            reviewed: {
                value: "",
                touched: false
            }
        };
    };

    componentDidMount() {
        const clickedIssue = this.context.issues.filter(issue => issue.id === this.props.match.params.id);
        this.setState({
            id: {
                value: clickedIssue[0].id,
                touched: false
            },
            issue: {
                value: clickedIssue[0].issue,
                touched: false
            },
            who: {
                value: clickedIssue[0].who,
                touched: false
            },
            created: {
                value: clickedIssue[0].created,
                touched: false
            },
            status: {
                value: clickedIssue[0].status,
                touched: false
            },
            reviewed: {
                value: clickedIssue[0].reviewed,
                touched: false
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const updatedIssue = {
            id: this.props.match.params.id,
            issue: event.target['issue'].value,
            who: event.target['who'].value,
            created: moment(this.state.created.value).format('YYYY-MM-DD'),
            status: this.state.status.value,
            reviewed: this.state.reviewed.value
        };
        this.context.editIssue(updatedIssue);
        this.props.history.goBack()
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
                                onClick={() => {
                                    this.context.deleteIssue(this.props.match.params.id);
                                    this.props.history.goBack();
                                }}>
                                    Delete Issue
                            </button>
                        </div>
                </form>
            </div>
        );
    };
};

export default EditIssue;