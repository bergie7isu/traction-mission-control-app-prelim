import React, { Component } from 'react';
import './Agenda.css';

class Agenda extends Component {
    render() {
        return (
            <div className='agenda'>
                <h2>Agenda</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Topic</th>
                            <th>Guidelines</th>
                            <th>Duration</th>
                        </tr>
                        <tr>
                            <td>Segue</td>
                            <td>Personal Best/Business Best</td>
                            <td>5 minutes</td>
                        </tr>
                        <tr>
                            <td>Scorecard</td>
                            <td>No Discussion</td>
                            <td>5 minutes</td>
                        </tr>
                        <tr>
                            <td>Rocks</td>
                            <td>"On-track" or "Off-track"</td>
                            <td>5 minutes</td>
                        </tr>
                        <tr>
                            <td>Headlines</td>
                            <td>Customer/Vendor/Employee</td>
                            <td>5 minutes</td>
                        </tr>
                        <tr>
                            <td>Todo List</td>
                            <td>"Done" or "Not Done"</td>
                            <td>5 minutes</td>
                        </tr>
                        <tr>
                            <td>IDS</td>
                            <td>Identify, Discuss, Solve</td>
                            <td>60 minutes</td>
                        </tr>
                        <tr>
                            <td>Conclude</td>
                            <td>Recap Todo List, Cascading Messages, Rating</td>
                            <td>5 minutes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
};

export default Agenda;