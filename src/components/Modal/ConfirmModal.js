/**
 * Confirmation Modal, using Modal
 */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import FlatButton from '../Button/FlatButton';

import './ConfirmModal.less';


export default class ConfirmModal extends PureComponent {

	static propTypes = {
		isShow 		: PropTypes.bool, 		// Modal show status
		isSecure 	: PropTypes.bool, 		// enable double confirm 
		textCancel 	: PropTypes.string, 	// cancel button text
		textConfirm : PropTypes.string, 	// confirm button text
		onConfirm 	: PropTypes.func, 		// triggered when confirmed
		onRequestClose 	: PropTypes.func, 		// triggered when canceled
	};

	static defaultProps = {
		isShow 		: false,
		textConfirm : 'Confirm',
		textCancel 	: 'Cancel',
		textDelete 	: 'DELETE',
	};

	constructor(props) {
		super(props);

		this.state = {
			input 	: '',
			isError : false
		};

		this._onChange = this._onChange.bind(this);
		this._onConfirm = this._onConfirm.bind(this);
	}

	render() {
		const { className, isSecure, textCancel, textConfirm, textDelete, onConfirm, onRequestClose, ...others } = this.props;

		return (
			<Modal 
				{...others}
				style={{
					width: '350px'
				}}
				className={classNames("ConfirmModal", className)}
				onRequestClose={onRequestClose}
			>	
				{this.renderModalContent()}
			</Modal>
		)
	}

	renderModalContent() {
		const { children, isShow, onRequestClose, textCancel, textConfirm } = this.props;

		if (!isShow) {
			return null;
		}

		return (
			<div className="ConfirmModal-content">
				<div className="Modal-body">
					{children}

					{this.renderSecureInput()}
				</div>
				<div className="Modal-footer">
					<FlatButton 
						theme="default"
						onClick={onRequestClose}
					>
						{textCancel}
					</FlatButton>
					<FlatButton 
						theme="red"
						onClick={this._onConfirm}
					>
						{textConfirm}
					</FlatButton>
				</div>
			</div>
		)
	}

	renderSecureInput() {
		const { isSecure, textDelete } = this.props;
		const { input, isError } = this.state;

		if (!isSecure) {
			return;
		}

		return (
			<div className="form-group">
				<input 
					type="text"
					className={classNames("input input-secure", {
						'input__error' : isError
					})}
					placeholder={`Enter '${textDelete}'`}
					value={input}
					autoFocus={true}
					onChange={this._onChange}
				/>
				<div className="input-tips">Enter '{textDelete}' to continue.</div>
			</div>
		)
	}

	_onChange(e) {
		this.setState({
			isError : false,
			input 	: e.target.value
		});
	}

	_onConfirm() {
		if (this.props.isSecure && 
				this.state.input !== this.props.textDelete) {
			this.setState({
				isError : true
			});

			return;
		}

		this.setState({
			input 	: ''
		});

		if (this.props.onConfirm) {
			this.props.onConfirm();
		}
	}
} 