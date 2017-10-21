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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItemCore = function (_Component) {
	_inherits(ListItemCore, _Component);

	function ListItemCore(props) {
		_classCallCheck(this, ListItemCore);

		// actions
		var _this = _possibleConstructorReturn(this, (ListItemCore.__proto__ || Object.getPrototypeOf(ListItemCore)).call(this, props));

		_this._onMouseDown = _this._onMouseDown.bind(_this);
		_this._onMouseUp = _this._onMouseUp.bind(_this);
		_this._onMouseOut = _this._onMouseOut.bind(_this);
		return _this;
	}

	_createClass(ListItemCore, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    TagName = _props.TagName,
			    className = _props.className,
			    speed = _props.speed,
			    theme = _props.theme,
			    others = _objectWithoutProperties(_props, ['children', 'TagName', 'className', 'speed', 'theme']);

			return React.createElement(
				TagName,
				_extends({}, others, {
					className: classNames('ripple-list-item', className),
					onMouseDown: this._onMouseDown,
					onMouseUp: this._onMouseUp,
					onMouseOut: this._onMouseOut
				}),
				children,
				React.createElement(_Ripple2.default, {
					ref: function ref(el) {
						return _this2.__rippleEl = el;
					},
					theme: theme,
					speed: speed
				})
			);
		}

		// Internal methods

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

		// Events handler

	}, {
		key: '_onMouseDown',
		value: function _onMouseDown(e) {
			var disabled = this.props.disabled;

			// Check button disabled

			if (disabled) {
				return;
			}

			var el = _reactDom2.default.findDOMNode(this.__rippleEl);
			var pos = this.getPosition(el, e);

			var maxWidth = el.getBoundingClientRect().width;
			// 10 = default ripple-item size 10px * 10px
			// 2  = for scaling from center need multiply by 2
			// 0.1 = offset fix for radius cut
			// calculate needed maximum width only, not need full width
			var width = Math.max(Math.abs(maxWidth - pos.x), pos.x);
			var scale = width / 10 * (2 + 0.1);

			this.__rippleEl.show(pos, scale);

			if (this.props.onMouseDown) {
				this.props.onMouseDown(e);
			}
		}
	}, {
		key: '_onMouseUp',
		value: function _onMouseUp(e) {
			this.__rippleEl.hide();

			if (this.props.onMouseUp) {
				this.props.onMouseUp(e);
			}
		}
	}, {
		key: '_onMouseOut',
		value: function _onMouseOut(e) {
			this.__rippleEl.hide();

			if (this.props.onMouseOut) {
				this.props.onMouseOut(e);
			}
		}
	}]);

	return ListItemCore;
}(_react.Component);

ListItemCore.propTypes = {
	TagName: PropTypes.string // element tag-name 
};
ListItemCore.defaultProps = {
	TagName: 'div',
	className: '',
	speed: 'slow',
	theme: 'default'
};
exports.default = ListItemCore;