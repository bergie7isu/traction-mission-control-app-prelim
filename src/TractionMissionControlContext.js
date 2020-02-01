import React from 'react';

const TractionMissionControlContext = React.createContext({
    todos: [],
    issues: [],
    team: [],
    addTodo: () => {},
    addIssue: () => {},
    editTodo: () => {},
    editIssue: () => {},
    deleteTodo: () => {},
    deleteIssue: () => {},
    todoStatus: () => {},
    issueStatus: () => {},
    closeMeeting: () => {}
  });
  
  export default TractionMissionControlContext;