'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _lodash = require('lodash');

var _InputField = require('./InputField.less');

var _InputField2 = _interopRequireDefault(_InputField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Normal input text field
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InputField = function (_PureComponent) {
	_inherits(InputField, _PureComponent);

	function InputField(props) {
		_classCallCheck(this, InputField);

		var _this = _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).call(this));

		_this.state = {
			isFocus: false
		};

		// actions
		_this._onFocus = _this._onFocus.bind(_this);
		_this._onBlur = _this._onBlur.bind(_this);
		return _this;
	}

	_createClass(InputField, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var multiline = this.props.multiline;

			// For textarea only

			if (multiline > 0) {
				this.__inputEl.style.height = '';
				this.__inputEl.style.height = Math.max(this.__inputEl.clientHeight, this.__inputEl.scrollHeight) + 'px';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _classNames,
			    _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    value = _props.value,
			    type = _props.type,
			    name = _props.name,
			    label = _props.label,
			    placeholder = _props.placeholder,
			    theme = _props.theme,
			    icon = _props.icon,
			    hint = _props.hint,
			    disabled = _props.disabled,
			    readOnly = _props.readOnly,
			    inputProps = _props.inputProps,
			    errorText = _props.errorText,
			    multiline = _props.multiline,
			    maxlength = _props.maxlength,
			    onChange = _props.onChange;
			var isFocus = this.state.isFocus;


			var inputPropsObj = (0, _lodash.omitBy)(_extends({}, inputProps, {
				className: 'input',
				value: value || '',
				name: name || '',
				disabled: disabled || null,
				readOnly: readOnly || null,
				rows: multiline || null,
				type: multiline === 0 ? type : null,
				onChange: onChange || null
			}), _lodash.isNull);

			var TagName = multiline > 0 ? 'textarea' : 'input';

			var $input = React.createElement(
				'div',
				{ className: classNames("input-field", className, (_classNames = {}, _defineProperty(_classNames, 'theme-' + theme, theme !== undefined), _defineProperty(_classNames, 'has-hint', errorText || hint || maxlength), _defineProperty(_classNames, '__is-focus', isFocus), _defineProperty(_classNames, '__is-active', value.length !== 0), _defineProperty(_classNames, '__is-error', !(0, _lodash.isEmpty)(errorText) || maxlength && value.length > maxlength), _defineProperty(_classNames, '__is-disabled', disabled || false), _defineProperty(_classNames, '__is-readonly', readOnly || false), _classNames)) },
				label && React.createElement(
					'label',
					{ className: 'input-label' },
					label
				),
				placeholder && React.createElement(
					'div',
					{ className: classNames("input-placeholder", {
							'__is-visible': (isFocus || !label) && value.length === 0
						}) },
					placeholder
				),
				React.createElement(TagName, _extends({}, inputPropsObj, {
					ref: function ref(el) {
						return _this2.__inputEl = el;
					},
					onFocus: this._onFocus,
					onBlur: this._onBlur
				})),
				React.createElement('div', { className: 'input-line' }),
				(errorText || hint) && React.createElement(
					'div',
					{ className: 'input-hint' },
					errorText || hint
				),
				maxlength > 0 && React.createElement(
					'div',
					{ className: 'input-count' },
					value.length,
					' / ',
					maxlength
				),
				children
			);

			if (!icon) {
				return $input;
			}
			// Wrap with 'input-icon wrapper'
			else {
					return React.createElement(
						'div',
						{ className: 'input-icon' },
						React.createElement('i', { className: icon }),
						React.createElement(
							'div',
							{ className: 'input-icon-content' },
							$input
						)
					);
				}
		}
	}, {
		key: '_onFocus',
		value: function _onFocus(e) {
			this.setState({
				isFocus: true
			});

			if (this.props.onFocus) {
				this.props.onFocus(e);
			}
		}
	}, {
		key: '_onBlur',
		value: function _onBlur(e) {
			this.setState({
				isFocus: false
			});

			if (this.props.onBlur) {
				this.props.onBlur(e);
			}
		}
	}]);

	return InputField;
}(_react.PureComponent);

InputField.propTypes = {
	value: PropTypes.string, // input value
	type: PropTypes.string, // input type
	theme: PropTypes.string, // input theme color
	label: PropTypes.string, // input label
	icon: PropTypes.string, // input icon classes
	placeholder: PropTypes.string, // input placeholder text
	hint: PropTypes.string, // input hint
	disabled: PropTypes.bool, // input disabled
	readOnly: PropTypes.bool, // input readonly prop
	inputProps: PropTypes.object, // input props
	maxlength: PropTypes.number, // input max length
	errorText: PropTypes.string, // show error message (doesn't stack with hint)
	multiline: PropTypes.number, // convert to textarea rows if > 0
	onChange: PropTypes.func // onChange event
};
InputField.defaultProps = {
	className: '',
	value: '',
	type: 'text',
	multiline: 0,
	maxlength: 0
};
exports.default = InputField;