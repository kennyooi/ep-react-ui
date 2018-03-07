/**
 * Confirmation Modal, using Modal
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from './Modal';
import FlatButton from '../Button/FlatButton';

import './ConfirmModal.less';

/* eslint-disable react/prop-types */
const SecureInput = ({ isError, textDelete, input, onChange }) => (
    <div className='form-group'>
        <input
            type='text'
            className={classNames('input input-secure', {
                'input__error' : isError
            })}
            placeholder={`Enter '${textDelete}'`}
            value={input}
            autoFocus={true}
            onChange={onChange}
        />
        <div className='input-tips'>Enter &quot;{textDelete}&quot; to continue.</div>
    </div>
);

const Content = ({ children, isSecure, ...others }) => (
    <div className='Modal-body'>
        {children}

        {isSecure &&
            <SecureInput {...others} />
        }
    </div>
);
/* eslint-enable react/prop-types */

export default class ConfirmModal extends PureComponent {

    static propTypes = {
        isShow      : PropTypes.bool,       // Modal show status
        isSecure    : PropTypes.bool,       // enable double confirm
        textCancel  : PropTypes.string,     // cancel button text
        textConfirm : PropTypes.string,     // confirm button text
        textDelete  : PropTypes.string,     // confirm delete text
        onConfirm   : PropTypes.func,       // triggered when confirmed
        onRequestClose  : PropTypes.func    // triggered when canceled
    };

    static defaultProps = {
        isShow      : false,
        textConfirm : 'Confirm',
        textCancel  : 'Cancel',
        textDelete  : 'DELETE'
    };

    constructor(props) {
        super(props);

        this.state = {
            input   : '',
            isError : false
        };

        this._onChange = this._onChange.bind(this);
        this._onConfirm = this._onConfirm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // reset input when modal is opened
        if (nextProps.isShow && !this.props.isShow) {
            this.setState({ input: '', isError: false });
        }
    }

    render() {
        /* eslint-disable no-unused-vars */
        const { children, className, isSecure, textCancel, textConfirm, textDelete, onConfirm, onRequestClose, ...others } = this.props;
        const { input, isError } = this.state;

        return (
            <Modal
                {...others}
                style={{
                    width: '350px'
                }}
                className={classNames('ConfirmModal', className)}
                onRequestClose={onRequestClose}
            >
                <div className='ConfirmModal-content'>
                    <Content
                        textDelete={textDelete}
                        isSecure={isSecure}
                        isError={isError}
                        input={input}
                        onChange={this._onChange}
                    >
                        {children}
                    </Content>

                    <div className='Modal-footer'>
                        <FlatButton
                            theme='default'
                            onClick={onRequestClose}
                        >
                            {textCancel}
                        </FlatButton>
                        <FlatButton
                            theme='red'
                            onClick={this._onConfirm}
                        >
                            <b>{textConfirm}</b>
                        </FlatButton>
                    </div>
                </div>
            </Modal>
        );
    }

    _onChange(e) {
        this.setState({
            isError : false,
            input   : e.target.value
        });
    }

    _onConfirm() {
        const { isSecure, textDelete } = this.props;
        const { input } = this.state;

        if (isSecure && input !== textDelete) {
            this.setState({
                isError : true
            });

            return;
        }

        this.setState({
            input   : ''
        });

        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }
}