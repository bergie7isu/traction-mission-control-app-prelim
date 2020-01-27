import React, { Component } from 'react';
import data from '../dummy-store';
import Issue from '../Issue/Issue';

class Issues extends Component {
    render() {
        const issues = data.issues;
        return (
            <div className='issues'>
                <h2>Issues</h2>
                {issues.map(issue =>
                <Issue
                    key={issue.id}
                    id={issue.id}
                    issue={issue.issue}
                    who={issue.who}
                    created={issue.created}
                    status={issue.status}
                />
            )}
            </div>
        );
    };
};

export default Issues;