'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _lodash = require('lodash');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Modal component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Notification = function (_PureComponent) {
	_inherits(Notification, _PureComponent);

	function Notification(props) {
		_classCallCheck(this, Notification);

		var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

		_this.state = {
			length: 0
		};

		// internal variable
		_this.__items = [];
		_this.__timers = {};
		return _this;
	}

	_createClass(Notification, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			// Create wrapper
			this.__el = document.createElement('div');
			this.__el.className = classNames('Notification');
			document.body.appendChild(this.__el);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// Clear all timers
			(0, _lodash.map)(this.__timers, function (t) {
				return clearTimeout(t);
			});
			// Clear DOM
			document.body.removeChild(this.__el);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.renderItems();
		}
	}, {
		key: 'render',
		value: function render() {
			// Render nothing
			return null;
		}
	}, {
		key: 'renderItems',
		value: function renderItems() {
			var _props = this.props,
			    iconError = _props.iconError,
			    iconSuccess = _props.iconSuccess,
			    iconInfo = _props.iconInfo;


			(0, _reactDom.render)(React.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					className: 'Notification-inner',
					transitionName: "slideUp",
					transitionEnterTimeout: 350,
					transitionLeaveTimeout: 350
				},
				this.__items.map(function (item) {
					var _classNames2;

					return React.createElement(
						'div',
						{ key: item.id, className: classNames("Notification-item", _defineProperty({}, '__' + item.type, item.type)) },
						React.createElement('i', { className: classNames('Notification-icon', (_classNames2 = {}, _defineProperty(_classNames2, iconError, item.type === 'error'), _defineProperty(_classNames2, iconSuccess, item.type === 'success'), _defineProperty(_classNames2, iconInfo, item.type === 'info'), _classNames2)) }),
						React.createElement(
							'p',
							null,
							item.message
						)
					);
				})
			), this.__el);
		}

		// public method
		// Add new notification item

	}, {
		key: 'pushItem',
		value: function pushItem(item) {
			var _this2 = this;

			var id = (0, _lodash.uniqueId)('notification_');
			this.__items.push((0, _lodash.assign)(item, { id: id }));

			// Update state (force re-render)
			this.setState({
				length: this.__items.length
			});

			// Add remove queue
			this.__timers[id] = setTimeout(function () {
				_this2.removeItem(id);
			}, this.props.fadeoutTime);
		}
	}, {
		key: 'removeItem',
		value: function removeItem(id) {
			(0, _lodash.remove)(this.__items, function (item) {
				return item.id === id;
			});

			this.setState({
				length: this.__items.length
			});
		}
	}]);

	return Notification;
}(_react.PureComponent);

Notification.propTypes = {
	fadeoutTime: _propTypes2.default.number,
	iconError: _propTypes2.default.string,
	iconSuccess: _propTypes2.default.string,
	iconInfo: _propTypes2.default.string
};
Notification.defaultProps = {
	fadeoutTime: 3000,
	iconError: 'fa fa-exclamation-circle',
	iconSuccess: 'fa fa-check-circle-o',
	iconInfo: 'fa fa-info-circle'
};
exports.default = Notification;