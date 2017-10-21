'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _lodash = require('lodash');

var _waves = require('../../helpers/waves');

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _style = require('./style.less');

var _style2 = _interopRequireDefault(_style);

var _IconButton = require('./IconButton.less');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Icon Button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var IconButton = function (_PureComponent) {
	_inherits(IconButton, _PureComponent);

	function IconButton(props) {
		_classCallCheck(this, IconButton);

		var _this = _possibleConstructorReturn(this, (IconButton.__proto__ || Object.getPrototypeOf(IconButton)).call(this, props));

		if (props.tooltip) {
			_this.__uniqId = (0, _lodash.uniqueId)('tooltip_');
		}

		// actions
		_this._onClick = _this._onClick.bind(_this);
		_this._onMouseDown = _this._onMouseDown.bind(_this);
		_this._onMouseUp = _this._onMouseUp.bind(_this);
		_this._onMouseOut = _this._onMouseOut.bind(_this);
		return _this;
	}

	_createClass(IconButton, [{
		key: 'render',
		value: function render() {
			var _this2 = this,
			    _classNames;

			var _props = this.props,
			    TagName = _props.TagName,
			    className = _props.className,
			    icon = _props.icon,
			    theme = _props.theme,
			    size = _props.size,
			    tooltip = _props.tooltip,
			    to = _props.to,
			    others = _objectWithoutProperties(_props, ['TagName', 'className', 'icon', 'theme', 'size', 'tooltip', 'to']);

			var props = _extends({}, others, {
				ref: function ref(c) {
					return _this2.el = c;
				},
				className: classNames('btn-icon', className, (_classNames = {}, _defineProperty(_classNames, 'btn-' + size, size), _defineProperty(_classNames, 'btn-' + theme, theme), _classNames)),
				onClick: this._onClick,
				onMouseDown: this._onMouseDown,
				onMouseUp: this._onMouseUp,
				onMouseOut: this._onMouseOut
			});

			var childs = [];

			// Enable effect
			childs.push(React.createElement(_Ripple2.default, {
				key: 'ripple',
				ref: function ref(c) {
					return _this2.rippleEl = c;
				},
				theme: 'default',
				speed: 'fast'
			}));

			// Enable tooltip
			if (tooltip) {
				childs.push(React.createElement(
					_reactTooltip2.default,
					{ id: this.__uniqId, effect: 'solid', key: 'tooltip' },
					tooltip
				));
			}

			// Children
			var inner_props = {
				"data-tip": tooltip ? true : undefined,
				"data-for": this.__uniqId,
				className: icon
			};
			childs.push(React.createElement(
				'div',
				{ className: 'btn-inner', key: 'inner' },
				React.createElement('i', inner_props)
			));

			return React.createElement(
				TagName,
				props,
				childs
			);
		}
	}, {
		key: '_onClick',
		value: function _onClick(e) {
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

			var pos = {
				x: this.el.clientWidth / 2,
				y: this.el.clientHeight / 2
			};
			var scale = this.el.clientHeight / 10;

			this.rippleEl.show(pos, scale);

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

			this.rippleEl.hide();

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

			this.rippleEl.hide();

			if (onMouseOut) {
				onMouseOut(e);
			}
		}
	}]);

	return IconButton;
}(_react.PureComponent);

IconButton.propTypes = {
	TagName: PropTypes.string, // Tagname for button
	theme: PropTypes.string, // button theme
	size: PropTypes.string, // button size
	tooltip: PropTypes.string, // enable tooltip for button
	icon: PropTypes.string // Button icon
};
IconButton.defaultProps = {
	TagName: 'button',
	className: ''
};
exports.default = IconButton;