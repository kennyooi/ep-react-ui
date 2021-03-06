/**
 * Modal component
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { addClass, removeClass } from '../../helpers/styler';

import './Modal.less';


export default class Modal extends PureComponent {

    static propTypes = {
        isShow          : PropTypes.bool,   // visibility of modal
        closeDelay      : PropTypes.number, // animation time
        onRequestClose  : PropTypes.func,   // trigger modal close
        bodyClassName   : PropTypes.string, // append body className
        name            : PropTypes.string, // modal className
        onOpen          : PropTypes.func,   // trigger when modal opened
        onClose         : PropTypes.func    // trigger when modal closed
    };

    static defaultProps = {
        name            : 'Modal',          // advanced props - Created Modal className
        bodyClassName   : 'modal__opened',  // advanced props - appended className to body
        isShow          : false,
        closeDelay      : 350,
        onRequestClose  : () => {}
    };

    constructor(props) {
        super(props);

        this.__timer = null;

        this.state = {
            isModalOpen : false,
            isFaded     : false
        };
    }

    componentDidMount() {
        this.__root = document.body;
    }

    componentWillUnmount() {
        // clear all
        clearTimeout(this.__timer);
        removeClass(this.__root, this.props.bodyClassName);
    }

    componentWillReceiveProps(nextProps) {
        const { isModalOpen } = this.state;

        if (nextProps.isShow && !isModalOpen) {
            this.modalOpened();
        }
        else if (!nextProps.isShow && isModalOpen) {
            this.modalClosed();
        }
    }

    render() {
        if (!this.state.isModalOpen) {
            return null;
        }

        return createPortal(this.renderModal(), this.__root);
    }

    renderModal() {
        /* eslint-disable no-unused-vars */
        const { children, className, onRequestClose, name, isShow, closeDelay, onOpen, onClose, bodyClassName, ...other } = this.props;
        const { isFaded } = this.state;

        return (
            <div
                ref={el => this.__el = el}
                className={classNames(name, {
                    'is__open': isFaded
                })}
            >
                <div
                    className='Modal-overlay'
                    onClick={onRequestClose}
                ></div>
                <div className='Modal-inner'>
                    <div className='Modal-wrapper'>
                        <div
                            {...other}
                            ref={el => this.__contentEl = el}
                            className={classNames('Modal-content', className)}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    modalOpened() {
        this.setState({ isModalOpen: true });

        // update body className
        addClass(this.__root, this.props.bodyClassName);

        this.__timer = setTimeout(() => {

            this.setState({ isFaded: true });

            if (this.props.onOpen) {
                this.props.onOpen();
            }
        }, 100);
    }

    modalClosed() {
        this.setState({ isFaded: false });

        // update body className
        removeClass(this.__root, this.props.bodyClassName);

        this.__timer = setTimeout(() => {
            this.setState({ isModalOpen: false });

            if (this.props.onClose) {
                this.props.onClose();
            }
        }, this.props.closeDelay);
    }
}