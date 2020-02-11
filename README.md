# Traction Mission Control
Drive accountability.
Get more done.
Grow your business!

## Live App:
https://traction-mission-control-app.now.sh/

## Summary:
The Traction Mission Control App is your go-to tool for driving accountability, follow-through, and consistent communication in your organization running on the EOS Platform.

#### To-dos:
Document action items in your L-10 Meetings and drive team accountability to complete tasks on-time, everytime. Link to-dos directly to the issues they solve, and track completion performance right in the app! When everyone gets their tasks done, the team wins!

#### Issues:
We've all got issues. Keeping track of them in your L-10 Meeting and solving them forever can be hard. Let Traction Mission Control help!

#### Archive Filtering:
Quickly view and filter archived to-dos and issues for yourself and your team. View historical performance data to drive accountability discussions.

## Screenshots:
![Screenshot of To-do List](/src/images/todos-screenshot.JPG?raw=true "To-do List")
![Screenshot of Issues List](/src/images/issues-screenshot.JPG?raw=true "Issues List")
![Screenshot of Archive](/src/images/archive-screenshot.JPG?raw=true "Archive Filtering")

## Technologies Used:
React, CSS, Node, Express, PostgreSQL

## API Documentation:

#### Todo Object Example
```javascript
{
    id: todo.id,
    todo: xss(todo.todo),
    who: todo.who,
    created: todo.created,
    due: todo.due,
    status: todo.status,
    status_date: todo.status_date,
    reviewed: todo.reviewed,
    issue: todo.issue
}
```

#### `/api/todos`

##### Methods:
`GET` - returns a list of all todos\
`POST` - adds a new todo

##### Required Parameters:
`GET` - none
`POST` - 

#### `/api/todos/:id`

##### Methods:
`GET` - returns a specific todo\
`DELETE` - removes a specific todo\
`PATCH` - updates a specific todo

#### `/api/issues`

##### Methods:
`GET` - returns a list of all issues\
`POST` - adds a new issue

#### `/api/issues/:id`

##### Methods:
`GET` - returns a specific issue\
`DELETE` - removes a specific issue\
`PATCH` - updates a specific issue












You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
