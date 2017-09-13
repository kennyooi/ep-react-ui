/**
 * Date picker input
 */

import './DatePicker.less';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { isEqual } from 'lodash';
import { shallowEqual } from '../../../helpers/compare';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class DatePickerHeader extends Component {

	static propTypes = {
		value 			: PropTypes.string, 	// current picker value
		type 			: PropTypes.string, 	// datepicker type
		format 			: PropTypes.string, 	// value format
		view 			: PropTypes.string, 	// active view: 'date'*, 'year'
		disableYear 	: PropTypes.bool, 		// disable year view
		disableTime 	: PropTypes.bool, 		// disable time view
	};

	constructor(props) {
		super(props);

		this.state = {
			isPrevious 	: false,
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowEqual(this.props, nextProps) ||
				shallowEqual(this.state, nextState);
  	}

  	componentWillReceiveProps(nextProps, nextState) {
  		if (!isEqual(nextProps.value, this.props.value)) {
  			this.setState({
	  			isPrevious 	: moment(nextProps.value, nextProps.format).isBefore(moment(this.props.value, this.props.format)),
	  		})
  		}
  	}

	render() {
		const { value, type, format, view } = this.props;
		const { isPrevious } = this.state;

		const momentObj = value ? moment(value, format) : moment();

		return (
			<div className="DatePickerHeader">
				<div 
					className={classNames("DatePickerHeader-year", {
						'is__active' 	: view === 'year',
						'is__hidden' 	: type === 'time'
					})}
					onClick={this._onChangeView.bind(this, 'year')}
				>
					<ReactCSSTransitionGroup
						transitionName={isPrevious ? "slideUp" : "slideDown"} 
						transitionEnterTimeout={350} 
						transitionLeaveTimeout={350}
					>
		          		<span key={momentObj.format('YYYY')}>{momentObj.format('YYYY')}</span>
		        	</ReactCSSTransitionGroup>
		        </div>

		        <div 
					className={classNames("DatePickerHeader-date", {
						'is__active' 	: view === 'date',
						'is__hidden' 	: type === 'time'
					})}
					onClick={this._onChangeView.bind(this, 'date')}
				>
		        	<ReactCSSTransitionGroup 
						transitionName={isPrevious ? "slideUp" : "slideDown"}
						transitionEnterTimeout={350} 
						transitionLeaveTimeout={350}
					>
		          		<span key={momentObj.format('YYYY-MM-DD')}>{momentObj.format('ddd, MMM D')}</span>
		        	</ReactCSSTransitionGroup>
		        </div>

		        <div 
		        	className={classNames("DatePickerHeader-time", {
		        		'is__active' 	: view === 'time',
		        		'is__hidden' 	: type === 'date',
		        		'is__large' 	: type === 'time'
		        	})}
		        	onClick={this._onChangeView.bind(this, 'time')}
		        >
		        	<span>{momentObj.format('h:mm')}<small>{momentObj.format('A')}</small></span>
		        </div>
			</div>
		)
	}

	_onChangeView(view) {
		const { disableYear } = this.props;

		if (disableYear) {
			return;
		}

		if (this.props.onChange) {
			this.props.onChange(view);
		}
	}
} 