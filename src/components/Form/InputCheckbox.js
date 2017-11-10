/**
 * Normal checkbox input
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckboxCore from './CheckboxCore';

import './style.less';
import './InputCheckbox.less';


export default class InputCheckbox extends Component {

	static propTypes = {
		theme 		: PropTypes.string, 	// checkbox theme color
		checked 	: PropTypes.bool, 		// checkbox checked status
		disabled 	: PropTypes.bool, 		// checkbox disabled
		onChange 	: PropTypes.func, 		// onChange event
	};

	static defaultProps = {
		className 	: '',
		theme 		: 'default',
	};

	render() {
		const { children, className, ...others } = this.props;

		return (
			<CheckboxCore 
				{...others}
				type="checkbox"
				className={classNames("input-checkbox", className)}
			>
				{children}
			</CheckboxCore>
		)
	}
}