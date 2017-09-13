/**
 * Date picker input (extend EnhancedButton)
 */

import './DatePickerCalendar.less';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { isEmpty, times, uniqueId } from 'lodash';
import { shallowEqual } from '../../../helpers/compare';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import IconButton from '../IconButton';


export default class DatePicker extends Component {

	static propTypes = {
		value 		: PropTypes.string, 	// input value, moment default format
		min 		: PropTypes.string, 	// min date value, moment default format
		max 		: PropTypes.string, 	// max date value, moment default format
		format 		: PropTypes.string, 	// moment format
		start_from 	: PropTypes.number, 	// calendar start from day 
		onChange 	: PropTypes.func, 		// when calendar date changed
	};

	static defaultProps = {
		value 		: '',
		start_from 	: 1,
	};

	constructor(props) {
		super(props);

		const defaultDate = !isEmpty(props.value) ? moment(props.value, props.format) : moment();

		this.state = {
			pickerDate 	: defaultDate.format(props.format),
			isPrevious 	: false, 	// flag to decide animations
		};

		// internal variables
		this.isTransition = false; 	// prevent fast click 
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowEqual(this.props, nextProps) ||
				shallowEqual(this.state, nextState);
  	}

  	componentWillUnmount() {
  		clearTimeout(this.timerTransition);
  	}

	render() {
		const { isPrevious } = this.state;

		return (
			<div className="DatePickerCalendar">
				<div className="DatePickerCalendar-header">
					<table className="table">
						<tbody>
							{this.renderActions()}
							{this.renderWeeksList()}
						</tbody>
					</table>
				</div>
				<ReactCSSTransitionGroup 
					className="DatePickerCalendar-body"
					transitionName={isPrevious ? "slideRight" : "slideLeft"} 
					transitionEnterTimeout={350} 
					transitionLeaveTimeout={350}
				>
	          		{this.renderDays()}
	        	</ReactCSSTransitionGroup>
			</div>
		)
	}

	renderActions() {
		const { pickerDate, isPrevious } = this.state;

		const momentObj = moment(pickerDate);

		return (
			<tr>
				<th className="nav-prev">
					<IconButton
						icon="fa fa-chevron-left"
						size="sm"
						onClick={this._onChange.bind(this, 'months', -1)}
					/>
				</th>
				<th className="nav-title" colSpan="5">
					<ReactCSSTransitionGroup
						transitionName={isPrevious ? "slideRight" : "slideLeft"} 
						transitionEnterTimeout={350} 
						transitionLeaveTimeout={350}
					>
						<div className="current-date" key={momentObj.format('YYYY_MM')}>{momentObj.format('MMMM YYYY')}</div>
					</ReactCSSTransitionGroup>
				</th>
				<th className="nav-prev">
					<IconButton
						icon="fa fa-chevron-right"
						size="btn-sm"
						onClick={this._onChange.bind(this, 'months', 1)}
					/>
				</th>
			</tr>
		)
	}

	renderWeeksList() {
		const { start_from } = this.props;
		return (
			<tr>
				{times(7, n => 
					<td className="week" key={n}>
						{moment((n + start_from) % 7, 'd').format('dd')}
					</td>
				)}
			</tr>
		)
	}

	renderDays() {
		const { start_from } = this.props;
		const { pickerDate } = this.state;

		const momentObj = moment(pickerDate);
		const dayCounter = moment(pickerDate).startOf('month');

		const weeks = [];
		// 1 month maximum have 6 weeks
		times(6, week => {
			// 1 week have 7 days
			const days = times(7, i => this.renderDay(momentObj, dayCounter, (i + start_from) % 7));

			weeks.push((
				<tr key={week}>
					{days}
				</tr>
			));
		});

		return (
			<div className="DatePickerCalendar-days" key={momentObj.format('YYYY_MM')}>
				<table className="table">
					<tbody>
						{weeks}
					</tbody>
				</table>
			</div>
		)
	}

	renderDay(pickerDate, dayCounter, dayOfWeek) {
		// variables
		let content = (<span>&nbsp;</span>);
		let contentKey = "";
		let classes = ['empty'];
		let isDisabled = false;

		if (dayCounter.day() === dayOfWeek &&
				dayCounter.month() === pickerDate.month()) {
			// update classes
			classes = ['day'];
			// today
			if (dayCounter.isSame(moment(), 'day')) {
				classes.push('day__today');
			}
			// weekend
			if (dayCounter.day() === 0 || dayCounter.day() === 6) {
				classes.push('day__weekend');
			}
			// selected
			if (!isEmpty(this.props.value) && dayCounter.isSame(moment(this.props.value), 'day')) {
				classes.push('day__selected');
			}
			// min / max
			if (!isEmpty(this.props.min) && dayCounter.isBefore(moment(this.props.min), 'day')) {
				classes.push('day__disabled');
				isDisabled = true;
			}
			if (!isEmpty(this.props.max) && dayCounter.isAfter(moment(this.props.max), 'day')) {
				classes.push('day__disabled');
				isDisabled = true;
			}

			// set content
			if (isDisabled) {
				content = (<span>{dayCounter.format('D')}</span>);
			}
			else {
				const passedObj = moment(dayCounter);
				content = (
					<a href="#" onClick={this._onSelect.bind(this, passedObj)}>{dayCounter.format('D')}</a>
				);
			}
			contentKey = dayCounter.format('YYYY-MM-DD');

			// increase counter
			dayCounter.add(1, 'd');
		}

		return (
			<td 
				key={contentKey || uniqueId()}
				className={classNames(classes)}
			>
				{content}
			</td>
		)
	}

	_onChange(type, amount, e) {
		e.preventDefault();

		// prevent fast click
		if (this.isTransition) {
			return;
		}
		this.isTransition = true;
		this.timerTransition = setTimeout(() => {
			this.isTransition = false;
		}, 400);

		const { format } = this.props;
		const { pickerDate } = this.state;
		const momentObj = moment(pickerDate);

		momentObj.add(amount, type);

		this.setState({
			pickerDate 	: momentObj.format(format),
			isPrevious 	: amount < 0,
		});
	}

	_onSelect(momentObj, e) {
		e.preventDefault();

		// prevent fast click
		if (this.isTransition) {
			return;
		}
		this.isTransition = true;
		this.timerTransition = setTimeout(() => {
			this.isTransition = false;
		}, 400);

		const { value, format } = this.props;

		if (this.props.onChange) {
			const currentMoment = moment(value, format);
			this.props.onChange(
				momentObj
					.hour(currentMoment.hour())
					.minute(currentMoment.minute())
					.format(format)
			);
		}
	}
} 