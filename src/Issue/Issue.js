import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Issue.css';
import moment from 'moment';
import TractionMissionControlContext from '../TractionMissionControlContext';
import config from '../config';

class Issue extends Component {
  static contextType = TractionMissionControlContext;

  handleStatus(status) {
    const issueId = this.props.id;
    const updatedIssue = {...this.props, status: status};
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
    })
    .catch(error => {
      console.error({ error });
    });
  };

  render() {
    let status;
    if (this.props.status !== null) {
      status = this.props.status.toLowerCase().replace(' ', '-');
    } else {
      status = '';
    }
    return (
      <div className={`issue ${status}`}>

        <section className='issue-content'>
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
        </section>

        <section className={`issue-buttons ${this.props.buttons}`}>
          <button
            className='issue-solved-button'
            onClick={() => this.handleStatus('Solved')}>
              Solved
          </button>
          <button
            className='issue-killed-button'
            onClick={() => this.handleStatus('Killed')}>
              Killed
          </button>
          <button 
            className='issue-combined-button'
            onClick={() => this.handleStatus('Combined')}>
              Combined
          </button>
          <Link to={`/EditIssue/${this.props.id}`}>
            <button
              className='issue-edit-button'>
                Edit
            </button>
          </Link>
        </section>

      </div>
    );
  };
};

export default Issue;