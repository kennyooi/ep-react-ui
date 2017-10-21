'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _Loader = require('./Loader.less');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_Component) {
	_inherits(Loader, _Component);

	function Loader(props) {
		_classCallCheck(this, Loader);

		var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));

		_this.state = {
			isShow: false
		};
		return _this;
	}

	_createClass(Loader, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.__timer = setTimeout(function () {
				_this2.setState({ isShow: true });
			}, 50);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.__timer);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    text = _props.text,
			    others = _objectWithoutProperties(_props, ['className', 'text']);

			var isShow = this.state.isShow;


			return React.createElement(
				'div',
				_extends({}, others, { className: classNames("Loader", className) }),
				React.createElement(
					'div',
					{ className: 'Loader-content' },
					React.createElement(
						'div',
						{ className: classNames("Loader-spinner", { '__is-stop': !isShow }) },
						React.createElement('i', null),
						React.createElement('i', null),
						React.createElement('i', null),
						React.createElement('i', null),
						React.createElement('i', null)
					),
					text && React.createElement(
						'p',
						{ className: 'loader-text' },
						text
					)
				)
			);
		}
	}]);

	return Loader;
}(_react.Component);

exports.default = Loader;