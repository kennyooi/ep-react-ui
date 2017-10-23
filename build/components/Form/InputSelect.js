'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Normal input text field
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InputSelect = function (_PureComponent) {
	_inherits(InputSelect, _PureComponent);

	function InputSelect(props) {
		_classCallCheck(this, InputSelect);

		var _this = _possibleConstructorReturn(this, (InputSelect.__proto__ || Object.getPrototypeOf(InputSelect)).call(this));

		_this.state = {
			isFocus: false
		};

		// actions
		_this._onFocus = _this._onFocus.bind(_this);
		_this._onBlur = _this._onBlur.bind(_this);
		return _this;
	}

	_createClass(InputSelect, [{
		key: 'render',
		value: function render() {
			var _classNames;

			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    value = _props.value,
			    name = _props.name,
			    theme = _props.theme,
			    label = _props.label,
			    placeholder = _props.placeholder,
			    hint = _props.hint,
			    disabled = _props.disabled,
			    readOnly = _props.readOnly,
			    inputProps = _props.inputProps,
			    errorText = _props.errorText,
			    onChange = _props.onChange;
			var isFocus = this.state.isFocus;


			var inputPropsObj = (0, _lodash.omitBy)(_extends({}, inputProps, {
				className: 'input',
				value: value || '',
				name: name || null,
				disabled: disabled || null,
				onChange: onChange || null
			}), _lodash.isNull);

			return React.createElement(
				'div',
				{ className: classNames("input-field input-field-select", className, (_classNames = {}, _defineProperty(_classNames, 'theme-' + theme, theme !== undefined), _defineProperty(_classNames, 'has-hint', errorText || hint), _defineProperty(_classNames, '__is-focus', isFocus), _defineProperty(_classNames, '__is-active', value.length !== 0), _defineProperty(_classNames, '__is-error', errorText !== undefined), _defineProperty(_classNames, '__is-disabled', disabled || false), _defineProperty(_classNames, '__is-readonly', readOnly || false), _classNames)) },
				label && React.createElement(
					'label',
					{ className: 'input-label' },
					label
				),
				React.createElement(
					'select',
					_extends({}, inputPropsObj, {
						onFocus: this._onFocus,
						onBlur: this._onBlur
					}),
					children
				),
				React.createElement('div', { className: 'input-line' }),
				(errorText || hint) && React.createElement(
					'div',
					{ className: 'input-hint' },
					errorText || hint
				),
				React.createElement(
					'i',
					{ className: 'input-icon-caret' },
					'\u25BC'
				)
			);
		}
	}, {
		key: '_onFocus',
		value: function _onFocus(e) {
			this.setState({
				isFocus: true
			});
		}
	}, {
		key: '_onBlur',
		value: function _onBlur(e) {
			this.setState({
				isFocus: false
			});
		}
	}]);

	return InputSelect;
}(_react.PureComponent);

InputSelect.propTypes = {
	value: PropTypes.oneOfType([// input value
	PropTypes.string, PropTypes.number]),
	theme: PropTypes.string, // input theme color
	label: PropTypes.string, // input label
	placeholder: PropTypes.string, // input placeholder text
	hint: PropTypes.string, // input hint
	disabled: PropTypes.bool, // input disabled
	inputProps: PropTypes.object, // input props
	errorText: PropTypes.string, // show error message (doesn't stack with hint)
	onChange: PropTypes.func // onChange event
};
InputSelect.defaultProps = {
	className: '',
	value: ''
};
exports.default = InputSelect;