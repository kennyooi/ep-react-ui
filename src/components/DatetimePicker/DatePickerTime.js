import './DatePickerTime.less';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { times } from 'lodash';
import { shallowEqual } from '../../../helpers/compare';
import { addClass, removeClass } from '../../../helpers/styler';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const LOOP_NUMBER = 10;

export default class DatePickerTime extends Component {

	static propTypes = {
		value 		: PropTypes.string, 	// input value, moment default format
		min 		: PropTypes.string, 	// min date value, moment default format
		max 		: PropTypes.string, 	// max date value, moment default format
		format 		: PropTypes.string, 	// moment format
		timeInterval : PropTypes.number, 	// time interval between minutes
		onChange 	: PropTypes.func, 		// when calendar date changed
	};

	static defaultProps = {
		value 		: '',
	};

	constructor(props) {
		super();

		// internal variables
		this.isTransition = false;

		this.dragType = null;
		this.startY = 0; 		// starting offset Y
		this.clickY = 0; 		// click point Y
		this.maxHeight = 0; 	// max height of childs
		this.childHeight = 56;	// child height
		this.selectEl = null;	// current el
		this.offset = null; 	// used to differentiate is drag / is click
		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
	}

	componentWillMount() {
		const { timeInterval } = this.props;

		// Generate set of data
		this.hours = times(12, index => (index+1).toString());
		this.minutes = times((60 / timeInterval), index => moment(index * timeInterval, 'm').format('mm'));
		this.periods = ['AM', 'PM'];
	}

	componentWillUnmount() {
		this.removeDragEvent();
	}

	componentDidMount() {
		const { value, format, timeInterval } = this.props;
		const { childHeight } = this;

		// Set default value
		const momentObj = moment(value, format);
		this.isLate = momentObj.hour() > 12 ? 'PM' : 'AM';

		this.refs.hours.style.top = `-${this.hours.indexOf(momentObj.format('h')) * childHeight}px`;
		this.refs.minutes.style.top = `-${this.minutes.indexOf(momentObj.format('mm')) * childHeight}px`;
		this.refs.periods.style.top = `-${this.periods.indexOf(this.isLate ? 'PM' : 'AM') * childHeight}px`;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowEqual(this.props, nextProps);
  	}

	render() {
		const { value, format, min, max } = this.props;
		
		return (
			<div className="DatePickerTime" ref="el">
				<div className="DatePickerTime-item" onMouseDown={this._onMouseDown.bind(this, 'hours')}>
					<div className="DatePickerTime-item-mask top"></div>
					<div className="DatePickerTime-item-mask btm"></div>
					<div className="DatePickerTime-item-highlight">
						<div className="DatePickerTime-item-container">
							<div className="DatePickerTime-item-list" ref="hours">
								{this.hours.map((val, index) =>
									<span key={val} onClick={this._onClick.bind(this, 'hours', index)}>{val}</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="DatePickerTime-item" onMouseDown={this._onMouseDown.bind(this, 'minutes')}>
					<div className="DatePickerTime-item-mask top"></div>
					<div className="DatePickerTime-item-mask btm"></div>
					<div className="DatePickerTime-item-highlight">
						<div className="DatePickerTime-item-container">
							<div className="DatePickerTime-item-list" ref="minutes">
								{this.minutes.map((val, index) =>
									<span key={val} onClick={this._onClick.bind(this, 'minutes', index)}>{val}</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="DatePickerTime-item" onMouseDown={this._onMouseDown.bind(this, 'periods')}>
					<div className="DatePickerTime-item-mask top"></div>
					<div className="DatePickerTime-item-mask btm"></div>
					<div className="DatePickerTime-item-highlight">
						<div className="DatePickerTime-item-container">
							<div className="DatePickerTime-item-list" ref="periods">
								{this.periods.map((val, index) =>
									<span key={val} onClick={this._onClick.bind(this, 'periods', index)}>{val}</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// Internal method
	attachDragEvent() {
		addClass(this.selectEl, 'is__drag');
		document.addEventListener("mousemove", this._onMouseMove);
		document.addEventListener("mouseup", this._onMouseUp);
	}

	removeDragEvent() {
		// @for unmount case check
		if (this.selectEl) {
			removeClass(this.selectEl, 'is__drag');
		}
		document.removeEventListener("mousemove", this._onMouseMove);
		document.removeEventListener("mouseup", this._onMouseUp);
	}


	// actions
	_onMouseDown(type, e) {
		// Update drag variables
		this.dragType = type;
		this.selectEl = this.refs[type];
		this.clickY = e.pageY;
		this.startY = this.selectEl.offsetTop;
		this.maxHeight = this.selectEl.clientHeight;
		this.offset = 0;

		this.attachDragEvent();
	}

	_onMouseUp(e) {
		// Reset drag variables
		this.removeDragEvent();

		const { offset, dragType, selectEl, childHeight } = this;

		// Detect the need to update
		if (Math.abs(offset) >= 10) {
			// console.log('trigger from drag');
 
			const selectedChildIndex = Math.round(Math.abs(selectEl.offsetTop) / childHeight);

			// Auto correct
			selectEl.style.top = `${-selectedChildIndex * childHeight}px`;

			// Trigger onChange
			this._onChange(dragType, this[dragType][selectedChildIndex]);
		}
	}

	_onMouseMove(e) {
		const { selectEl, clickY, startY, maxHeight, childHeight } = this;

		this.offset = e.pageY - clickY;
		const posY = Math.min(0, Math.max(-maxHeight + childHeight, startY + this.offset));
		
		selectEl.style.top = `${posY}px`;
	}

	_onClick(type, selectedIndex, e) {
		// Detect the need to trigger click
		if (Math.abs(this.offset) < 10) {
			// console.log('trigger from click');

			// Update DOM position
			this.refs[type].style.top = `${-selectedIndex * this.childHeight}px`;

			// Trigger onChange
			this._onChange(type, this[type][selectedIndex]);
		}
	}

	_onChange(type, val) {
		const { value, format } = this.props;
		
		let momentObj = moment(value, format);

		if (type === 'hours') {
			// Special checking
			if (val === '12') {
				momentObj.hour(this.isLate ? 12 : 0);
			}
			// PM case
			else if (this.isLate) {
				momentObj.hour(val).add(12, 'hour');
			}
			else {
				momentObj.hour(val);
			}
		}
		else if (type === 'minutes') {
			momentObj.minute(val);
		}
		else if (type === 'periods' && val !== momentObj.format('A')) {
			this.isLate = val === 'PM';
			momentObj.add(12 * (this.isLate ? 1 : -1), 'hour');
		}

		if (this.props.onChange) {
			this.props.onChange(momentObj.format(format));
		}
	}

} 