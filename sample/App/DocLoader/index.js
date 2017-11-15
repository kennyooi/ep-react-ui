import React, { Component } from 'react';
import DocLoaderBasic from './DocLoaderBasic';


export default class DocLoader extends Component {

    render() {
        return (
            <div className="page">
                <header className="page-title">
                    <div className="container">
                        <h1>Loader Component</h1>
                        <p>Loading spinner.</p>
                    </div>
                </header>

                <div className="page-content">
                    <div className="container">
                        <DocLoaderBasic />
                        <hr className="seperator" />
                    </div>
                </div>
            </div>
        );
    }
}