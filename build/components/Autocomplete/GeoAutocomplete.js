'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SelectAutocomplete = require('./SelectAutocomplete');

var _SelectAutocomplete2 = _interopRequireDefault(_SelectAutocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Geo location Autocomplete (using SelectAutocomplete) 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var GeoAutocomplete = function (_Component) {
	_inherits(GeoAutocomplete, _Component);

	function GeoAutocomplete(props) {
		_classCallCheck(this, GeoAutocomplete);

		// actions
		var _this = _possibleConstructorReturn(this, (GeoAutocomplete.__proto__ || Object.getPrototypeOf(GeoAutocomplete)).call(this, props));

		_this._onLoadItems = _this._onLoadItems.bind(_this);
		_this._onSelect = _this._onSelect.bind(_this);
		return _this;
	}

	// @ref => https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService


	_createClass(GeoAutocomplete, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    other = _objectWithoutProperties(_props, ['className']);

			return React.createElement(_SelectAutocomplete2.default, _extends({}, other, {
				className: classNames('GeoAutocomplete', className),
				loadItems: this._onLoadItems,
				onRender: this._onRender,
				onSelect: this._onSelect
			}));
		}

		/**
   * Internal
   */

	}, {
		key: 'doAutocompleteService',
		value: function doAutocompleteService(val) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				if (!_this2.__acService) {
					_this2.__acService = new google.maps.places.AutocompleteService();
				}

				// this.__acService.getQueryPredictions({ 
				_this2.__acService.getPlacePredictions(Object.assign(_this2.props.acOptions, { input: val }), function (results, status) {
					// success -> resolve
					if (status === google.maps.places.PlacesServiceStatus.OK) {
						resolve(results.map(function (obj) {
							return {
								id: obj.place_id,
								name: obj.structured_formatting.main_text,
								sub: obj.structured_formatting.secondary_text || ''
							};
						}));
					}
					// error -> reject
					else {
							reject();
						}
				});
			});
		}
	}, {
		key: 'doPlaceService',
		value: function doPlaceService(place_id) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				if (!_this3.__placeService) {
					// as Google place service require map DOM, hence simply inject empty div on body
					var tempMap = document.createElement('span');
					_this3.__placeService = new google.maps.places.PlacesService(tempMap);
				}

				_this3.__placeService.getDetails({ placeId: place_id }, function (result, status) {
					// success -> resolve
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						resolve(result);
					}
					// error -> reject
					else {
							reject();
						}
				});
			});
		}

		// actions

	}, {
		key: '_onLoadItems',
		value: function _onLoadItems(keyword) {
			return this.doAutocompleteService(keyword);
		}
	}, {
		key: '_onRender',
		value: function _onRender(item) {
			return React.createElement(
				'div',
				{ className: 'GeoAutocomplete-item' },
				React.createElement(
					'strong',
					null,
					item.name
				),
				React.createElement(
					'small',
					null,
					item.sub
				)
			);
		}
	}, {
		key: '_onSelect',
		value: function _onSelect(item) {
			var onSelect = this.props.onSelect;


			return this.doPlaceService(item.id).then(function (resp) {
				return onSelect ? onSelect(resp) : resp;
			});
		}
	}]);

	return GeoAutocomplete;
}(_react.Component);

GeoAutocomplete.propTypes = {
	acOptions: _propTypes2.default.object
};
GeoAutocomplete.defaultProps = {
	acOptions: {}
};
exports.default = GeoAutocomplete;