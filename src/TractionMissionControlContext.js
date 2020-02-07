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
    deleteIssue: () => {}
  });
  
  export default TractionMissionControlContext;