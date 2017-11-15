import React, { Component } from 'react';

import TableProps from '../TableProps';
import { FloatButton } from '../../../src/index';


export default class DocFloatButton extends Component {

    render() {
        return (
            <div className="DocFloatButton">
                {this.renderSample()}
                {this.renderProps()}
            </div>
        );
    }

    renderSample() {
        return (
            <div className="doc-button">
                <h2 className="page-subtitle">&lt;FloatButton /&gt;</h2>

                <p><code>theme</code> prop</p>
                <div className="group">
                    <FloatButton>
                        <i className="fa fa-cogs"></i>
                    </FloatButton>
                    <FloatButton theme="orange">
                        <i className="fa fa-home"></i>
                    </FloatButton>
                    <FloatButton theme="blue">
                        <i className="fa fa-map-marker"></i>
                    </FloatButton>
                    <FloatButton theme="red">
                        <i className="fa fa-trash-o"></i>
                    </FloatButton>
                    <FloatButton theme="green">
                        <i className="fa fa-pencil"></i>
                    </FloatButton>
                    <FloatButton theme="ember">
                        <i className="fa fa-users"></i>
                    </FloatButton>
                    <FloatButton disabled={true}>
                        <i className="fa fa-ban"></i>
                    </FloatButton>
                </div>

                <p><code>size</code> prop</p>
                <div className="group">
                    <FloatButton theme="ember" size="sm">
                        <i className="fa fa-home"></i>
                    </FloatButton>
                    <FloatButton theme="blue">
                        <i className="fa fa-phone"></i>
                    </FloatButton>
                    <FloatButton theme="red" size="lg">
                        <i className="fa fa-envelope-o"></i>
                    </FloatButton>
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