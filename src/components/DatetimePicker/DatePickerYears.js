import './DatePickerYears.less';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { times } from 'lodash';
import { shallowEqual } from '../../../helpers/compare';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const YEARS_GAP = 5;

export default class DatePickerYears extends Component {

	static propTypes = {
		value 		: PropTypes.string, 	// input value, moment default format
		min 		: PropTypes.string, 	// min date value, moment default format
		max 		: PropTypes.string, 	// max date value, moment default format
		format 		: PropTypes.string, 	// moment format
		onChange 	: PropTypes.func, 		// when calendar date changed
	};

	static defaultProps = {
		value 		: '',
	};

	constructor(props) {
		super();

		// internal variables
		this.isTransition = false;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowEqual(this.props, nextProps);
  	}

  	componentDidMount() {
  		const { value, format } = this.props;

  		const selectedEl = document.getElementById( moment(value, format).format('YYYY') );
  		this.refs.el.scrollTop = selectedEl.offsetTop - (this.refs.el.clientHeight - selectedEl.clientHeight)/2;
  	}

  	componentDidUpdate() {
  		const { value, format } = this.props;

  		const selectedEl = document.getElementById( moment(value, format).format('YYYY') );
  		this.refs.el.scrollTop = selectedEl.offsetTop - (this.refs.el.clientHeight - selectedEl.clientHeight)/2;
  	}

	render() {
		const { value, format, min, max } = this.props;

		const currentYear = parseInt(moment().format('YYYY'));
		const selectYear = parseInt(moment(value, format).format('YYYY'));
		
		let startYear = currentYear - YEARS_GAP;
		const childs = [];
		while((currentYear + YEARS_GAP) >= startYear) {
			childs.push( this.renderItem(startYear, startYear === selectYear) );
			startYear++;
		}
		
		return (
			<div className="DatePickerYears" ref="el">
				{childs}
			</div>
		)
	}

	renderItem(year, isCurrent) {
		const { min, max, format } = this.props;

		let disabled = false;
		
		if (min) {
			disabled = (parseInt(moment(min, format).format('YYYY')) > year);
		}
		if (!disabled && max) {
			disabled = (parseInt(moment(max, format).format('YYYY')) < year);
		}

		const classes = classNames('DatePickerYears-item', {
			'is__selected' 	: isCurrent,
			'is__disabled' 	: disabled,
		});

		if (disabled) {
			return (
				<span 
					key={year}
					id={year}
					className={classes} 
				>
					{year}
				</span>
			)
		}
		else {
			return (
				<a 
					key={year}
					id={year}
					href="#" 
					className={classes}
					onClick={this._onSelect.bind(this, year)}
				>
					{year}
				</a>
			)
		}
	}

	_onSelect(year, e) {
		e.preventDefault();

		// prevent fast click
		if (this.isTransition) {
			return;
		}
		this.isTransition = true;
		this.timerTransition = setTimeout(() => {
			this.isTransition = false;
		}, 400);
		
		const { value, min, max, format } = this.props;

		let momentObj = moment(value, format).year( year );

		// Check min & max date allowed
		if (min && momentObj.isBefore(min, format)) {
			momentObj = moment(min, format);
		}
		if (max && momentObj.isAfter(max, format)) {
			momentObj = moment(max, format);
		}

		if (this.props.onChange) {
			this.props.onChange(momentObj.format(format));
		}
	}

} 