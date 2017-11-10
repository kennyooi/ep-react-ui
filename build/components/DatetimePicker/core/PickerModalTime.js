'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _styler = require('../../../helpers/styler');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerModalTime = function (_PureComponent) {
	_inherits(PickerModalTime, _PureComponent);

	function PickerModalTime(props) {
		_classCallCheck(this, PickerModalTime);

		// actions
		var _this = _possibleConstructorReturn(this, (PickerModalTime.__proto__ || Object.getPrototypeOf(PickerModalTime)).call(this, props));

		_this._onClick = _this._onClick.bind(_this);
		_this._onMouseDown = _this._onMouseDown.bind(_this);
		_this._onMouseMove = _this._onMouseMove.bind(_this);
		_this._onMouseUp = _this._onMouseUp.bind(_this);
		return _this;
	}

	_createClass(PickerModalTime, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			var timeInterval = this.props.timeInterval;

			// Generate set of data

			this.__clocks = {
				hours: (0, _lodash.times)(12, function (index) {
					return (index + 1).toString();
				}),
				minutes: (0, _lodash.times)(60 / timeInterval, function (index) {
					return (0, _moment2.default)(index * timeInterval, 'm').format('mm');
				}),
				periods: ['AM', 'PM']
			};

			// prepend & append for loop effect
			(0, _lodash.map)(this.__clocks, function (dataset, key) {
				var prepend = [],
				    append = [];
				// 3 items each
				(0, _lodash.times)(3, function (index) {
					var selected_index = index % dataset.length;
					prepend.unshift(dataset[dataset.length - 1 - selected_index]);
					append.push(dataset[selected_index]);
				});

				_this2.__clocks[key] = prepend.concat(dataset).concat(append);
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.removeDragEvent();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    momentValue = _props.momentValue,
			    timeInterval = _props.timeInterval;

			// set default value

			this.__childHeight = document.getElementById('Picker_hours').children[0].clientHeight;

			// hour
			var hourHeight = this.__clocks.hours.length * this.__childHeight;
			var hourPos = -this.__clocks.hours.indexOf(momentValue.format('h')) * this.__childHeight;
			document.getElementById('Picker_hours').style.top = this.calcPosition(hourPos, hourHeight) + 'px';

			// minute - round up minute 
			var minute = Math.round(momentValue.format('mm') / timeInterval) * timeInterval % 60;
			var minuteHeight = this.__clocks.minutes.length * this.__childHeight;
			var minutePos = -this.__clocks.minutes.indexOf((0, _lodash.padStart)(minute, 2, '0')) * this.__childHeight;
			document.getElementById('Picker_minutes').style.top = this.calcPosition(minutePos, minuteHeight) + 'px';

			// period
			var period = momentValue.hour() > 12 ? 'PM' : 'AM';
			var periodHeight = this.__clocks.periods.length * this.__childHeight;
			var periodPos = -this.__clocks.periods.indexOf(period) * this.__childHeight;
			document.getElementById('Picker_periods').style.top = this.calcPosition(periodPos, periodHeight) + 'px';
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var momentValue = this.props.momentValue;


			return React.createElement(
				'div',
				{ className: 'PickerModalTime' },
				(0, _lodash.map)(this.__clocks, function (dataset, id) {
					return React.createElement(
						'div',
						{ key: id,
							className: 'PickerModalTime-item',
							'data-type': id,
							'data-target': 'Picker_' + id,
							onMouseDown: _this3._onMouseDown },
						React.createElement('div', { className: 'PickerModalTime-item-mask top' }),
						React.createElement('div', { className: 'PickerModalTime-item-mask btm' }),
						React.createElement(
							'div',
							{ className: 'PickerModalTime-item-highlight' },
							React.createElement(
								'div',
								{ className: 'PickerModalTime-item-container' },
								React.createElement(
									'div',
									{ id: 'Picker_' + id, className: 'PickerModalTime-item-list' },
									dataset.map(function (val, index) {
										return React.createElement(
											'span',
											{ key: index,
												'data-type': id,
												'data-index': index,
												'data-value': val,
												onClick: _this3._onClick },
											val
										);
									})
								)
							)
						)
					);
				})
			);
		}

		// Internal method

	}, {
		key: 'attachDragEvent',
		value: function attachDragEvent() {
			document.addEventListener("mousemove", this._onMouseMove);
			document.addEventListener("mouseup", this._onMouseUp);
		}
	}, {
		key: 'removeDragEvent',
		value: function removeDragEvent() {
			document.removeEventListener("mousemove", this._onMouseMove);
			document.removeEventListener("mouseup", this._onMouseUp);
		}
	}, {
		key: 'doChange',
		value: function doChange(type, val) {
			var momentValue = this.props.momentValue;


			var newMomentValue = void 0;
			if (type === 'hours' && val !== momentValue.format('h')) {
				newMomentValue = (0, _moment2.default)(momentValue).hour(momentValue.format('A') === 'PM' ? val % 12 + 12 : val % 12);
			} else if (type === 'minutes' && val !== momentValue.format('mm')) {
				newMomentValue = (0, _moment2.default)(momentValue).minute(val);
			} else if (type === 'periods' && val !== momentValue.format('A')) {
				newMomentValue = (0, _moment2.default)(momentValue).add(12 * (val === 'PM' ? 1 : -1), 'hour');
			}

			if (newMomentValue && this.props.onChange) {
				this.props.onChange(newMomentValue);
			}
		}

		// enable loop effect
		// forgot how I calculate this ald =__=''

	}, {
		key: 'calcPosition',
		value: function calcPosition(posY, maxHeight) {
			var minY = -(maxHeight - this.__childHeight * 3),
			    maxY = -(this.__childHeight * 2),
			    actualHeight = maxHeight - this.__childHeight * 6;

			if (posY < minY) {
				posY = (posY - minY - this.__childHeight) % actualHeight + maxY;
			} else if (posY > maxY) {
				posY = (posY - maxY + this.__childHeight) % actualHeight + minY;
			}

			return posY;
		}

		// actions

	}, {
		key: '_onMouseDown',
		value: function _onMouseDown(e) {
			this.__dragType = e.currentTarget.dataset.type;
			this.__dragEl = document.getElementById(e.currentTarget.dataset.target);
			this.__dragClickY = e.pageY;
			this.__dragStartY = this.__dragEl.offsetTop;
			this.__dragMaxHeight = this.__dragEl.children.length * this.__childHeight;
			this.__dragOffset = 0;

			// add class
			this.__dragEl.classList.add('__is-drag');

			this.attachDragEvent();
		}
	}, {
		key: '_onMouseUp',
		value: function _onMouseUp(e) {
			this.removeDragEvent();

			// Detect the need to update
			if (Math.abs(this.__dragOffset) >= 10) {
				var __dragType = this.__dragType,
				    __dragEl = this.__dragEl,
				    __childHeight = this.__childHeight;


				var selectedIndex = Math.round(Math.abs(__dragEl.offsetTop) / __childHeight);
				var selectedVal = this.__clocks[__dragType][selectedIndex];

				// Trigger onChange
				this.doChange(__dragType, selectedVal);

				// Auto correct
				__dragEl.style.top = -selectedIndex * __childHeight + 'px';
			}

			// remove class		
			this.__dragEl.classList.remove('__is-drag');
		}
	}, {
		key: '_onMouseMove',
		value: function _onMouseMove(e) {
			var __dragMaxHeight = this.__dragMaxHeight,
			    __dragClickY = this.__dragClickY,
			    __dragStartY = this.__dragStartY;


			this.__dragOffset = e.pageY - __dragClickY;

			// keep max & min position (changed to loop)
			// const posY = Math.min(0, Math.max(-__dragMaxHeight + __childHeight, __dragStartY + this.__dragOffset));

			var posY = __dragStartY + this.__dragOffset;
			posY = this.calcPosition(posY, __dragMaxHeight);

			// update position
			this.__dragEl.style.top = posY + 'px';
		}
	}, {
		key: '_onClick',
		value: function _onClick(e) {
			// Detect the need to trigger click
			if (Math.abs(this.__dragOffset) < 10) {
				var type = e.currentTarget.dataset.type,
				    selectedIndex = e.currentTarget.dataset.index,
				    selectedVal = e.currentTarget.dataset.value;

				this.doChange(type, selectedVal);

				// update position
				var maxHeight = this.__clocks[type].length * this.__childHeight;
				var posY = -selectedIndex * this.__childHeight;
				document.getElementById('Picker_' + type).style.top = this.calcPosition(posY, maxHeight) + 'px';
			}
		}
	}]);

	return PickerModalTime;
}(_react.PureComponent);

PickerModalTime.propTypes = {
	momentValue: _propTypes2.default.object, // current picker moment object
	min: _propTypes2.default.object, // min date value, moment default format
	max: _propTypes2.default.object, // max date value, moment default format
	timeInterval: _propTypes2.default.number, // time interval between minutes
	onChange: _propTypes2.default.func // when calendar date changed
};
exports.default = PickerModalTime;