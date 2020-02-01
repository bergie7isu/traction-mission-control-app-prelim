import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Issue from '../Issue/Issue';
import TractionMissionControlContext from '../TractionMissionControlContext';

class Issues extends Component {
    static contextType = TractionMissionControlContext;
    render() {
        const { issues } = this.context;
        return (
            <div className='issues'>
                <h2>Issues</h2>
                {issues.map(issue => 
                    (issue.reviewed === "no")
                        ? <Issue
                            key={issue.id}
                            id={issue.id}
                            issue={issue.issue}
                            who={issue.who}
                            created={issue.created}
                            status={issue.status}
                            reviewed={issue.reviewed}
                        />
                        : null
                )}
                <Link to={'/AddIssue'}>
                    <button
                        className='add-issue'>
                            Add Issue
                    </button>
                </Link>
            </div>
        );
    };
};

export default Issues;