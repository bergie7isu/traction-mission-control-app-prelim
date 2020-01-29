import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Splash from './Splash/Splash';
import L10Meeting from './L10Meeting/L10Meeting';
import Scorecard from './Scorecard/Scorecard';
import Rocks from './Rocks/Rocks';
import AccountabilityChart from './AccountabilityChart/AccountabilityChart';
import VTO from './VTO/VTO';
import Team from './Team/Team';
import Filter from './Filter/Filter';
import L10Rating from './L10Rating/L10Rating';
import TeamNotes from './TeamNotes/TeamNotes';
import AddTodo from './AddTodo/AddTodo';
import AddIssue from './AddIssue/AddIssue';
import EditTodo from './EditTodo/EditTodo';
import TractionMissionControlContext from './TractionMissionControlContext';
import data from './dummy-store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      todos: [],
      issues: [],
      team: []
    };
  };

  componentDidMount() {
    this.setState({
      todos: data.todos,
      issues: data.issues,
      team: data.team
    });
  };

  handleAddTodo = newTodo => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  handleAddIssue = newIssue => {
    this.setState({
      issues: [...this.state.issues, newIssue]
    });
  };

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
        <Route
          exact
          path='/Scorecard'
          component={Scorecard}
        />
        <Route
          exact
          path='/Rocks'
          component={Rocks}
        />
        <Route
          exact
          path='/AccountabilityChart'
          component={AccountabilityChart}
        />
        <Route
          exact
          path='/VTO'
          component={VTO}
        />
        <Route
          exact
          path='/Team'
          component={Team}
        />
        <Route
          exact
          path='/Filter'
          component={Filter}
        />
        <Route
          exact
          path='/L10Rating'
          component={L10Rating}
        />
        <Route
          exact
          path='/TeamNotes'
          component={TeamNotes}
        />
        <Route
          exact
          path='/AddTodo'
          component={AddTodo}
        />
        <Route
          exact
          path='/AddIssue'
          component={AddIssue}
        />
        <Route
          exact
          path='/EditTodo/:id'
          component={EditTodo}
        />
      </>
    )
  };

  render() {
    const contextValue = {
      todos: this.state.todos,
      issues: this.state.issues,
      team: this.state.team,
      addTodo: this.handleAddTodo,
      addIssue: this.handleAddIssue
    };
    return (
      <TractionMissionControlContext.Provider value={contextValue}>
        <main className='App'>
            {this.renderRoutes()}
        </main>  
      </TractionMissionControlContext.Provider>
      
    );
  };
};

export default App;