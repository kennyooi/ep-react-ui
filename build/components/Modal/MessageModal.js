'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _lodash = require('lodash');

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _IconButton = require('../Button/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Message Modal (using Modal)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MessageModal = function (_Component) {
	_inherits(MessageModal, _Component);

	function MessageModal(props) {
		_classCallCheck(this, MessageModal);

		var _this = _possibleConstructorReturn(this, (MessageModal.__proto__ || Object.getPrototypeOf(MessageModal)).call(this, props));

		_this._onClose = _this._onClose.bind(_this);
		return _this;
	}

	_createClass(MessageModal, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    type = _props.type,
			    icon = _props.icon,
			    onClose = _props.onClose,
			    disableClose = _props.disableClose,
			    others = _objectWithoutProperties(_props, ['className', 'type', 'icon', 'onClose', 'disableClose']);

			return React.createElement(
				_Modal2.default,
				_extends({}, others, {
					style: {
						width: '350px'
					},
					className: classNames("MessageModal", className),
					onRequestClose: this._onClose
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
			    type = _props2.type,
			    icon = _props2.icon;


			if (!isShow) {
				return null;
			}

			return React.createElement(
				'div',
				{ className: 'MessageModal-content' },
				React.createElement(
					'div',
					{ className: classNames("Modal-cover", _defineProperty({}, '__' + type, type)) },
					icon && React.createElement('i', { className: classNames('Modal-cover-icon', icon) })
				),
				React.createElement(
					'div',
					{ className: 'Modal-body' },
					children
				)
			);
		}
	}, {
		key: '_onClose',
		value: function _onClose() {
			if (!this.props.disableClose && this.props.onClose) {
				this.props.onClose();
			}
		}
	}]);

	return MessageModal;
}(_react.Component);

MessageModal.propTypes = {
	isShow: PropTypes.bool, // Modal show status
	type: PropTypes.string, // Modal type, 'success', 'error', 'info'
	icon: PropTypes.string, // Modal header icon
	disableClose: PropTypes.bool, // disable close
	onClose: PropTypes.func // triggered when modal closed
};
MessageModal.defaultProps = {
	isShow: false,
	type: 'success',
	disableClose: false
};
exports.default = MessageModal;