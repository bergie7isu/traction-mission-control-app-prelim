import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Splash from './Splash/Splash';
import L10Meeting from './L10Meeting/L10Meeting';

class App extends Component {
  renderRoutes() {
    return(
      <>
        <Route
          exact
          path='/'
          component={Splash}
        />
        <Route
          exact
          path='/L10Meeting'
          component={L10Meeting}
        />
      </>
    )
  };

  render() {
    return (
      <main className='App'>
          {this.renderRoutes()}
      </main>
    );
  };
};

export default App;