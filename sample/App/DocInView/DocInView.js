import React, { Component } from 'react';

import TableProps from '../TableProps';
import { InView } from '../../../src/index';


export default class DocInView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter1 : 0,
            counter2 : 0
        };
    }

    render() {
        return (
            <div className="DocInView">
                {this.renderSample()}
                {this.renderProps()}
            </div>
        );
    }

    renderSample() {
        const { counter1, counter2 } = this.state;

        return (
            <div className="doc-inview">
                <h2 className="page-subtitle">&lt;InView /&gt;</h2>

                <p>One time only</p>
                <div className="group">
                    <div style={{padding: '100px 0'}}>
                        <InView
                            uniqId="text_1"
                            onInView={() => this.setState({ counter1: this.state.counter1 + 1 })}
                        >
                            <h1>InView count: {counter1}</h1>
                        </InView>
                    </div>
                </div>

                <p>Disable <code>isOnce</code> flag.</p>
                <div className="group">
                    <div style={{padding: '100px 0'}}>
                        <InView
                            uniqId="text_2"
                            isOnce={false}
                            onInView={() => this.setState({ counter2: this.state.counter2 + 1 })}
                        >
                            <h1>InView count: {counter2}</h1>
                        </InView>
                    </div>
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
                            name    : 'className',
                            type    : 'string',
                            desc    : (<div>Extra CSS classes passed to wrapper. <br/><code>__inview</code> class will be added when element is in viewport.</div>)
                        },
                        {
                            name    : 'isOnce',
                            type    : 'bool',
                            default : 'true',
                            desc    : (<div>Trigger event once only. <br/>Enable this will disable trigger of event <code>onOutView</code>.</div>)
                        },
                        {
                            name    : 'onInView',
                            type    : 'func',
                            default : '()',
                            desc    : 'Trigger when element in viewport.'
                        },
                        {
                            name    : 'onOutView',
                            type    : 'func',
                            default : '()',
                            desc    : 'Trigger when element out of viewport.'
                        },
                        {
                            name    : 'uniqId',
                            type    : 'string',
                            desc    : 'Unique ID for inview to work.'
                        }
                    ]}
                />
            </div>
        );
    }
}