import React, { Component } from 'react';
import DocButtonBasic from './DocButton';
import DocFlatButton from './DocFlatButton';
import DocGhostButton from './DocGhostButton';
import DocIconButton from './DocIconButton';
import DocFloatButton from './DocFloatButton';


export default class DocButton extends Component {

    render() {
        return (
            <div className="page">
                <header className="page-title">
                    <div className="container">
                        <h1>Button Components</h1>
                        <p>EP buttons set.</p>
                    </div>
                </header>

                <div className="page-content">
                    <div className="container">
                        <DocButtonBasic />
                        <hr className="seperator" />

                        <DocFlatButton />
                        <hr className="seperator" />

                        <DocGhostButton />
                        <hr className="seperator" />

                        <DocIconButton />
                        <hr className="seperator" />

                        <DocFloatButton />
                    </div>
                </div>
            </div>
        );
    }
}