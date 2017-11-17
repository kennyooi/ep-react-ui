import React, { Component } from 'react';
import TableProps from '../TableProps';
import { Button, MessageModal } from '../../../src/index';


export default class DocMessageModal extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="DocMessageModal">
                {this.renderSample()}
                {this.renderProps()}

                {this.generateModal('modal1', {
                    type: 'info',
                    icon: 'fa fa-info'
                })}

                {this.generateModal('modal2', {
                    type: 'error',
                    icon: 'fa fa-times'
                })}

                {this.generateModal('modal3', {
                    type: 'success',
                    icon: 'fa fa-check',
                    disableClose: true
                })}
            </div>
        );
    }

    renderSample() {
        return (
            <div className="doc-modal">
                <h2 className="page-subtitle">&lt;MessageModal /&gt;</h2>

                <div className="group">
                    <div className="grid-12 grid-p-sm-15">
                        <div className="c-sm-4">
                            <Button theme="blue" onClick={() => this.setState({ modal1: true })}>
                                Info Message
                            </Button>
                        </div>
                        <div className="c-sm-4">
                            <Button theme="red" onClick={() => this.setState({ modal2: true })}>
                                Error Message
                            </Button>
                        </div>
                        <div className="c-sm-4">
                            <Button theme="green" onClick={() => this.setState({ modal3: true })}>
                                Success Message
                            </Button>
                        </div>
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
                            name    : (<i>inherited</i>),
                            type    : '...',
                            desc    : 'Support all props from Modal.'
                        },
                        {
                            name    : 'disableClose',
                            type    : 'bool',
                            default : 'false',
                            desc    : 'Disable Modal to be closed.'
                        },
                        {
                            name    : 'icon',
                            type    : 'string',
                            desc    : 'Message icon className.'
                        },
                        {
                            name    : 'type',
                            type    : 'string',
                            desc    : (<div>Message type.<br/>Value: <code>success</code>, <code>error</code>, & <code>info</code></div>)
                        }
                    ]}
                />
            </div>
        );
    }

    // helpers
    generateModal(modalId, props) {
        return (
            <MessageModal
                {...props}
                isShow={this.state[ modalId ]}
                onClose={() => this.setState({ [modalId]: false })}
            >
                <p>Modal message goes here...</p>
                {props.disableClose ? <p>Close is disabled, <a onClick={() => this.setState({ [modalId]: false })}>force close</a></p> : ''}
            </MessageModal>
        );
    }
}