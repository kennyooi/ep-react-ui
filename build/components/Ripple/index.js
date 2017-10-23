'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _waves = require('../../helpers/waves');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Ripple effect 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @ref -> https://github.com/Dogfalo/materialize/blob/master/js/waves.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SPEED = {
	normal: {
		fade_in: 500,
		fade_out: 500
	},
	fast: {
		fade_in: 250,
		fade_out: 250
	},
	slow: {
		fade_in: 1000,
		fade_out: 750
	}
};

var RippleEffect = function (_Component) {
	_inherits(RippleEffect, _Component);

	function RippleEffect() {
		_classCallCheck(this, RippleEffect);

		return _possibleConstructorReturn(this, (RippleEffect.__proto__ || Object.getPrototypeOf(RippleEffect)).apply(this, arguments));
	}

	_createClass(RippleEffect, [{
		key: 'render',
		value: function render() {
			var _classNames,
			    _this2 = this;

			var _props = this.props,
			    theme = _props.theme,
			    speed = _props.speed;


			return React.createElement('div', { className: classNames("ripple", (_classNames = {}, _defineProperty(_classNames, 'ripple-' + theme, theme !== ''), _defineProperty(_classNames, 'ripple-' + speed, Object.keys(SPEED).indexOf(speed) !== -1), _classNames)), ref: function ref(el) {
					return _this2.__el = el;
				} });
		}

		// show ripple effect
		// @pos 	: position of item
		// @scale 	: scale of ripple

	}, {
		key: 'show',
		value: function show(pos, scale) {
			// Create ripple item
			var ripple = document.createElement('div');
			ripple.className = 'ripple-effect';
			this.__el.appendChild(ripple);

			// Set position && data
			var styles = {
				top: pos.y + 'px',
				left: pos.x + 'px'
			};
			ripple.setAttribute('data-hold', Date.now()); // use for fadeout delay
			ripple.className += ' ripple-effect__init';
			ripple.setAttribute('style', (0, _waves.convertStyle)(styles));

			// @hack - refresh style changes
			// ref -> https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
			window.getComputedStyle(ripple).opacity;

			// Scale ripple
			ripple.className = ripple.className.replace('ripple-effect__init', 'ripple-effect__in');
			// styles.transform = `scale(${scale})`;
			styles.transform = 'scale(' + Math.ceil(scale) + ')'; // @fix Chrome sudden black issue
			ripple.setAttribute('style', (0, _waves.convertStyle)(styles));
		}
	}, {
		key: 'hide',
		value: function hide() {
			var _this3 = this;

			var speed = this.props.speed;


			var childs = this.__el.childNodes;

			// Check if have child node
			if (childs.length === 0) {
				return;
			}

			var ripple = childs[childs.length - 1];

			// Check if child already on fade out state
			if (ripple.className.indexOf('ripple-effect__end') !== -1) {
				return;
			}
			ripple.className += ' ripple-effect__end';

			// Check fade out delay
			var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
			var delay = SPEED[speed].fade_in - diff;

			setTimeout(function () {
				ripple.className += ' ripple-effect__out';

				// Remove ripple item
				setTimeout(function () {
					if (ripple && _this3.__el) {
						_this3.__el.removeChild(ripple);
					}
				}, SPEED[speed].fade_out);
			}, delay > 0 ? delay : 0);
		}
	}]);

	return RippleEffect;
}(_react.Component);

RippleEffect.propTypes = {
	theme: PropTypes.string, // type of ripple effect : light*, dark
	speed: PropTypes.string // speed of ripple effect
};
RippleEffect.defaultProps = {
	theme: 'light',
	speed: 'normal'
};
exports.default = RippleEffect;