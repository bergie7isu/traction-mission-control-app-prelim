import React from 'react';

const TractionMissionControlContext = React.createContext({
    todos: [],
    issues: [],
    team: [],
    addTodo: () => {},
    addIssue: () => {},
    deleteTodo: () => {},
    deleteIssue: () => {},
  });
  
  export default TractionMissionControlContext;