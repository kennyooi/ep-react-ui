'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _style = require('./style.less');

var _style2 = _interopRequireDefault(_style);

var _InputToggle = require('./InputToggle.less');

var _InputToggle2 = _interopRequireDefault(_InputToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Normal toggle input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InputToggle = function (_PureComponent) {
	_inherits(InputToggle, _PureComponent);

	function InputToggle(props) {
		_classCallCheck(this, InputToggle);

		// actions
		var _this = _possibleConstructorReturn(this, (InputToggle.__proto__ || Object.getPrototypeOf(InputToggle)).call(this, props));

		_this._onMouseDown = _this._onMouseDown.bind(_this);
		_this._onMouseUp = _this._onMouseUp.bind(_this);
		return _this;
	}

	_createClass(InputToggle, [{
		key: 'render',
		value: function render() {
			var _classNames,
			    _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    checked = _props.checked,
			    disabled = _props.disabled,
			    theme = _props.theme,
			    others = _objectWithoutProperties(_props, ['children', 'className', 'checked', 'disabled', 'theme']);

			var inputProps = _extends({
				type: 'checkbox',
				checked: checked ? "checked" : "",
				disabled: disabled
			}, others);

			return React.createElement(
				'label',
				{
					className: classNames('input-toggle', className, (_classNames = {}, _defineProperty(_classNames, 'theme-' + theme, theme !== ""), _defineProperty(_classNames, 'input__checked', checked), _defineProperty(_classNames, 'input__disabled', disabled), _classNames)),
					onMouseDown: this._onMouseDown,
					onMouseUp: this._onMouseUp,
					onMouseOut: this._onMouseUp
				},
				React.createElement('input', inputProps),
				children && React.createElement(
					'div',
					{ className: 'input-label' },
					children
				),
				React.createElement(
					'div',
					{ className: 'input-toggle-lever' },
					React.createElement(
						'div',
						{ className: 'input-toggle-lever-btn', ref: 'leverBtn' },
						React.createElement(_Ripple2.default, {
							ref: function ref(el) {
								return _this2.__rippleEl = el;
							},
							theme: checked ? theme : 'default',
							speed: 'fast'
						})
					)
				)
			);
		}
	}, {
		key: '_onMouseDown',
		value: function _onMouseDown(e) {
			var disabled = this.props.disabled;

			// Check disabled

			if (disabled) {
				return;
			}

			var pos = {
				x: this.refs.leverBtn.clientWidth / 2,
				y: this.refs.leverBtn.clientHeight / 2
			};
			var scale = this.refs.leverBtn.clientWidth / 10 * 2;

			this.__rippleEl.show(pos, scale);
		}
	}, {
		key: '_onMouseUp',
		value: function _onMouseUp(e) {
			var disabled = this.props.disabled;

			// Check disabled

			if (disabled) {
				return;
			}

			this.__rippleEl.hide();
		}
	}]);

	return InputToggle;
}(_react.PureComponent);

InputToggle.propTypes = {
	theme: PropTypes.string, // checkbox theme color
	checked: PropTypes.bool, // checkbox checked status
	disabled: PropTypes.bool, // checkbox disabled
	onChange: PropTypes.func // onChange event
};
InputToggle.defaultProps = {
	className: '',
	theme: 'default'
};
exports.default = InputToggle;