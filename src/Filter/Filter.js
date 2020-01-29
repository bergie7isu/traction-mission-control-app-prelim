import React, { Component } from 'react';
import Nav from '../Nav/Nav';

class Filter extends Component {
  render() {
    return (
      <div className='filter'>
        <Nav />
        <h1 className='route-heading'>Filter</h1>
      </div>
    );
  };
};

export default Filter;