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
            <Link to='/Archive'>Archive</Link>
        </div>
        <div className='nav-link'>
            <Link to='/'>Splash</Link>
        </div>
      </nav>
    );
  };
};

export default Nav;