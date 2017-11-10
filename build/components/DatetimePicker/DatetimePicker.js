'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _Modal = require('../Modal');

var _Button = require('../Button');

var _Form = require('../Form');

var _PickerModalHeader = require('./core/PickerModalHeader');

var _PickerModalHeader2 = _interopRequireDefault(_PickerModalHeader);

var _PickerModalCalendar = require('./core/PickerModalCalendar');

var _PickerModalCalendar2 = _interopRequireDefault(_PickerModalCalendar);

var _PickerModalYear = require('./core/PickerModalYear');

var _PickerModalYear2 = _interopRequireDefault(_PickerModalYear);

var _PickerModalTime = require('./core/PickerModalTime');

var _PickerModalTime2 = _interopRequireDefault(_PickerModalTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date picker input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var DatetimePicker = function (_PureComponent) {
	_inherits(DatetimePicker, _PureComponent);

	function DatetimePicker(props) {
		_classCallCheck(this, DatetimePicker);

		var _this = _possibleConstructorReturn(this, (DatetimePicker.__proto__ || Object.getPrototypeOf(DatetimePicker)).call(this, props));

		_this.state = {
			isShowModal: false, // modal flag
			currentView: props.type == 'time' ? 'time' : 'date', // calendar view
			selectedDate: null // calendar date
		};

		// actions
		_this._onConfirm = _this._onConfirm.bind(_this);
		_this._onOpenModal = _this._onOpenModal.bind(_this);
		_this._onCloseModal = _this._onCloseModal.bind(_this);
		_this._onChangeView = _this._onChangeView.bind(_this);
		_this._onChangeDate = _this._onChangeDate.bind(_this);
		return _this;
	}

	_createClass(DatetimePicker, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    value = _props.value,
			    format = _props.format,
			    displayFormat = _props.displayFormat,
			    inputProps = _props.inputProps;
			var isShowModal = this.state.isShowModal;


			var formatted_value = value ? (0, _moment2.default)(value, format).format(displayFormat) : '';

			return React.createElement(
				'div',
				null,
				React.createElement(_Form.InputField, _extends({}, inputProps, {
					className: classNames('DatetimePicker-input', inputProps.className),
					value: formatted_value,
					readOnly: true,
					onFocus: this._onOpenModal
				})),
				React.createElement(
					_Modal.Modal,
					{
						className: 'DatetimePickerModal',
						isShow: isShowModal,
						onRequestClose: this._onCloseModal
					},
					this.renderModalContent()
				)
			);
		}
	}, {
		key: 'renderModalContent',
		value: function renderModalContent() {
			var _props2 = this.props,
			    disableYear = _props2.disableYear,
			    min = _props2.min,
			    max = _props2.max,
			    type = _props2.type,
			    timeInterval = _props2.timeInterval,
			    onRenderDay = _props2.onRenderDay,
			    txtCancel = _props2.txtCancel,
			    txtConfirm = _props2.txtConfirm;
			var _state = this.state,
			    isShowModal = _state.isShowModal,
			    selectedDate = _state.selectedDate,
			    currentView = _state.currentView;


			if (!isShowModal) {
				return null;
			}

			return React.createElement(
				'div',
				{ className: 'DatetimePickerModal-content' },
				React.createElement(
					'div',
					{ className: 'DatetimePickerModal-header' },
					React.createElement(_PickerModalHeader2.default, {
						type: type,
						disableYear: disableYear,
						view: currentView,
						momentValue: selectedDate,
						onChange: this._onChangeView
					})
				),
				React.createElement(
					'div',
					{ className: 'DatetimePickerModal-body' },
					currentView === 'date' && React.createElement(_PickerModalCalendar2.default, {
						min: min,
						max: max,
						momentValue: selectedDate,
						onChange: this._onChangeDate,
						onRenderDay: onRenderDay
					}),
					currentView === 'year' && React.createElement(_PickerModalYear2.default, {
						min: min,
						max: max,
						momentValue: selectedDate,
						onChange: this._onChangeDate
					}),
					currentView === 'time' && React.createElement(_PickerModalTime2.default, {
						min: min,
						max: max,
						timeInterval: timeInterval,
						momentValue: selectedDate,
						onChange: this._onChangeDate
					})
				),
				React.createElement(
					'div',
					{ className: 'DatetimePickerModal-footer' },
					React.createElement(
						_Button.FlatButton,
						{
							theme: 'default',
							onClick: this._onCloseModal
						},
						txtCancel
					),
					React.createElement(
						_Button.FlatButton,
						{
							theme: 'orange',
							onClick: this._onConfirm
						},
						txtConfirm
					)
				)
			);
		}

		// actions

	}, {
		key: '_onOpenModal',
		value: function _onOpenModal() {
			var _props3 = this.props,
			    type = _props3.type,
			    value = _props3.value,
			    format = _props3.format;


			this.setState({
				isShowModal: true,
				currentView: type == 'time' ? 'time' : 'date',
				selectedDate: value ? (0, _moment2.default)(value, format) : (0, _moment2.default)()
			});
		}
	}, {
		key: '_onCloseModal',
		value: function _onCloseModal() {
			this.setState({
				isShowModal: false,
				selectedDate: null
			});
		}
	}, {
		key: '_onChangeView',
		value: function _onChangeView(view) {
			this.setState({
				currentView: view
			});
		}
	}, {
		key: '_onChangeDate',
		value: function _onChangeDate(momentObj) {
			this.setState({
				selectedDate: momentObj
			});
		}
	}, {
		key: '_onConfirm',
		value: function _onConfirm() {
			var format = this.props.format;
			var selectedDate = this.state.selectedDate;


			if (this.props.onChange) {
				this.props.onChange(selectedDate.format(format));
			}

			this._onCloseModal();
		}
	}]);

	return DatetimePicker;
}(_react.PureComponent);

DatetimePicker.propTypes = {
	value: _propTypes2.default.string, // input value, moment default format
	type: _propTypes2.default.string, // datePicker type, ['date', 'datetime', 'time']
	min: _propTypes2.default.object, // min date value, moment default format
	max: _propTypes2.default.object, // max date value, moment default format
	format: _propTypes2.default.string, // value format
	timeInterval: _propTypes2.default.number, // time interval between minutes
	displayFormat: _propTypes2.default.string, // display format
	disableYear: _propTypes2.default.bool, // disable year change
	inputProps: _propTypes2.default.object, // extra props for input
	txtCancel: _propTypes2.default.string, // cancel button text
	txtConfirm: _propTypes2.default.string, // confirm button text
	onChange: _propTypes2.default.func, // trigger when date changed
	onRenderDay: _propTypes2.default.func // apply extra custom classNames to day
};
DatetimePicker.defaultProps = {
	type: 'datetime',
	value: '',
	timeInterval: 15,
	format: 'YYYY-MM-DD HH:mm',
	displayFormat: 'ddd, MMM D YYYY, h:mm A',
	inputProps: {},
	txtCancel: 'Cancel',
	txtConfirm: 'Select'
};
exports.default = DatetimePicker;