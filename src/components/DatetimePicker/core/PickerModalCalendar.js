import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { isEmpty, times, uniqueId } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { IconButton } from '../../Button';

import './PickerModalCalendar.less';


export default class PickerModalCalendar extends PureComponent {

	static propTypes = {
		momentValue : PropTypes.object, 	// current picker moment object
		min 		: PropTypes.object, 	// min date value, moment object
		max 		: PropTypes.object, 	// max date value, moment object
		start_from 	: PropTypes.number, 	// calendar start from day 
		onChange 	: PropTypes.func, 		// when calendar date changed
		onRenderDay : PropTypes.func, 		// apply extra custom classNames to day
	};

	static defaultProps = {
		start_from 	: 1,
	};

	constructor(props) {
		super(props);

		// actions
		this._onSelectDay = this._onSelectDay.bind(this);
		this._onChangeViewMonth = this._onChangeViewMonth.bind(this);

		this.state = {
			viewMonth 	: moment(props.momentValue).startOf('month'),
			isPrevViewMonth : false,
		};
	}

  	render() {
  		const { isPrevViewMonth } = this.state;

  		return (
  			<div className="PickerModalCalendar">
  				{this.renderCalendarTop()}

  				<ReactCSSTransitionGroup 
					className="PickerModalCalendar-body"
					transitionName={isPrevViewMonth ? "slideRight" : "slideLeft"} 
					transitionEnterTimeout={350} 
					transitionLeaveTimeout={350}
				>
	          		{this.renderDays()}
	        	</ReactCSSTransitionGroup>
  			</div>	
		)
  	}

  	renderCalendarTop() {
  		const { start_from } = this.props;
  		const { viewMonth, isPrevViewMonth } = this.state;

  		return (
  			<div className="PickerModalCalendar-top">
				<table className="PickerModalCalendar-table">
					<tbody>
						<tr>
			  				<th className="PickerModalCalendar-top-nav">
			  					<a href="#"
			  						data-type="prev"
			  						onClick={this._onChangeViewMonth}
			  					>◄</a>
							</th>
							<th className="PickerModalCalendar-top-title" colSpan="5">
								<ReactCSSTransitionGroup
									transitionName={isPrevViewMonth ? "slideRight" : "slideLeft"} 
									transitionEnterTimeout={350} 
									transitionLeaveTimeout={350}
								>
									<div className="current-date" key={viewMonth.format('YYYY_MM')}>
										{viewMonth.format('MMMM YYYY')}
									</div>
								</ReactCSSTransitionGroup>
							</th>
							<th className="PickerModalCalendar-top-nav">
								<a href="#"
			  						data-type="next"
			  						onClick={this._onChangeViewMonth}
			  					>►</a>
							</th>
			  			</tr>
						{/*week list*/}
						<tr>
							{times(7, n => 
								<td className="week" key={n}>
									{moment((n + start_from) % 7, 'd').format('dd')}
								</td>
							)}
						</tr>
					</tbody>
				</table>
			</div>	
		)
  	}

  	renderDays() {
		const { start_from } = this.props;
		const { viewMonth } = this.state;

		// counter
		const dayCounter = moment(viewMonth); 	// clone viewMonth 
		const weeksEl = [];
		// 1 month maximum have 6 weeks
		times(6, week => {
			// 1 week have 7 days
			weeksEl.push((
				<tr key={week}>
					{times(7, i => this.renderDay(dayCounter, (i + start_from) % 7))}
				</tr>
			));
		});

		return (
			<div className="DatePickerCalendar-days" key={viewMonth.format('YYYY_MM')}>
				<table className="PickerModalCalendar-table">
					<tbody>
						{weeksEl}
					</tbody>
				</table>
			</div>
		)
	}

	renderDay(dayCounter, dayOfWeek) {
		let content;

		// same as current view month
		// match starting dayOfweek
		if (dayCounter.month() === this.state.viewMonth.month() &&
			dayCounter.day() === dayOfWeek) {
			// generate className
			let classNameArr = ['day'];
			// today
			if (dayCounter.isSame(moment(), 'day')) {
				classNameArr.push('__today');
			}
			// weekend
			if (dayCounter.day() === 0 || dayCounter.day() === 6) {
				classNameArr.push('__weekend');
			}
			// selected
			if (dayCounter.isSame(this.props.momentValue, 'day')) {
				classNameArr.push('__selected');
			}
			// min / max
			if (this.props.min && dayCounter.isBefore(this.props.min, 'day')) {
				classNameArr.push('__disabled');
			}
			else if (this.props.max && dayCounter.isAfter(this.props.max, 'day')) {
				classNameArr.push('__disabled');
			}

			// apply filter to classNames
			if (this.props.onRenderDay) {
				classNameArr = this.props.onRenderDay(classNameArr, dayCounter) || [];
			}

			content = (
				<td key={dayCounter.format('YYYY-MM-DD')}
					className={classNames(classNameArr)}>
					{classNameArr.indexOf('__disabled') !== -1 &&
						<span>{dayCounter.format('D')}</span>
					}

					{classNameArr.indexOf('__disabled') === -1 &&
						<a href="#" 
							data-day={dayCounter.format('DD')} 	// clone moment counter
							onClick={this._onSelectDay}>
							{dayCounter.format('D')}
						</a>
					}
				</td>
			)

			// increase counter
			dayCounter.add(1, 'd');
		}
		else {
			content = (
				<td key={uniqueId('empty_')} className={classNames('__empty')}>
					<span>&nbsp;</span>
				</td>
			)
		}

		return content;
	}

	_onChangeViewMonth(e) {
		e.preventDefault();

		const { viewMonth } = this.state;

		const isPrevMonth = e.currentTarget.dataset.type == 'prev' ? true : false;
		const nextViewMonth = isPrevMonth ? viewMonth.subtract(1, 'month') : viewMonth.add(1, 'month');

		this.setState({
			viewMonth 	: nextViewMonth,
			isPrevViewMonth : isPrevMonth,
			forceRefresh : nextViewMonth.month(), 	// force refresh
		})
	}

	_onSelectDay(e) {
		e.preventDefault();

		const selectedDay = (e.currentTarget.dataset || {}).day;

		if (selectedDay && this.props.onChange) {
			const newMoment = moment(this.props.momentValue).date(selectedDay);
			this.props.onChange(newMoment)
		}
	}
} 