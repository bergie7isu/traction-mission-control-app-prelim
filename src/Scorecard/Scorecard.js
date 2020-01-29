import React, { Component } from 'react';
import Nav from '../Nav/Nav';

class Scorecard extends Component {
  render() {
    return (
      <div className='scorecard'>
        <Nav />
        <h1 className='route-heading'>Scorecard</h1>
      </div>
    );
  };
};

export default Scorecard;