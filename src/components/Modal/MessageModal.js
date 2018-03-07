/**
 * Message Modal (using Modal)
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from './Modal';

import './MessageModal.less';


const Content = ({ children, type, icon }) => (
    <div className='MessageModal-content'>
        <div className={classNames('Modal-cover', {
            [`__${type}`] : type
        })}>
            {icon &&
                <i className={classNames('Modal-cover-icon', icon)}></i>
            }
        </div>
        <div className='Modal-body'>
            {children}
        </div>
    </div>
);

Content.propTypes = {
    type    : PropTypes.string,
    icon    : PropTypes.string
};

export default class MessageModal extends Component {

    static propTypes = {
        isShow      : PropTypes.bool,       // Modal show status
        type        : PropTypes.string,     // Modal type, 'success', 'error', 'info'
        icon        : PropTypes.string,     // Modal header icon
        disableClose : PropTypes.bool,      // disable close
        onClose     : PropTypes.func        // triggered when modal closed
    };

    static defaultProps = {
        isShow      : false,
        type        : 'success',
        disableClose : false
    };

    constructor(props) {
        super(props);

        this._onClose = this._onClose.bind(this);
    }

    render() {
        /* eslint-disable no-unused-vars */
        const { children, className, type, icon, onClose, disableClose, ...others } = this.props;

        return (
            <Modal
                {...others}
                style={{
                    width: '350px'
                }}
                className={classNames('MessageModal', className)}
                onRequestClose={this._onClose}
            >
                <Content
                    type={type}
                    icon={icon}
                >
                    {children}
                </Content>
            </Modal>
        );
    }

    _onClose() {
        if (!this.props.disableClose &&
            this.props.onClose) {
            this.props.onClose();
        }
    }
}