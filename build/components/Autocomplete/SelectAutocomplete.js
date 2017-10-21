'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _lodash = require('lodash');

var _Autocomplete2 = require('./Autocomplete');

var _Autocomplete3 = _interopRequireDefault(_Autocomplete2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Select Automcomplete component (extends Autocomplete)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SelectAutocomplete = function (_Autocomplete) {
    _inherits(SelectAutocomplete, _Autocomplete);

    function SelectAutocomplete() {
        _classCallCheck(this, SelectAutocomplete);

        return _possibleConstructorReturn(this, (SelectAutocomplete.__proto__ || Object.getPrototypeOf(SelectAutocomplete)).apply(this, arguments));
    }

    _createClass(SelectAutocomplete, [{
        key: 'renderDropdown',
        value: function renderDropdown() {
            var _state = this.state,
                isShow = _state.isShow,
                isLoading = _state.isLoading,
                items = _state.items;

            // not focus

            if (!isShow) {
                return;
            }

            // loading state
            var content = '';
            if (isLoading) {
                content = React.createElement(
                    'li',
                    { className: 'Autocomplete-item __is-loading' },
                    'Loading ...'
                );
            }
            // empty state
            else if ((0, _lodash.isEmpty)(items)) {
                    content = React.createElement(
                        'li',
                        { className: 'Autocomplete-item __is-empty' },
                        'No result'
                    );
                }
                // items state
                else {
                        content = items.map(this.renderDropdownItem.bind(this));
                    }

            return React.createElement(
                'div',
                { className: 'Autocomplete-list' },
                content
            );
        }
    }]);

    return SelectAutocomplete;
}(_Autocomplete3.default);

exports.default = SelectAutocomplete;