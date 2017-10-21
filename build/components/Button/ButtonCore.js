'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _waves = require('../../helpers/waves');

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Enhanced button components (internal use)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ButtonCore = function (_PureComponent) {
	_inherits(ButtonCore, _PureComponent);

	function ButtonCore(props) {
		_classCallCheck(this, ButtonCore);

		// actions
		var _this = _possibleConstructorReturn(this, (ButtonCore.__proto__ || Object.getPrototypeOf(ButtonCore)).call(this, props));

		_this._onClick = _this._onClick.bind(_this);
		_this._onMouseDown = _this._onMouseDown.bind(_this);
		_this._onMouseUp = _this._onMouseUp.bind(_this);
		_this._onMouseOut = _this._onMouseOut.bind(_this);
		return _this;
	}

	_createClass(ButtonCore, [{
		key: 'render',
		value: function render() {
			var _classNames,
			    _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    TagName = _props.TagName,
			    className = _props.className,
			    theme = _props.theme,
			    size = _props.size,
			    rippleTheme = _props.rippleTheme,
			    others = _objectWithoutProperties(_props, ['children', 'TagName', 'className', 'theme', 'size', 'rippleTheme']);

			var props = _extends({}, others, {
				className: classNames(className, (_classNames = {}, _defineProperty(_classNames, 'btn-' + theme, theme), _defineProperty(_classNames, 'btn-' + size, size), _classNames)),
				onClick: this._onClick,
				onMouseDown: this._onMouseDown,
				onMouseUp: this._onMouseUp,
				onMouseOut: this._onMouseOut
			});

			var childs = [];
			childs.push(React.createElement(_Ripple2.default, {
				key: 'ripple',
				ref: function ref(el) {
					return _this2.__rippleEl = el;
				},
				theme: rippleTheme,
				speed: 'slow'
			}));
			childs.push(React.createElement(
				'div',
				{ className: 'btn-inner', key: 'inner' },
				children
			));

			return React.createElement(
				TagName,
				props,
				childs
			);
		}
	}, {
		key: 'getPosition',
		value: function getPosition(el, e) {
			var pos = (0, _waves.offset)(el);

			var relativeY = e.pageY - pos.top;
			var relativeX = e.pageX - pos.left;

			// Support for touch devices
			if ('touches' in e) {
				relativeY = e.touches[0].pageY - pos.top;
				relativeX = e.touches[0].pageX - pos.left;
			}

			return {
				x: relativeX,
				y: relativeY
			};
		}
	}, {
		key: '_onClick',
		value: function _onClick(e) {
			var disabled = this.props.disabled;

			// Check button disabled

			if (disabled) {
				return;
			}

			if (this.props.onClick) {
				this.props.onClick(e);
			}
		}
	}, {
		key: '_onMouseDown',
		value: function _onMouseDown(e) {
			var _props2 = this.props,
			    onMouseDown = _props2.onMouseDown,
			    disabled = _props2.disabled;

			// Check button disabled

			if (disabled) {
				return;
			}

			var el = _reactDom2.default.findDOMNode(this.__rippleEl);
			var pos = this.getPosition(el, e);
			// @refs -> http://stackoverflow.com/questions/35493942/get-react-refs-dom-node-width-after-render-and-trigger-a-re-render-only-if-width
			// const el = e.target;
			// const scale = (el.clientWidth / 100) * 10;
			// const scale = (el.getBoundingClientRect().width / 100) * 10;

			var maxWidth = el.getBoundingClientRect().width;
			var maxHeight = el.getBoundingClientRect().height;
			// 10 = default ripple-item size 10px * 10px
			// 2  = for scaling from center need multiply by 2
			// 0.1 = offset fix for radius cut
			// calculate needed maximum width/height only, not need full width
			var width = Math.max(Math.abs(maxWidth - pos.x), pos.x);
			var height = Math.max(Math.abs(maxHeight - pos.y), pos.y);
			var scale = Math.max(width, height) / 10 * (2 + 0.1);

			this.__rippleEl.show(pos, scale);

			if (onMouseDown) {
				onMouseDown(e);
			}
		}
	}, {
		key: '_onMouseUp',
		value: function _onMouseUp(e) {
			var _props3 = this.props,
			    onMouseUp = _props3.onMouseUp,
			    disabled = _props3.disabled;

			// Check button disabled

			if (disabled) {
				return;
			}

			this.__rippleEl.hide();

			if (onMouseUp) {
				onMouseUp(e);
			}
		}
	}, {
		key: '_onMouseOut',
		value: function _onMouseOut(e) {
			var _props4 = this.props,
			    onMouseOut = _props4.onMouseOut,
			    disabled = _props4.disabled;

			// Check button disabled

			if (disabled) {
				return;
			}

			this.__rippleEl.hide();

			if (onMouseOut) {
				onMouseOut(e);
			}
		}
	}]);

	return ButtonCore;
}(_react.PureComponent);

ButtonCore.propTypes = {
	TagName: PropTypes.string, // button tag
	theme: PropTypes.string, // button color
	size: PropTypes.string, // button size
	rippleTheme: PropTypes.string // ripple theme
};
ButtonCore.defaultProps = {
	TagName: 'button',
	className: 'btn',
	theme: 'default'
};
exports.default = ButtonCore;