'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _FlatButton = require('../Button/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Confirmation Modal, using Modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ConfirmModal = function (_PureComponent) {
	_inherits(ConfirmModal, _PureComponent);

	function ConfirmModal(props) {
		_classCallCheck(this, ConfirmModal);

		var _this = _possibleConstructorReturn(this, (ConfirmModal.__proto__ || Object.getPrototypeOf(ConfirmModal)).call(this, props));

		_this.state = {
			input: '',
			isError: false
		};

		_this._onChange = _this._onChange.bind(_this);
		_this._onConfirm = _this._onConfirm.bind(_this);
		return _this;
	}

	_createClass(ConfirmModal, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    isSecure = _props.isSecure,
			    textCancel = _props.textCancel,
			    textConfirm = _props.textConfirm,
			    textDelete = _props.textDelete,
			    onConfirm = _props.onConfirm,
			    onRequestClose = _props.onRequestClose,
			    others = _objectWithoutProperties(_props, ['className', 'isSecure', 'textCancel', 'textConfirm', 'textDelete', 'onConfirm', 'onRequestClose']);

			return React.createElement(
				_Modal2.default,
				_extends({}, others, {
					style: {
						width: '350px'
					},
					className: classNames("ConfirmModal", className),
					onRequestClose: onRequestClose
				}),
				this.renderModalContent()
			);
		}
	}, {
		key: 'renderModalContent',
		value: function renderModalContent() {
			var _props2 = this.props,
			    children = _props2.children,
			    isShow = _props2.isShow,
			    onRequestClose = _props2.onRequestClose,
			    textCancel = _props2.textCancel,
			    textConfirm = _props2.textConfirm;


			if (!isShow) {
				return null;
			}

			return React.createElement(
				'div',
				{ className: 'ConfirmModal-content' },
				React.createElement(
					'div',
					{ className: 'Modal-body' },
					children,
					this.renderSecureInput()
				),
				React.createElement(
					'div',
					{ className: 'Modal-footer' },
					React.createElement(
						_FlatButton2.default,
						{
							theme: 'default',
							onClick: onRequestClose
						},
						textCancel
					),
					React.createElement(
						_FlatButton2.default,
						{
							theme: 'red',
							onClick: this._onConfirm
						},
						textConfirm
					)
				)
			);
		}
	}, {
		key: 'renderSecureInput',
		value: function renderSecureInput() {
			var _props3 = this.props,
			    isSecure = _props3.isSecure,
			    textDelete = _props3.textDelete;
			var _state = this.state,
			    input = _state.input,
			    isError = _state.isError;


			if (!isSecure) {
				return;
			}

			return React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', {
					type: 'text',
					className: classNames("input input-secure", {
						'input__error': isError
					}),
					placeholder: 'Enter \'' + textDelete + '\'',
					value: input,
					autoFocus: true,
					onChange: this._onChange
				}),
				React.createElement(
					'div',
					{ className: 'input-tips' },
					'Enter \'',
					textDelete,
					'\' to continue.'
				)
			);
		}
	}, {
		key: '_onChange',
		value: function _onChange(e) {
			this.setState({
				isError: false,
				input: e.target.value
			});
		}
	}, {
		key: '_onConfirm',
		value: function _onConfirm() {
			if (this.props.isSecure && this.state.input !== this.props.textDelete) {
				this.setState({
					isError: true
				});

				return;
			}

			this.setState({
				input: ''
			});

			if (this.props.onConfirm) {
				this.props.onConfirm();
			}
		}
	}]);

	return ConfirmModal;
}(_react.PureComponent);

ConfirmModal.propTypes = {
	isShow: _propTypes2.default.bool, // Modal show status
	isSecure: _propTypes2.default.bool, // enable double confirm 
	textCancel: _propTypes2.default.string, // cancel button text
	textConfirm: _propTypes2.default.string, // confirm button text
	onConfirm: _propTypes2.default.func, // triggered when confirmed
	onRequestClose: _propTypes2.default.func // triggered when canceled
};
ConfirmModal.defaultProps = {
	isShow: false,
	textConfirm: 'Confirm',
	textCancel: 'Cancel',
	textDelete: 'DELETE'
};
exports.default = ConfirmModal;