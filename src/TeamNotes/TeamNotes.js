import React, { Component } from 'react';
import Nav from '../Nav/Nav';

class TeamNotes extends Component {
  render() {
    return (
      <div className='team-notes'>
        <Nav />
        <h1 className='route-heading'>Team Notes</h1>
      </div>
    );
  };
};

export default TeamNotes;