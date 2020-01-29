import React, { Component } from 'react';
import Nav from '../Nav/Nav';

class Rocks extends Component {
  render() {
    return (
      <div className='rocks'>
        <Nav />
        <h1 className='route-heading'>Rocks</h1>
      </div>
    );
  };
};

export default Rocks;