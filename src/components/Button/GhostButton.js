/**
 * Ghost Button (using ButtonCore)
 */
import { Component } from 'react';
import ButtonCore from './ButtonCore';

import styleCore from './style.less';
import style from './GhostButton.less';


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