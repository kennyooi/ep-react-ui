'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerModalYear = function (_Component) {
	_inherits(PickerModalYear, _Component);

	function PickerModalYear(props) {
		_classCallCheck(this, PickerModalYear);

		// actions
		var _this = _possibleConstructorReturn(this, (PickerModalYear.__proto__ || Object.getPrototypeOf(PickerModalYear)).call(this, props));

		_this._onSelect = _this._onSelect.bind(_this);
		return _this;
	}

	_createClass(PickerModalYear, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.doSetScrollTop();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.doSetScrollTop();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var yearsGap = this.props.yearsGap;


			var currentYear = parseInt((0, _moment2.default)().format('YYYY'));

			// start loop
			var startYear = currentYear - yearsGap;
			var childs = [];
			while (currentYear + yearsGap >= startYear) {
				childs.push(this.renderItem(startYear));
				startYear++;
			}

			return React.createElement(
				'div',
				{ className: 'PickerModalYear', ref: function ref(el) {
						return _this2.__el = el;
					} },
				childs
			);
		}
	}, {
		key: 'renderItem',
		value: function renderItem(year) {
			var _props = this.props,
			    momentValue = _props.momentValue,
			    min = _props.min,
			    max = _props.max;


			var classNameArr = [];
			// selected
			if (year === parseInt(momentValue.format('YYYY'))) {
				classNameArr.push('__is-select');
			}
			// min & max
			if (min && parseInt(min.format('YYYY')) > year) {
				classNameArr.push('__is-disabled');
			} else if (max && parseInt(max.format('YYYY')) < year) {
				classNameArr.push('__is-disabled');
			}

			return React.createElement(
				'div',
				{ key: year,
					id: 'year_' + year,
					className: classNames('PickerModalYear-item', classNameArr) },
				classNameArr.indexOf('__is-disabled') !== -1 && React.createElement(
					'span',
					null,
					year
				),
				classNameArr.indexOf('__is-disabled') === -1 && React.createElement(
					'a',
					{ href: '#',
						'data-year': year,
						onClick: this._onSelect },
					year
				)
			);
		}

		//actions

	}, {
		key: '_onSelect',
		value: function _onSelect(e) {
			e.preventDefault();

			var _props2 = this.props,
			    momentValue = _props2.momentValue,
			    min = _props2.min,
			    max = _props2.max;

			// new moment date

			var newDate = (0, _moment2.default)(momentValue).year(e.currentTarget.dataset.year);

			// Check min & max date allowed
			if (min && newDate.isBefore(min)) {
				newDate = (0, _moment2.default)(min);
			} else if (max && newDate.isAfter(max)) {
				newDate = (0, _moment2.default)(max);
			}

			if (this.props.onChange) {
				this.props.onChange(newDate);
			}
		}

		// internal

	}, {
		key: 'doSetScrollTop',
		value: function doSetScrollTop() {
			var momentValue = this.props.momentValue;


			var selectedEl = document.getElementById('year_' + momentValue.format('YYYY'));
			this.__el.scrollTop = selectedEl.offsetTop - (this.__el.clientHeight - selectedEl.clientHeight) / 2;
		}
	}]);

	return PickerModalYear;
}(_react.Component);

PickerModalYear.propTypes = {
	momentValue: PropTypes.object, // current picker moment object
	min: PropTypes.object, // min date value, moment default format
	max: PropTypes.object, // max date value, moment default format
	yearsGap: PropTypes.number, // years gap from this year 
	onChange: PropTypes.func // when calendar date changed
};
PickerModalYear.defaultProps = {
	yearsGap: 5
};
exports.default = PickerModalYear;