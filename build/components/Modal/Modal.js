'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _lodash = require('lodash');

var _styler = require('../../helpers/styler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Modal component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Modal = function (_PureComponent) {
	_inherits(Modal, _PureComponent);

	function Modal() {
		_classCallCheck(this, Modal);

		return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
	}

	_createClass(Modal, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.__closeTimer);
			if (this.__el) {
				(0, _reactDom.unmountComponentAtNode)(this.__el);
				document.body.removeChild(this.__el);
				(0, _styler.removeClass)(document.body, this.props.bodyClassName);
				this.__el = null;
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// Re-render modal
			if (this.__el && this.props.isShow) {
				this.renderModal(this.__el);
			}
			// New modal
			else if (!this.__el && this.props.isShow) {
					this.createModal();
				}
				// Close modal
				else if (this.__el && !this.props.isShow) {
						this.closeModal();
					} else {
						// Do nothing
					}
		}
	}, {
		key: 'render',
		value: function render() {
			// Render nothing
			return null;
		}

		// Internal methods

	}, {
		key: 'renderModal',
		value: function renderModal(el) {
			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    onRequestClose = _props.onRequestClose,
			    name = _props.name,
			    isShow = _props.isShow,
			    closeDelay = _props.closeDelay,
			    onOpen = _props.onOpen,
			    onClose = _props.onClose,
			    bodyClassName = _props.bodyClassName,
			    other = _objectWithoutProperties(_props, ['children', 'className', 'onRequestClose', 'name', 'isShow', 'closeDelay', 'onOpen', 'onClose', 'bodyClassName']);

			(0, _reactDom.render)(React.createElement(
				'div',
				{ className: 'Modal-inner' },
				React.createElement('div', {
					className: 'Modal-overlay',
					onClick: onRequestClose
				}),
				React.createElement(
					'div',
					_extends({}, other, {
						className: classNames("Modal-content", className)
					}),
					children
				)
			), el);

			// Position modal layout
			var contentNode = this.__el.childNodes[0].childNodes[1];
			var y = (el.clientHeight - contentNode.clientHeight) / 2;
			var x = (el.clientWidth - contentNode.clientWidth) / 2;
			contentNode.style.top = Math.max(0, y) + 'px';
			contentNode.style.left = Math.max(0, x) + 'px';
		}

		// open modal

	}, {
		key: 'createModal',
		value: function createModal() {
			// Check isOpened
			if (this.__el) {
				return;
			}

			// Create new DOM
			this.__el = document.createElement('div');
			this.__el.id = this.props.name;
			this.__el.className = classNames(this.props.name);
			document.body.appendChild(this.__el);

			// Ammend body
			(0, _styler.addClass)(document.body, this.props.bodyClassName);

			// Render modal layout
			this.renderModal(this.__el);

			// @hack - refresh CSS cache
			window.getComputedStyle(this.__el).opacity;

			// Show modal
			(0, _styler.addClass)(this.__el, ['is__open']);

			if (this.props.onOpen) {
				this.props.onOpen();
			}
		}
	}, {
		key: 'closeModal',
		value: function closeModal() {
			var _this2 = this;

			var closeDelay = this.props.closeDelay;

			// Check isclosed

			if (!this.__el) {
				return;
			}

			// Close modal
			(0, _styler.removeClass)(this.__el, 'is__open');

			this.__closeTimer = setTimeout(function () {
				if (_this2.__el) {
					(0, _reactDom.unmountComponentAtNode)(_this2.__el);
					document.body.removeChild(_this2.__el);
					(0, _styler.removeClass)(document.body, _this2.props.bodyClassName);
					_this2.__el = null;

					if (_this2.props.onClose) {
						_this2.props.onClose();
					}
				}
			}, closeDelay);
		}
	}]);

	return Modal;
}(_react.PureComponent);

Modal.propTypes = {
	isShow: _propTypes2.default.bool, // visibility of modal
	closeDelay: _propTypes2.default.number, // animation time
	onRequestClose: _propTypes2.default.func, // trigger modal close
	onOpen: _propTypes2.default.func, // trigger when modal opened
	onClose: _propTypes2.default.func // trigger when modal closed
};
Modal.defaultProps = {
	name: 'Modal', // advanced props - Created Modal className
	bodyClassName: 'modal__opened', // advanced props - appended className to body
	isShow: false,
	closeDelay: 350,
	onRequestClose: function onRequestClose() {}
};
exports.default = Modal;