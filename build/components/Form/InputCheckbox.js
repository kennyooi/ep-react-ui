'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _CheckboxCore = require('./CheckboxCore');

var _CheckboxCore2 = _interopRequireDefault(_CheckboxCore);

var _style = require('./style.less');

var _style2 = _interopRequireDefault(_style);

var _InputCheckbox = require('./InputCheckbox.less');

var _InputCheckbox2 = _interopRequireDefault(_InputCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Normal checkbox input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InputCheckbox = function (_Component) {
	_inherits(InputCheckbox, _Component);

	function InputCheckbox() {
		_classCallCheck(this, InputCheckbox);

		return _possibleConstructorReturn(this, (InputCheckbox.__proto__ || Object.getPrototypeOf(InputCheckbox)).apply(this, arguments));
	}

	_createClass(InputCheckbox, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    others = _objectWithoutProperties(_props, ['children', 'className']);

			return React.createElement(
				_CheckboxCore2.default,
				_extends({}, others, {
					type: 'checkbox',
					className: classNames("input-checkbox", className)
				}),
				children
			);
		}
	}]);

	return InputCheckbox;
}(_react.Component);

InputCheckbox.propTypes = {
	theme: PropTypes.string, // checkbox theme color
	checked: PropTypes.bool, // checkbox checked status
	disabled: PropTypes.bool, // checkbox disabled
	onChange: PropTypes.func // onChange event
};
InputCheckbox.defaultProps = {
	className: '',
	theme: 'default'
};
exports.default = InputCheckbox;