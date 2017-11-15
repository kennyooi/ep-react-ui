import React, { Component } from 'react';

import TableProps from '../TableProps';
import { GhostButton } from '../../../src/index';


export default class DocGhostButton extends Component {

    render() {
        return (
            <div className="DocGhostButton">
                {this.renderSample()}
                {this.renderProps()}
            </div>
        );
    }

    renderSample() {
        return (
            <div className="doc-button">
                <h2 className="page-subtitle">&lt;GhostButton /&gt;</h2>

                <p><code>theme</code> prop</p>
                <div className="group" style={{background: '#333', padding: '10px'}}>
                    <GhostButton>
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="white">
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="orange">
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="blue">
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="red">
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="green">
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="ember">
                        GhostButton
                    </GhostButton>
                    <GhostButton disabled={true}>
                        Disabled
                    </GhostButton>
                </div>

                <p><code>size</code> prop</p>
                <div className="group" style={{background: '#333', padding: '10px'}}>
                    <GhostButton theme="ember" size="sm">
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="blue">
                        GhostButton
                    </GhostButton>
                    <GhostButton theme="red" size="lg">
                        GhostButton
                    </GhostButton>
                </div>

                <p>Extend <code>className</code> with <code>btn-block</code> CSS class</p>
                <div className="group" style={{background: '#333', padding: '10px'}}>
                    <GhostButton theme="orange" className="btn-block">
                        GhostButton
                    </GhostButton>
                </div>
            </div>
        );
    }

    renderProps() {
        return (
            <div className="group">
                <TableProps
                    dataset={[
                        {
                            name    : (<i>inherited</i>),
                            type    : '...',
                            desc    : (<div>Same as <code>Button</code>.</div>)
                        }
                    ]}
                />
            </div>
        );
    }
}