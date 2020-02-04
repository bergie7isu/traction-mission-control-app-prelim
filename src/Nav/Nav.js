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
        {//<div className='nav-link'>
        //    <Link to='/Scorecard'>Scorecard</Link>
        //</div>
        //<div className='nav-link'>
        //    <Link to='/Rocks'>Rocks</Link>
        //</div>
        //<div className='nav-link'>
        //    <Link to='/AccountabilityChart'>Accountability Chart</Link>
        //</div>
        //<div className='nav-link'>
        //    <Link to='/VTO'>V/TO</Link>
        //</div>
        //<div className='nav-link'>
        //    <Link to='/Team'>Team</Link>
        //</div>
    }
        <div className='nav-link'>
            <Link to='/Archive'>Archive</Link>
        </div>
        {//<div className='nav-link'>
        //    <Link to='/L10Rating'>L-10 Rating</Link>
        //</div>
        //<div className='nav-link'>
        //    <Link to='/TeamNotes'>Team Notes</Link>
        //</div>
    }
        <div className='nav-link'>
            <Link to='/'>Splash</Link>
        </div>
      </nav>
    );
  };
};

export default Nav;