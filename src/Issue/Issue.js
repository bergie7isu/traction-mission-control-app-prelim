import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Issue.css';
import moment from 'moment';
import TractionMissionControlContext from '../TractionMissionControlContext';

class Issue extends Component {
  static contextType = TractionMissionControlContext;

  render() {
    const issueId = this.props.id;
    return (
      <div className={`issue ${this.props.status.replace(" ", "-").toLowerCase()}`}>
        <section className='issue-status-buttons'>
          <button
            className='issue-solved-button'
            onClick={() => this.context.issueStatus(issueId, "Solved")}>
              Solved
          </button>
          <button
            className='issue-killed-button'
            onClick={() => this.context.issueStatus(issueId, "Killed")}>
              Killed
          </button>
          <button 
            className='issue-combined-button'
            onClick={() => this.context.issueStatus(issueId, "Combined")}>
              Combined
          </button>
        </section>
        <section className='issue-issue-wrapper'>
          <section className='issue-issue'>
            <h3>{this.props.issue}</h3>
          </section>
          <section className='issue-who'>
            <h4>{this.props.who}</h4>
          </section>
        </section>
        <section className='issue-dates'>
          <section className='issue-created'>
            <b>Created: </b>{moment(this.props.created).format('L')}
          </section>
        </section>
        <section className='issue-status'>
          <section><b>Status:</b></section>
          {this.props.status}
        </section>
        <section className='issue-edit'>
          <Link to={`/EditIssue/${this.props.id}`}>
            <button>Edit</button>
          </Link>
        </section>
      </div>
    );
  };
};

export default Issue;