import React, { Component } from 'react';
import TableProps from '../TableProps';
import { Loader } from '../../../src/index';


export default class DocLoaderBasic extends Component {

    render() {
        return (
            <div className="DocLoaderBasic">
                {this.renderSample()}
                {this.renderProps()}
            </div>
        );
    }

    renderSample() {
        return (
            <div className="doc-autocomplete">
                <h2 className="page-subtitle">&lt;Loader /&gt;</h2>

                <div className="group">
                    <Loader />
                </div>

                <div className="group">
                    <Loader
                        text="Loading text ..."
                    />
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
                            desc    : 'Extra className for loader.'
                        },
                        {
                            name    : 'text',
                            type    : 'string',
                            desc    : 'Loading text.'
                        }
                    ]}
                />
            </div>
        );
    }
}