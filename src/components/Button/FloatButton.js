/**
 * Float Button (using ButtonCore)
 */
import { Component } from 'react';
import ButtonCore from './ButtonCore';

import styleCore from './style.less';
import style from './FloatButton.less';


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