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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerModalHeader = function (_PureComponent) {
	_inherits(PickerModalHeader, _PureComponent);

	function PickerModalHeader(props) {
		_classCallCheck(this, PickerModalHeader);

		// variables
		var _this = _possibleConstructorReturn(this, (PickerModalHeader.__proto__ || Object.getPrototypeOf(PickerModalHeader)).call(this, props));

		_this.__isPrev = false;

		// actions
		_this._onChangeView = _this._onChangeView.bind(_this);
		return _this;
	}

	_createClass(PickerModalHeader, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps, nextState) {
			if (!nextProps.momentValue.isSame(this.props.momentValue)) {
				this.__prev = nextProps.momentValue.isBefore(this.props.momentValue);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'PickerModalHeader' },
				this.renderSectionYear(),
				this.renderSectionDate(),
				this.renderSectionTime()
			);
		}
	}, {
		key: 'renderSectionDate',
		value: function renderSectionDate() {
			var _props = this.props,
			    momentValue = _props.momentValue,
			    type = _props.type,
			    view = _props.view;

			// disable on time type

			if (type === 'time') {
				return;
			}

			return React.createElement(
				'div',
				{ className: classNames("PickerModalHeader-date __is-large", {
						'__is-active': view === 'date'
					}),
					'data-view': 'date',
					onClick: this._onChangeView
				},
				React.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						transitionName: this.__isPrev ? "slideUp" : "slideDown",
						transitionEnterTimeout: 350,
						transitionLeaveTimeout: 350
					},
					React.createElement(
						'span',
						{ key: momentValue.format('YYYY-MM-DD') },
						momentValue.format('ddd, MMM D')
					)
				)
			);
		}
	}, {
		key: 'renderSectionYear',
		value: function renderSectionYear() {
			var _props2 = this.props,
			    momentValue = _props2.momentValue,
			    type = _props2.type,
			    view = _props2.view,
			    disableYear = _props2.disableYear;

			// disable on time type

			if (type === 'time') {
				return;
			}

			return React.createElement(
				'div',
				{ className: classNames("PickerModalHeader-year", {
						'__is-active': view === 'year'
					}),
					'data-view': 'year',
					onClick: !disableYear ? this._onChangeView : null
				},
				React.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						transitionName: this.__isPrev ? "slideUp" : "slideDown",
						transitionEnterTimeout: 350,
						transitionLeaveTimeout: 350
					},
					React.createElement(
						'span',
						{ key: momentValue.format('YYYY') },
						momentValue.format('YYYY')
					)
				)
			);
		}
	}, {
		key: 'renderSectionTime',
		value: function renderSectionTime() {
			var _props3 = this.props,
			    momentValue = _props3.momentValue,
			    type = _props3.type,
			    view = _props3.view,
			    disableTime = _props3.disableTime;

			// disable on date type

			if (type === 'date') {
				return;
			}

			return React.createElement(
				'div',
				{ className: classNames("PickerModalHeader-time", {
						'__is-active': view === 'time',
						'__is-large': type === 'time'
					}),
					'data-view': 'time',
					onClick: !disableTime ? this._onChangeView : null
				},
				React.createElement(
					'span',
					null,
					momentValue.format('h:mm'),
					React.createElement(
						'small',
						null,
						momentValue.format('A')
					)
				)
			);
		}
	}, {
		key: '_onChangeView',
		value: function _onChangeView(e) {
			var view = (e.currentTarget.dataset || {}).view;

			if (view && this.props.onChange) {
				this.props.onChange(view);
			}
		}
	}]);

	return PickerModalHeader;
}(_react.PureComponent);

PickerModalHeader.propTypes = {
	momentValue: _propTypes2.default.object, // current picker moment object
	type: _propTypes2.default.string, // datepicker type
	view: _propTypes2.default.string, // active view: 'date'*, 'year'
	disableYear: _propTypes2.default.bool, // disable year view
	disableTime: _propTypes2.default.bool // disable time view
};
exports.default = PickerModalHeader;