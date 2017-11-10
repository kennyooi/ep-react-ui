/**
 * Message Modal (using Modal)
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import Modal from './Modal';
import IconButton from '../Button/IconButton';

import './MessageModal.less';


export default class MessageModal extends Component {

	static propTypes = {
		isShow 		: PropTypes.bool, 		// Modal show status
		type 		: PropTypes.string, 	// Modal type, 'success', 'error', 'info'
		icon 		: PropTypes.string, 	// Modal header icon
		disableClose : PropTypes.bool, 		// disable close
		onClose 	: PropTypes.func, 		// triggered when modal closed
	};

	static defaultProps = {
		isShow 		: false,
		type 		: 'success',
		disableClose : false
	};

	constructor(props) {
		super(props);

		this._onClose = this._onClose.bind(this);
	}

	render() {
		const { className, type, icon, onClose, disableClose, ...others } = this.props;

		return (
			<Modal 
				{...others}
				style={{
					width: '350px'
				}}
				className={classNames("MessageModal", className)}
				onRequestClose={this._onClose}
			>	
				{this.renderModalContent()}
			</Modal>
		)
	}

	renderModalContent() {
		const { children, isShow, type, icon } = this.props;

		if (!isShow) {
			return null;
		}

		return (
			<div className="MessageModal-content">
				<div className={classNames("Modal-cover", {
					[`__${type}`] : type
				})}>
					{icon &&
						<i className={classNames('Modal-cover-icon', icon)}></i>
					}
				</div>
				<div className="Modal-body">
					{children}
				</div>
			</div>
		)
	}

	_onClose() {
		if (!this.props.disableClose && 
			this.props.onClose) {
			this.props.onClose();
		}
	}
} 