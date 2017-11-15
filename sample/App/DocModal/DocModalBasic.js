import React, { Component } from 'react';
import TableProps from '../TableProps';
import { Button, FlatButton, Modal } from '../../../src/index';


export default class DocModal extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="DocModal">
                {this.renderSample()}
                {this.renderProps()}

                {this.generateModal('modal1', {
                    onRequestClose: () => this.setState({ modal1: false })
                })}

                {this.generateModal('modal2a', {
                    className: '__is-scrollable',
                    onRequestClose: () => this.setState({ modal2a: false })
                })}

                {this.generateModal('modal2b', {
                    className: '__sm',
                    onRequestClose: () => this.setState({ modal2b: false })
                })}

                {this.generateModal('modal2c', {
                    className: '__lg',
                    onRequestClose: () => this.setState({ modal2c: false })
                })}

                {this.generateModal('modal3', {
                    style: { width: '400px' },
                    bodyClassName: 'modal3__opened',
                    onOpen: () => alert('Modal is opened!'),
                    onClose: () => alert('Modal is closed!')
                })}
            </div>
        );
    }

    renderSample() {
        return (
            <div className="doc-modal">
                <h2 className="page-subtitle">&lt;Modal /&gt;</h2>

                <p>Default modal.</p>
                <div className="group">
                    <Button theme="orange" onClick={() => this.setState({ modal1: true })}>
                        Show Modal
                    </Button>
                </div>

                <p>Modal with different preset className: <code>__is-scrollable</code>, <code>__sm</code>, <code>_lg</code>.</p>
                <div className="group">
                    <div className="grid-12 grid-p-sm-15">
                        <div className="c-sm-4">
                            <Button theme="blue" onClick={() => this.setState({ modal2a: true })}>
                                Show Scrollable Modal
                            </Button>
                        </div>
                        <div className="c-sm-4">
                            <Button theme="green" onClick={() => this.setState({ modal2b: true })}>
                                Show SM Modal
                            </Button>
                        </div>
                        <div className="c-sm-4">
                            <Button theme="red" onClick={() => this.setState({ modal2c: true })}>
                                Show LG Modal
                            </Button>
                        </div>
                    </div>
                </div>

                <p>Modal combined multiple props.</p>
                <div className="group">
                    <Button theme="ember" onClick={() => this.setState({ modal3: true })}>
                        Show Modal
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
                            name    : 'bodyClassName',
                            type    : 'string',
                            default : 'modal__opened',
                            desc    : (<div>CSS class which will be appended to <code>body</code> when Modal is openend.</div>)
                        },
                        {
                            name    : 'className',
                            type    : 'string',
                            desc    : 'Extra CSS classes passed to Modal-content.'
                        },
                        {
                            name    : 'closeDelay',
                            type    : 'number',
                            default : '350',
                            desc    : 'Delay for Modal component to be removed from DOM when closed, used for CSS animation.'
                        },
                        {
                            name    : 'isShow',
                            type    : 'bool',
                            desc    : 'Modal visibility.'
                        },
                        {
                            name    : 'name',
                            type    : 'string',
                            default : 'Modal',
                            desc    : 'Modal className.'
                        },
                        {
                            name    : 'onClose',
                            type    : 'func',
                            default : '()',
                            desc    : 'Trigger when modal is closed.'
                        },
                        {
                            name    : 'onOpen',
                            type    : 'func',
                            default : '()',
                            desc    : 'Trigger when modal is opened.'
                        },
                        {
                            name    : 'onRequestClose',
                            type    : 'func',
                            default : '()',
                            desc    : 'Trigger modal close.'
                        }
                    ]}
                />
            </div>
        );
    }

    // helpers
    generateModal(modalId, props) {
        return (
            <Modal
                {...props}
                isShow={this.state[ modalId ]}
            >
                <div className="Modal-header">
                    <h5>Basic Modal Usage</h5>
                </div>
                <div className="Modal-body">
                    <p>Hi there...</p>
                    <p>This is sample of EP React Modal.</p>
                    <p>You could use these preset CSS classes to style your Modal.</p>
                    <p><code>Modal-header</code>: style modal header.</p>
                    <p><code>Modal-body</code>: style modal body (add padding).</p>
                    <p><code>Modal-footer</code>: style modal footer.</p>
                    <p>Append Modal <code>className</code> with <code>__sm</code>, or <code>__lg</code> for different sizes of Modal.</p>
                    <p>Append Modal <code>className</code> with <code>__is-scrollable</code> class will convert Modal to scrollable modal. Refer to Modal button 2.</p>
                    <p>Of course, you can ignore those styling and use own CSS classes to style Modal, or use overwrite method to overwrite certain styling.</p>
                    <p>Have fun coding! <i className="fa fa-smile-o"></i></p>
                </div>
                <div className="Modal-footer">
                    <FlatButton theme="grey" onClick={() => this.setState({ [modalId]: false })}>
                        Cancel
                    </FlatButton>
                    <FlatButton theme="green" onClick={() => this.setState({ [modalId]: false })}>
                        Got it!
                    </FlatButton>
                </div>
            </Modal>
        );
    }
}