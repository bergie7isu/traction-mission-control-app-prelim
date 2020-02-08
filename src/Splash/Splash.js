import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Splash extends Component {
    render() {
        return (
            <div className='splash'>
                <header>
                    <h1>Traction Mission Control</h1>
                    <h2>Drive accountability. Get more done. Grow your business!</h2>
                    <p>The Traction Mission Control App is your goto tool for driving accountability, followthrough, and consistent communication in your organization running on the EOS Platform.</p>
                    <Link to='/L10Meeting'>
                        <button>Let's Do This!</button>
                    </Link>
                </header>
                <section>
                    <h2>To-dos</h2>
                    <p>Document action items in your L-10 Meetings and drive team accountability to complete tasks on-time, everytime. Link to-dos directly to the issues they solve, and track completion performance right in the app! When everyone gets their tasks done, the team wins!</p>
                </section>
                <section>
                    <h2>Issues</h2>
                    <p>We've all got issues. Keeping track of them in your L-10 Meeting and solving them forever can be hard. Let Traction Mission Control help!</p>
                </section>
                <section>
                    <h2>Archive Filtering</h2>
                    <p>Quickly view and filter archived to-dos and issues for yourself and your team. View historical performance data to drive accountability discussions.</p>
                </section>
                <footer>
                    <h2>Traction Mission Control</h2>
                    <Link to='/L10Meeting'>
                        <button>Go for Launch!</button>
                    </Link>
                </footer>
            </div>
        );
    };
};

export default Splash;