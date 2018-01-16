import React, { Component } from 'react';

import TableProps from '../TableProps';
import { Button } from '../../../src/index';


export default class DocButton extends Component {

    render() {
        return (
            <div className="DocButton">
                {this.renderSample()}
                {this.renderProps()}
            </div>
        );
    }

    renderSample() {
        return (
            <div className="doc-button">
                <h2 className="page-subtitle">&lt;Button /&gt;</h2>

                <p><code>theme</code> prop</p>
                <div className="group">
                    <Button>
                        Button
                    </Button>
                    <Button theme="orange">
                        Button
                    </Button>
                    <Button theme="blue">
                        Button
                    </Button>
                    <Button theme="red">
                        Button
                    </Button>
                    <Button theme="green">
                        Button
                    </Button>
                    <Button theme="ember">
                        Button
                    </Button>
                    <Button disabled={true}>
                        Disabled
                    </Button>
                    <Button theme='orange' disabled={true}>
                        Disabled
                    </Button>
                </div>

                <p><code>size</code> prop</p>
                <div className="group">
                    <Button theme="ember" size="sm">
                        Button
                    </Button>
                    <Button theme="blue">
                        Button
                    </Button>
                    <Button theme="red" size="lg">
                        Button
                    </Button>
                </div>

                <p>Extend <code>className</code> with <code>btn-block</code> CSS class</p>
                <div className="group">
                    <Button theme="orange" className="btn-block">
                        Button
                    </Button>
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
                            desc    : 'Extra CSS classes passed to button.'
                        },
                        {
                            name    : 'rippleTheme',
                            type    : 'string',
                            default : 'light',
                            desc    : (<div>Ripple theme color.<br/>Value: <code>light</code>, <code>dark</code></div>)
                        },
                        {
                            name    : 'size',
                            type    : 'string',
                            default : 'md',
                            desc    : (<div>Button size.<br/>Value: <code>sm</code>, <code>md</code>, or <code>lg</code></div>)
                        },
                        {
                            name    : 'TagName',
                            type    : 'string',
                            default : 'button',
                            desc    : 'Button DOM tag name.'
                        },
                        {
                            name    : 'theme',
                            type    : 'string',
                            desc    : 'Button theme color.'
                        },
                        {
                            name    : '...others',
                            type    : '...',
                            desc    : 'All others button props, will automatically passed to component.'
                        }
                    ]}
                />
            </div>
        );
    }
}