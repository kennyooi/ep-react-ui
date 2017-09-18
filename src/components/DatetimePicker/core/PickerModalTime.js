import { PureComponent } from 'react';
import moment from 'moment';
import { times, map, padStart } from 'lodash';
import { addClass, removeClass } from '../../../helpers/styler';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import style from './PickerModalTime.less';


export default class PickerModalTime extends PureComponent {

	static propTypes = {
		momentValue : PropTypes.object, 	// current picker moment object
		min 		: PropTypes.object, 	// min date value, moment default format
		max 		: PropTypes.object, 	// max date value, moment default format
		timeInterval : PropTypes.number, 	// time interval between minutes
		onChange 	: PropTypes.func, 		// when calendar date changed
	};

	constructor(props) {
		super(props);

		// actions
		this._onClick = this._onClick.bind(this);
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
	}

	componentWillMount() {
		const { timeInterval } = this.props;

		// Generate set of data
		this.__clocks = {
			hours   : times(12, index => (index+1).toString()),
			minutes : times((60 / timeInterval), index => moment(index * timeInterval, 'm').format('mm')),
			periods : ['AM', 'PM'],
		};

		// prepend & append for loop effect
		map(this.__clocks, (dataset, key) => {
			const prepend = [], append = [];
			// 3 items each
			times(3, index => {
				const selected_index = index % dataset.length;
				prepend.unshift( dataset[ dataset.length - 1 - selected_index ] );
				append.push( dataset[ selected_index ] );
			})

			this.__clocks[key] = prepend.concat(dataset).concat(append);
		});
	}

	componentWillUnmount() {
		this.removeDragEvent();
	}

	componentDidMount() {
		const { momentValue, timeInterval } = this.props;

		// set default value
		this.__childHeight = document.getElementById('Picker_hours').children[0].clientHeight;

		// hour
		let hourHeight = this.__clocks.hours.length * this.__childHeight;
		let hourPos = -this.__clocks.hours.indexOf(momentValue.format('h')) * this.__childHeight;
		document.getElementById('Picker_hours').style.top = `${this.calcPosition(hourPos, hourHeight)}px`;

		// minute - round up minute 
		let minute = (Math.round(momentValue.format('mm') / timeInterval) * timeInterval) % 60;
		let minuteHeight = this.__clocks.minutes.length * this.__childHeight;
		let minutePos = -this.__clocks.minutes.indexOf(padStart(minute, 2, '0')) * this.__childHeight;
		document.getElementById('Picker_minutes').style.top = `${this.calcPosition(minutePos, minuteHeight)}px`;

		// period
		let period = momentValue.hour() > 12 ? 'PM' : 'AM';
		let periodHeight = this.__clocks.periods.length * this.__childHeight;
		let periodPos = -this.__clocks.periods.indexOf(period) * this.__childHeight;
		document.getElementById('Picker_periods').style.top = `${this.calcPosition(periodPos, periodHeight)}px`;
	}

	render() {
		const { momentValue } = this.props;

		return (
			<div className="PickerModalTime">
				{map(this.__clocks, (dataset, id) =>
					<div key={id} 
						className="PickerModalTime-item" 
						data-type={id}
						data-target={`Picker_${id}`}
						onMouseDown={this._onMouseDown}>
						<div className="PickerModalTime-item-mask top"></div>
						<div className="PickerModalTime-item-mask btm"></div>
						<div className="PickerModalTime-item-highlight">
							<div className="PickerModalTime-item-container">
								<div id={`Picker_${id}`} className="PickerModalTime-item-list">
									{dataset.map((val, index) =>
										<span key={index}
											data-type={id}
											data-index={index}
											data-value={val} 
											onClick={this._onClick}>
											{val}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}

	// Internal method
	attachDragEvent() {
		document.addEventListener("mousemove", this._onMouseMove);
		document.addEventListener("mouseup", this._onMouseUp);
	}

	removeDragEvent() {
		document.removeEventListener("mousemove", this._onMouseMove);
		document.removeEventListener("mouseup", this._onMouseUp);
	}

	doChange(type, val) {
		const { momentValue } = this.props;

		let newMomentValue;
		if (type === 'hours' && val !== momentValue.format('h') ) {
			newMomentValue = moment(momentValue).hour(momentValue.format('A') === 'PM' ? 
															(val % 12) + 12 : (val % 12));
		}
		else if (type === 'minutes' && val !== momentValue.format('mm')) {
			newMomentValue = moment(momentValue).minute(val);
		}
		else if (type === 'periods' && val !== momentValue.format('A')) {
			newMomentValue = moment(momentValue).add(12 * (val === 'PM' ? 1 : -1), 'hour');
		}

		if (newMomentValue && this.props.onChange) {
			this.props.onChange(newMomentValue);
		}
	}

	// enable loop effect
	// forgot how I calculate this ald =__=''
	calcPosition(posY, maxHeight) {
		const minY = -(maxHeight - (this.__childHeight * 3)),
		   	  maxY = -(this.__childHeight * 2),
		   	  actualHeight = maxHeight - this.__childHeight * 6;

		if (posY < minY) {
			posY = (posY - minY - this.__childHeight) % actualHeight + maxY;
		}
		else if (posY > maxY) {
			posY = (posY - maxY + this.__childHeight) % actualHeight + minY;
		}

		return posY;
	}


	// actions
	_onMouseDown(e) {
		this.__dragType = e.currentTarget.dataset.type;
		this.__dragEl = document.getElementById( e.currentTarget.dataset.target );
		this.__dragClickY = e.pageY;
		this.__dragStartY = this.__dragEl.offsetTop;
		this.__dragMaxHeight = this.__dragEl.children.length * this.__childHeight;
		this.__dragOffset = 0;

		// add class
		this.__dragEl.classList.add('__is-drag');

		this.attachDragEvent();
	}

	_onMouseUp(e) {
		this.removeDragEvent();

		// Detect the need to update
		if (Math.abs(this.__dragOffset) >= 10) {
			const { __dragType, __dragEl, __childHeight } = this;

			const selectedIndex = Math.round(Math.abs(__dragEl.offsetTop) / __childHeight);
			const selectedVal = this.__clocks[__dragType][selectedIndex];

			// Trigger onChange
			this.doChange( __dragType, selectedVal );

			// Auto correct
			__dragEl.style.top = `${-selectedIndex * __childHeight}px`;
		}

		// remove class		
		this.__dragEl.classList.remove('__is-drag');
	}

	_onMouseMove(e) {
		const { __dragMaxHeight, __dragClickY, __dragStartY } = this;

		this.__dragOffset = e.pageY - __dragClickY;
		
		// keep max & min position (changed to loop)
		// const posY = Math.min(0, Math.max(-__dragMaxHeight + __childHeight, __dragStartY + this.__dragOffset));

		let posY = __dragStartY + this.__dragOffset;
		posY = this.calcPosition( posY, __dragMaxHeight );

		// update position
		this.__dragEl.style.top = `${posY}px`;
	}

	_onClick(e) {
		// Detect the need to trigger click
		if (Math.abs(this.__dragOffset) < 10) {
			const type = e.currentTarget.dataset.type,
				  selectedIndex = e.currentTarget.dataset.index,
				  selectedVal = e.currentTarget.dataset.value;

			this.doChange( type, selectedVal );

			// update position
			let maxHeight = this.__clocks[type].length * this.__childHeight;
			let posY = -selectedIndex * this.__childHeight;
			document.getElementById(`Picker_${type}`).style.top = `${this.calcPosition(posY, maxHeight)}px`;
		}
	}
} 