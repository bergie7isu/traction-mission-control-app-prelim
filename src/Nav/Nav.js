import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <div className='nav-link'>
            <Link to='/L10Meeting'>L-10 Meeting</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>Scorecard</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>Rocks</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>Accountability Chart</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>V/TO</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>Team</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>Filter</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>L-10 Rating</Link>
        </div>
        <div className='nav-link'>
            <Link to='/Agenda'>Team Notes</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>Splash</Link>
        </div>
      </nav>
    );
  };
};

export default Nav;