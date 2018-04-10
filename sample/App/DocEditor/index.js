import React, { Component } from 'react';

import DocEpEditor from './DocEpEditor';


export default class DocEditor extends Component {

    render() {
        return (
            <div className="page">
                <header className="page-title">
                    <div className="container">
                        <h1>Editor Components</h1>
                        <p>EP editor component.</p>
                    </div>
                </header>

                <div className="page-content">
                    <div className="container">
                        <DocEpEditor />

                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        );
    }
}