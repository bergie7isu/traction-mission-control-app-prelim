import React, { Component } from 'react';
import './Issue.css';
import moment from 'moment';

class Issue extends Component {
  render() {
    return (
      <div className='issue'>
        <section className='issue-status-buttons'>
          <button className='issue-solved-button'>Solved</button>
          <button className='issue-killed-button'>Killed</button>
          <button className='issue-combined-button'>Combined</button>
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
          <button>Edit</button>
        </section>
      </div>
    );
  };
};

export default Issue;