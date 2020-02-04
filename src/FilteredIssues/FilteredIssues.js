import React, { Component } from 'react';
import TractionMissionControlContext from '../TractionMissionControlContext';
import Issue from '../Issue/Issue';
import moment from 'moment';

class FilteredIssues extends Component {
  static contextType = TractionMissionControlContext;

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      who: 'All',
      date_start: '',
      date_end: '',
      status: 'All',
    };
  };

  filterText(text) {
    this.setState({
      text: text
    });
  };

  filterWho(who) {
    this.setState({
      who: who
    });
  };

  filterStartDate(date) {
    this.setState({
      date_start: date
    });
  };

  filterEndDate(date) {
    this.setState({
      date_end: date
    });
  };

  filterStatus(status) {
    this.setState({
      status: status
    });
  };

  issueFilterText() {
    const { issues } = this.context;
    if (this.state.text === '') {
      return issues
    } else {
      return issues.filter(issue => issue.issue.toLowerCase().includes(this.state.text.toLowerCase()))
    }
  };

  issueFilterWho(issues) {
    if (this.state.who === 'All') {
      return issues
    } else {
      return issues.filter(issue => issue.who === this.state.who)
    }
  };

  issueFilterStartDate(issues) {
    if (this.state.date_start === '') {
      return issues
    } else {
      return issues.filter(issue => moment(issue.created).isSameOrAfter(moment(this.state.date_start)))
    }
  };

  issueFilterEndDate(issues) {
    if (this.state.date_end === '') {
      return issues
    } else {
      return issues.filter(issue => moment(issue.created).isSameOrBefore(moment(this.state.date_end)))
    }
  };

  issueFilterStatus(issues) {
    if (this.state.status === 'All') {
      return issues
    } else {
      return issues.filter(issue => issue.status === this.state.status)
    }
  };

  noIssues(filteredIssues) {
    if (filteredIssues.length === 0) {
      return <h3>No issues match your filter!</h3>
    }
  };

  render() {
    const { team } = this.context;
    const filteredIssues = this.issueFilterStatus(this.issueFilterEndDate(this.issueFilterStartDate(this.issueFilterWho(this.issueFilterText()))));
    return (
      <div className='filtered-issues'>
        <div className='filter-issue-text'>
          <label htmlFor='text'>
            Issue text:
          </label>
          <textarea
            name='text'
            id='text'
            value={this.state.text}
            onChange={e => this.filterText(e.target.value)}>
          </textarea>
        </div>
        <div className='filter-issue-who'>
          <label htmlFor='who'>
            Who:
          </label>
          <select
            type='string'
            name='who'
            id='who'
            value={this.state.who}
            onChange={e => this.filterWho(e.target.value)}>
              <option>All</option>
              {team.map(name =>
                <option
                  key={name}>
                    {name}
                </option>
              )}
          </select>
        </div>
        <div className='filter-issue-start-date'>
          <label htmlFor='start-date'>
            Start date:
          </label>
          <input
            type='date'
            name='start-date'
            id='start-date'
            value={this.state.date_start}
            onChange={e => this.filterStartDate(e.target.value)}
          />
        </div>
        <div className='filter-issue-end-date'>
          <label htmlFor='end-date'>
            End date:
          </label>
          <input
            type='date'
            name='end-date'
            id='end-date'
            value={this.state.date_end}
            onChange={e => this.filterEndDate(e.target.value)}
          />
        </div>
        <div className='filter-issue-status'>
        <label htmlFor='status'>
            Status:
          </label>
          <select
            type='string'
            name='status'
            id='status'
            value={this.state.status}
            onChange={e => this.filterStatus(e.target.value)}>
              <option>All</option>
              <option>Solved</option>
              <option>Killed</option>
              <option>Combined</option>
          </select>
        </div>
        <div className='filted-issues'>
          {filteredIssues.map(issue => 
            (issue.reviewed === "yes")
              ? <Issue
                key={issue.id}
                id={issue.id}
                issue={issue.issue}
                who={issue.who}
                created={issue.created}
                status={issue.status}
                reviewed={issue.reviewed}
                buttons='hidden'
              />
              : null
          )}
          {this.noIssues(filteredIssues)}
        </div>
      </div>
    );
  };
};

export default FilteredIssues;