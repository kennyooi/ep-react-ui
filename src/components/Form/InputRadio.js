/**
 * Normal radio input
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import CheckboxCore from './CheckboxCore';

import './style.less';
import './InputRadio.less';


export default class InputRadio extends Component {

	static propTypes = {
		theme 		: PropTypes.string, 	// radio theme color
		checked 	: PropTypes.bool, 		// radio checked status
		disabled 	: PropTypes.bool, 		// radio disabled
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
				type="radio"
				className={classNames("input-radio", className)}
			>
				{children}
			</CheckboxCore>
		)
	}
}