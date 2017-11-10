/**
 * Modal component
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { render, unmountComponentAtNode } from 'react-dom';
import { map, assign } from 'lodash';
import { addClass, removeClass } from '../../helpers/styler';

import './Modal.less';


export default class Modal extends PureComponent {

	static propTypes = {
		isShow 			: PropTypes.bool, 	// visibility of modal
		closeDelay 		: PropTypes.number, // animation time
		onRequestClose 	: PropTypes.func, 	// trigger modal close
		onOpen 			: PropTypes.func, 	// trigger when modal opened
		onClose 		: PropTypes.func, 	// trigger when modal closed
	};

	static defaultProps = {
		name 			: 'Modal',  		// advanced props - Created Modal className
		bodyClassName 	: 'modal__opened', 	// advanced props - appended className to body
		isShow 			: false,
		closeDelay 		: 350,
		onRequestClose 	: () => {},
	};

	componentWillUnmount() {
		clearTimeout( this.__closeTimer );
		if (this.__el) {
			unmountComponentAtNode( this.__el );
			document.body.removeChild( this.__el );
			removeClass(document.body, this.props.bodyClassName);
			this.__el = null;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// Re-render modal
		if (this.__el && this.props.isShow) {
			this.renderModal( this.__el );
		}
		// New modal
		else if (!this.__el && this.props.isShow) {
			this.createModal();
		}
		// Close modal
		else if (this.__el && !this.props.isShow) {
			this.closeModal();
		}
		else {
			// Do nothing
		}
	}

	render() {
		// Render nothing
		return null;
	}


	// Internal methods
	renderModal(el) {
		const { children, className, onRequestClose, name, isShow, closeDelay, onOpen, onClose, bodyClassName, ...other } = this.props;

		render((
			<div className="Modal-inner">
				<div 
					className="Modal-overlay"
					onClick={onRequestClose}
				></div>
				<div 
					{...other}
					className={classNames("Modal-content", className)}
				>
					{children}
				</div>
			</div>
		), el);

		// Position modal layout
		const contentNode = this.__el.childNodes[0].childNodes[1];
		const y = (el.clientHeight - contentNode.clientHeight) / 2;
		const x = (el.clientWidth - contentNode.clientWidth) / 2;
		contentNode.style.top = `${Math.max(0, y)}px`;
		contentNode.style.left = `${Math.max(0, x)}px`;
	}

	// open modal
	createModal() {
		// Check isOpened
		if (this.__el) {
			return;
		}

		// Create new DOM
		this.__el = document.createElement('div');
		this.__el.id = this.props.name;
		this.__el.className = classNames(this.props.name);
		document.body.appendChild( this.__el );

		// Ammend body
		addClass(document.body, this.props.bodyClassName);

		// Render modal layout
		this.renderModal( this.__el );

		// @hack - refresh CSS cache
		window.getComputedStyle(this.__el).opacity;

		// Show modal
		addClass(this.__el, ['is__open']);

		if (this.props.onOpen) {
			this.props.onOpen();
		}
	}

	closeModal() {
		const { closeDelay } = this.props;

		// Check isclosed
		if (!this.__el) {
			return;
		}

		// Close modal
		removeClass(this.__el, 'is__open');

		this.__closeTimer = setTimeout(() => {
			if (this.__el) {
				unmountComponentAtNode( this.__el );
				document.body.removeChild( this.__el );
				removeClass(document.body, this.props.bodyClassName);
				this.__el = null;

				if (this.props.onClose) {
					this.props.onClose();
				}
			}
		}, closeDelay);
	}
} 