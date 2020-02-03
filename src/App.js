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
import EditIssue from './EditIssue/EditIssue';
import TractionMissionControlContext from './TractionMissionControlContext';
import data from './dummy-store';
import uuid from 'uuid';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      todos: [],
      issues: [],
      team: [],
      ready: false
    };
  };

  componentDidMount() {
    this.setState({
      todos: data.todos,
      issues: data.issues,
      team: data.team,
      ready: true
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

  handleEditTodo = updatedTodo => {
    const newTodos = this.state.todos.map(todo =>
      (todo.id === updatedTodo.id)
        ? updatedTodo
        : todo
      );
    this.setState({
      todos: newTodos
    });
  };

  handleEditIssue = updatedIssue => {
    const newIssues = this.state.issues.map(issue =>
      (issue.id === updatedIssue.id)
        ? updatedIssue
        : issue
      );
    this.setState({
      issues: newIssues
    });
  };

  handleDeleteTodo = todoId => {
    const newTodos = this.state.todos.filter(todo => todo.id !== todoId);
    this.setState({
      todos: newTodos
    });
  };

  handleDeleteIssue = issueId => {
    const newIssues = this.state.issues.filter(issue => issue.id !== issueId);
    this.setState({
      issues: newIssues
    });
  };

  handleTodoStatus = (todoId, status) => {
    const clickedTodo = this.state.todos.filter(todo => todo.id === todoId);
    const todoStatus = {...clickedTodo[0], status: status};
    const newTodos = this.state.todos.map(todo => (todo.id === todoStatus.id) ? todoStatus : todo);
    this.setState({
      todos: newTodos
    });
    if (status === "Not Done") {
      const newIssue = {
        id: uuid(),
        issue: `Todo not done: ${clickedTodo[0].todo}`,
        who: `${clickedTodo[0].who}`,
        created: moment(Date.now()).format('YYYY-MM-DD'),
        status: "",
        reviewed: "no"
      };
      this.setState({
        issues: [...this.state.issues, newIssue]
      });
    }
  };

  handleIssueStatus = (issueId, status) => {
    const clickedIssue = this.state.issues.filter(issue => issue.id === issueId);
    const issueStatus = {...clickedIssue[0], status: status};
    const newIssues = this.state.issues.map(issue => (issue.id === issueStatus.id) ? issueStatus : issue);
    this.setState({
      issues: newIssues
    });
  };

  handleCloseMeeting = () => {
    const newTodos = this.state.todos.map(todo => 
      (todo.status !== "" && todo.status !== "Hold")
        ? {...todo, reviewed: "yes"}
        : todo
    );
    const newIssues = this.state.issues.map(issue => 
      (issue.status !== "")
        ? {...issue, reviewed: "yes"}
        : issue
    );
    this.setState({
      todos: newTodos,
      issues: newIssues
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
        <Route
          exact
          path='/EditIssue/:id'
          component={EditIssue}
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
      addIssue: this.handleAddIssue,
      editTodo: this.handleEditTodo,
      editIssue: this.handleEditIssue,
      deleteTodo: this.handleDeleteTodo,
      deleteIssue: this.handleDeleteIssue,
      todoStatus: this.handleTodoStatus,
      issueStatus: this.handleIssueStatus,
      closeMeeting: this.handleCloseMeeting
    };
    if(!this.state.ready) {
      return null
    } else {
      return (
        <TractionMissionControlContext.Provider value={contextValue}>
          <main className='App'>
              {this.renderRoutes()}
          </main>  
        </TractionMissionControlContext.Provider>
      )
    };
  };
};

export default App;