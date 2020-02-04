import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import FilteredTodos from '../FilteredTodos/FilteredTodos';
import FilteredIssues from '../FilteredIssues/FilteredIssues';


class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'Todos'
    };
  };

  updateSelected(selected) {
    this.setState({
      selectedItem: selected
    });
  };

  displayFilter() {
    if (this.state.selectedItem === 'Todos') {
      return <FilteredTodos />
    } else if (this.state.selectedItem === 'Issues') {
      return <FilteredIssues />
    }
  };

  render() {
    return (
      <div className='archive'>
        <Nav />
        <h1 className='route-heading'>Archive</h1>
        <label htmlFor='select'>
          What do you want to filter?
        </label>
        <select
          className='filter-select'
          type='string'
          name='select'
          id='select'
          value={this.state.selectedItem}
          onChange={e => this.updateSelected(e.target.value)}>
            <option>Todos</option>
            <option>Issues</option>
        </select>
        {this.displayFilter()}
      </div>
    );
  };
};

export default Archive;