/**
 * Normal Button (using ButtonCore)
 */
import { Component } from 'react';
import ButtonCore from './ButtonCore';

import styleCore from './style.less';
import style from './Button.less';


export default class Button extends Component {

	static defaultProps = {
		className 	: '',
		theme 		: 'default',
	};

	render() {
		const { children, className, theme, ...others } = this.props;

		return (
			<ButtonCore 
				{...others}
				className={classNames('btn', className)}
				theme={theme}
				rippleTheme={theme === "default" ? "default" : "light"}
			>
				{children}
			</ButtonCore>
		)
	}
} 