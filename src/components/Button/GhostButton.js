/**
 * Ghost Button (using ButtonCore)
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCore from './ButtonCore';

import './style.less';
import './GhostButton.less';


export default class GhostButton extends Component {

	static defaultProps = {
		className 	: '',
	};

	render() {
		const { children, className, ...others } = this.props;

		return (
			<ButtonCore 
				{...others}
				className={classNames('btn-ghost', className)}
			>
				{children}
			</ButtonCore>
		)
	}
} 