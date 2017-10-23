'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Button = require('../../Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerModalCalendar = function (_PureComponent) {
	_inherits(PickerModalCalendar, _PureComponent);

	function PickerModalCalendar(props) {
		_classCallCheck(this, PickerModalCalendar);

		// actions
		var _this = _possibleConstructorReturn(this, (PickerModalCalendar.__proto__ || Object.getPrototypeOf(PickerModalCalendar)).call(this, props));

		_this._onSelectDay = _this._onSelectDay.bind(_this);
		_this._onChangeViewMonth = _this._onChangeViewMonth.bind(_this);

		_this.state = {
			viewMonth: (0, _moment2.default)(props.momentValue).startOf('month'),
			isPrevViewMonth: false
		};
		return _this;
	}

	_createClass(PickerModalCalendar, [{
		key: 'render',
		value: function render() {
			var isPrevViewMonth = this.state.isPrevViewMonth;


			return React.createElement(
				'div',
				{ className: 'PickerModalCalendar' },
				this.renderCalendarTop(),
				React.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						className: 'PickerModalCalendar-body',
						transitionName: isPrevViewMonth ? "slideRight" : "slideLeft",
						transitionEnterTimeout: 350,
						transitionLeaveTimeout: 350
					},
					this.renderDays()
				)
			);
		}
	}, {
		key: 'renderCalendarTop',
		value: function renderCalendarTop() {
			var start_from = this.props.start_from;
			var _state = this.state,
			    viewMonth = _state.viewMonth,
			    isPrevViewMonth = _state.isPrevViewMonth;


			return React.createElement(
				'div',
				{ className: 'PickerModalCalendar-top' },
				React.createElement(
					'table',
					{ className: 'PickerModalCalendar-table' },
					React.createElement(
						'tbody',
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'th',
								{ className: 'PickerModalCalendar-top-nav' },
								React.createElement(
									'a',
									{ href: '#',
										'data-type': 'prev',
										onClick: this._onChangeViewMonth
									},
									'\u25C4'
								)
							),
							React.createElement(
								'th',
								{ className: 'PickerModalCalendar-top-title', colSpan: '5' },
								React.createElement(
									_reactAddonsCssTransitionGroup2.default,
									{
										transitionName: isPrevViewMonth ? "slideRight" : "slideLeft",
										transitionEnterTimeout: 350,
										transitionLeaveTimeout: 350
									},
									React.createElement(
										'div',
										{ className: 'current-date', key: viewMonth.format('YYYY_MM') },
										viewMonth.format('MMMM YYYY')
									)
								)
							),
							React.createElement(
								'th',
								{ className: 'PickerModalCalendar-top-nav' },
								React.createElement(
									'a',
									{ href: '#',
										'data-type': 'next',
										onClick: this._onChangeViewMonth
									},
									'\u25BA'
								)
							)
						),
						React.createElement(
							'tr',
							null,
							(0, _lodash.times)(7, function (n) {
								return React.createElement(
									'td',
									{ className: 'week', key: n },
									(0, _moment2.default)((n + start_from) % 7, 'd').format('dd')
								);
							})
						)
					)
				)
			);
		}
	}, {
		key: 'renderDays',
		value: function renderDays() {
			var _this2 = this;

			var start_from = this.props.start_from;
			var viewMonth = this.state.viewMonth;

			// counter

			var dayCounter = (0, _moment2.default)(viewMonth); // clone viewMonth 
			var weeksEl = [];
			// 1 month maximum have 6 weeks
			(0, _lodash.times)(6, function (week) {
				// 1 week have 7 days
				weeksEl.push(React.createElement(
					'tr',
					{ key: week },
					(0, _lodash.times)(7, function (i) {
						return _this2.renderDay(dayCounter, (i + start_from) % 7);
					})
				));
			});

			return React.createElement(
				'div',
				{ className: 'DatePickerCalendar-days', key: viewMonth.format('YYYY_MM') },
				React.createElement(
					'table',
					{ className: 'PickerModalCalendar-table' },
					React.createElement(
						'tbody',
						null,
						weeksEl
					)
				)
			);
		}
	}, {
		key: 'renderDay',
		value: function renderDay(dayCounter, dayOfWeek) {
			var content = void 0;

			// same as current view month
			// match starting dayOfweek
			if (dayCounter.month() === this.state.viewMonth.month() && dayCounter.day() === dayOfWeek) {
				// generate className
				var classNameArr = ['day'];
				// today
				if (dayCounter.isSame((0, _moment2.default)(), 'day')) {
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
				} else if (this.props.max && dayCounter.isAfter(this.props.max, 'day')) {
					classNameArr.push('__disabled');
				}

				// apply filter to classNames
				if (this.props.onRenderDay) {
					classNameArr = this.props.onRenderDay(classNameArr, dayCounter) || [];
				}

				content = React.createElement(
					'td',
					{ key: dayCounter.format('YYYY-MM-DD'),
						className: classNames(classNameArr) },
					classNameArr.indexOf('__disabled') !== -1 && React.createElement(
						'span',
						null,
						dayCounter.format('D')
					),
					classNameArr.indexOf('__disabled') === -1 && React.createElement(
						'a',
						{ href: '#',
							'data-day': dayCounter.format('DD') // clone moment counter
							, onClick: this._onSelectDay },
						dayCounter.format('D')
					)
				);

				// increase counter
				dayCounter.add(1, 'd');
			} else {
				content = React.createElement(
					'td',
					{ key: (0, _lodash.uniqueId)('empty_'), className: classNames('__empty') },
					React.createElement(
						'span',
						null,
						'\xA0'
					)
				);
			}

			return content;
		}
	}, {
		key: '_onChangeViewMonth',
		value: function _onChangeViewMonth(e) {
			e.preventDefault();

			var viewMonth = this.state.viewMonth;


			var isPrevMonth = e.currentTarget.dataset.type == 'prev' ? true : false;
			var nextViewMonth = isPrevMonth ? viewMonth.subtract(1, 'month') : viewMonth.add(1, 'month');

			this.setState({
				viewMonth: nextViewMonth,
				isPrevViewMonth: isPrevMonth,
				forceRefresh: nextViewMonth.month() // force refresh
			});
		}
	}, {
		key: '_onSelectDay',
		value: function _onSelectDay(e) {
			e.preventDefault();

			var selectedDay = (e.currentTarget.dataset || {}).day;

			if (selectedDay && this.props.onChange) {
				var newMoment = (0, _moment2.default)(this.props.momentValue).date(selectedDay);
				this.props.onChange(newMoment);
			}
		}
	}]);

	return PickerModalCalendar;
}(_react.PureComponent);

PickerModalCalendar.propTypes = {
	momentValue: PropTypes.object, // current picker moment object
	min: PropTypes.object, // min date value, moment object
	max: PropTypes.object, // max date value, moment object
	start_from: PropTypes.number, // calendar start from day 
	onChange: PropTypes.func, // when calendar date changed
	onRenderDay: PropTypes.func // apply extra custom classNames to day
};
PickerModalCalendar.defaultProps = {
	start_from: 1
};
exports.default = PickerModalCalendar;