/**
 * Float Button (using ButtonCore)
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCore from './ButtonCore';

import './style.less';
import './FloatButton.less';


export default class FloatButton extends Component {

	static defaultProps = {
		className 	: '',
		theme 		: 'default',
	};

	render() {
		const { children, className, theme, ...others } = this.props;

		return (
			<ButtonCore 
				{...others}
				className={classNames('btn-float', className)}
				theme={theme}
				rippleTheme={theme === "default" ? "default" : "light"}
			>
				{children}
			</ButtonCore>
		)
	}
} 