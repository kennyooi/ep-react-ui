/**
 * Flat Button (using ButtonCore)
 */
import { Component } from 'react';
import ButtonCore from './ButtonCore';

import './style.less';
import './FlatButton.less';


export default class FlatButton extends Component {

	static defaultProps = {
		className 	: '',
	};

	render() {
		const { children, className, ...others } = this.props;

		return (
			<ButtonCore 
				{...others}
				className={classNames('btn-flat', className)}
				rippleTheme="default"
			>
				{children}
			</ButtonCore>
		)
	}
} 