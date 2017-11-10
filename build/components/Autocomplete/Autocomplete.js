'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _ListItemCore = require('../ListItem/ListItemCore');

var _ListItemCore2 = _interopRequireDefault(_ListItemCore);

var _InputField = require('../Form/InputField');

var _InputField2 = _interopRequireDefault(_InputField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Automcomplete component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Autocomplete = function (_PureComponent) {
    _inherits(Autocomplete, _PureComponent);

    function Autocomplete(props) {
        _classCallCheck(this, Autocomplete);

        var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

        _this.state = {
            input: props.value,
            selectedIndex: -1,
            items: [],
            isLoading: false,
            isShow: false
        };

        // actions
        _this._onChange = _this._onChange.bind(_this);
        _this._onFocus = _this._onFocus.bind(_this);
        _this._onBlur = _this._onBlur.bind(_this);
        _this._onKeyboardPress = _this._onKeyboardPress.bind(_this);
        return _this;
    }

    _createClass(Autocomplete, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // Reset input value
            if (nextProps.value !== this.props.value) {
                this.setState({ input: nextProps.value });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // kindly destroy all events
            this.unbindKeyboardEvent();

            clearTimeout(this.__searchTimer);
            clearTimeout(this.__onBlurTimer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                wrapperClassName = _props.wrapperClassName,
                value = _props.value,
                delay = _props.delay,
                loadItems = _props.loadItems,
                onRender = _props.onRender,
                onSelect = _props.onSelect,
                debugMode = _props.debugMode,
                other = _objectWithoutProperties(_props, ['className', 'wrapperClassName', 'value', 'delay', 'loadItems', 'onRender', 'onSelect', 'debugMode']);

            var input = this.state.input;


            return React.createElement(
                'div',
                { className: classNames("Autocomplete", wrapperClassName) },
                React.createElement(_InputField2.default, _extends({}, other, {
                    className: classNames('Autocomplete-input', className),
                    value: input,
                    onChange: this._onChange,
                    onFocus: this._onFocus,
                    onBlur: this._onBlur
                })),
                this.renderDropdown()
            );
        }
    }, {
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

            if ((0, _lodash.isEmpty)(items)) {
                return;
            }

            return React.createElement(
                'div',
                { className: 'Autocomplete-list' },
                items.map(this.renderDropdownItem.bind(this))
            );
        }
    }, {
        key: 'renderDropdownItem',
        value: function renderDropdownItem(item, index) {
            var selectedIndex = this.state.selectedIndex;


            return React.createElement(
                _ListItemCore2.default,
                {
                    key: index,
                    TagName: 'li',
                    className: classNames("Autocomplete-item", {
                        "__is-active": index === selectedIndex
                    }),
                    onClick: this._onSelect.bind(this, item)
                },
                this.props.onRender(item)
            );
        }

        /**
         * INTERNAL
         */

    }, {
        key: 'bindKeyboardEvent',
        value: function bindKeyboardEvent() {
            // bind key event
            window.addEventListener("keydown", this._onKeyboardPress);
        }
    }, {
        key: 'unbindKeyboardEvent',
        value: function unbindKeyboardEvent() {
            // unbind key event
            window.removeEventListener("keydown", this._onKeyboardPress);
        }
    }, {
        key: 'doSearch',
        value: function doSearch(val) {
            var _this2 = this;

            var _props2 = this.props,
                loadItems = _props2.loadItems,
                delay = _props2.delay;

            // clear previous timer

            clearTimeout(this.__searchTimer);

            if (!loadItems || !val.length) {
                return;
            }

            // trigger search (pause for 1s)
            this.__searchTimer = setTimeout(function () {
                // loadItems must return a promise
                loadItems(val).then(function (results) {
                    return _this2.setState({ isLoading: false, items: results || [] });
                }).catch(function (err) {
                    console.log(err);
                    _this2.setState({ isLoading: false, items: [] });
                });
            }, delay);
        }

        /**
         * EVENTS
         */

    }, {
        key: '_onChange',
        value: function _onChange(e) {
            var val = e.target.value;

            this.setState({
                input: val,
                isShow: val.length ? true : false,
                items: [],
                isLoading: true,
                selectedIndex: -1
            });

            this.doSearch(val);

            // trigger prop onChange
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        }
    }, {
        key: '_onFocus',
        value: function _onFocus(e) {
            this.bindKeyboardEvent();

            // trigger prop onFocus
            if (this.props.onFocus) {
                this.props.onFocus(e);
            }
        }
    }, {
        key: '_onBlur',
        value: function _onBlur(e) {
            var _this3 = this;

            this.unbindKeyboardEvent();

            if (this.props.debugMode) {
                return;
            }

            // @hack - Enable click after lost focus
            clearTimeout(this.__onBlurTimer);
            this.__onBlurTimer = setTimeout(function () {
                _this3.setState({
                    isShow: false,
                    items: []
                });
            }, 200);

            // trigger prop onBlur
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        }
    }, {
        key: '_onSelect',
        value: function _onSelect(item) {
            // clear onBlur timer
            clearTimeout(this.__onBlurTimer);

            this.setState({
                input: item.name,
                isShow: false,
                items: []
            });

            // trigger prop onSelect
            if (this.props.onSelect) {
                this.props.onSelect(item);
            }
        }
    }, {
        key: '_onKeyboardPress',
        value: function _onKeyboardPress(e) {
            var _state2 = this.state,
                isShow = _state2.isShow,
                selectedIndex = _state2.selectedIndex,
                items = _state2.items;


            if (!isShow) {
                return;
            }

            // key - up
            if (e.which === 38 && selectedIndex > -1) {
                this.setState({ selectedIndex: selectedIndex - 1 });
            }
            // key - down
            else if (e.which === 40 && selectedIndex < items.length - 1) {
                    this.setState({ selectedIndex: selectedIndex + 1 });
                }
                // key - enter
                else if (e.which === 13 && selectedIndex > -1 && selectedIndex <= items.length - 1) {
                        this._onSelect(items[selectedIndex]);
                    }
                    // key - esc
                    else if (e.which === 27) {
                            this.setState({ selectedIndex: -1, items: [], isShow: false, isLoading: false });
                        }
        }
    }]);

    return Autocomplete;
}(_react.PureComponent);

Autocomplete.propTypes = {
    value: _propTypes2.default.string, // input value
    wrapperClassName: _propTypes2.default.string, // wrapper className
    className: _propTypes2.default.string, // input className
    delay: _propTypes2.default.number, // pause delay
    loadItems: _propTypes2.default.func, // async load items, must return a promise: func(val)
    onRender: _propTypes2.default.func, // method to render
    onSelect: _propTypes2.default.func, // autocomplete selected
    debugMode: _propTypes2.default.bool // enable debug mode
};
Autocomplete.defaultProps = {
    value: '',
    delay: 500,
    onRender: function onRender(item) {
        return item.name;
    },
    debugMode: false
};
exports.default = Autocomplete;