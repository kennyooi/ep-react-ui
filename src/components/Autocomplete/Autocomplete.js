/**
 * Automcomplete component
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import ListItem from '../ListItem/ListItemCore';
import InputField from '../Form/InputField';

import './Autocomplete.less';


export default class Autocomplete extends PureComponent {

    static propTypes = {
        value       : PropTypes.string,     // input value
        wrapperClassName : PropTypes.string,    // wrapper className
        className   : PropTypes.string,     // input className
        delay       : PropTypes.number,     // pause delay
        loadItems   : PropTypes.func,       // async load items, must return a promise: func(val)
        onRender    : PropTypes.func,       // method to render
        onSelect    : PropTypes.func,       // autocomplete selected
        onChange    : PropTypes.func,       // autocomplete selected
        onBlur      : PropTypes.func,       // autocomplete selected
        onFocus     : PropTypes.func,       // autocomplete selected
        debugMode   : PropTypes.bool        // enable debug mode
    };

    static defaultProps = {
        value       : '',
        delay       : 500,
        onRender    : item => item.name,
        debugMode   : false
    };

    constructor(props) {
        super(props);

        this.state = {
            input       : props.value,
            selectedIndex : -1,
            items       : [],
            isLoading   : false,
            isShow      : false
        };

        // actions
        this._onChange = this._onChange.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onKeyboardPress = this._onKeyboardPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // Reset input value
        if (nextProps.value !== this.props.value) {
            this.setState({ input: nextProps.value });
        }
    }

    componentWillUnmount() {
        // kindly destroy all events
        this.unbindKeyboardEvent();

        clearTimeout(this.__searchTimer);
        clearTimeout(this.__onBlurTimer);
    }

    render() {
        /* eslint-disable no-unused-vars */
        const { className, wrapperClassName, value, delay, loadItems, onRender, onSelect, debugMode, ...other } = this.props;
        const { input } = this.state;

        return (
            <div className={classNames('Autocomplete', wrapperClassName)}>
                <InputField
                    {...other}
                    className={classNames('Autocomplete-input', className)}
                    value={input}
                    onChange={this._onChange}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                />

                {this.renderDropdown()}
            </div>
        );
    }

    renderDropdown() {
        const { isShow, items } = this.state;

        // not focus
        if (!isShow) {
            return;
        }

        if (isEmpty(items)) {
            return;
        }

        return (
            <div className="Autocomplete-list">
                {items.map(this.renderDropdownItem.bind(this))}
            </div>
        );
    }

    renderDropdownItem(item, index) {
        const { selectedIndex } = this.state;

        return (
            <ListItem
                key={index}
                TagName='li'
                className={classNames('Autocomplete-item', {
                    '__is-active' : index === selectedIndex
                })}
                onClick={this._onSelect.bind(this, item)}
            >
                {this.props.onRender( item )}
            </ListItem>
        );
    }


    /**
     * INTERNAL
     */
    bindKeyboardEvent() {
        // bind key event
        window.addEventListener('keydown', this._onKeyboardPress);
    }

    unbindKeyboardEvent() {
        // unbind key event
        window.removeEventListener('keydown', this._onKeyboardPress);
    }

    doSearch(val) {
        const { loadItems, delay } = this.props;

        // clear previous timer
        clearTimeout(this.__searchTimer);

        if (!loadItems || !val.length) {
            return;
        }

        // trigger search (pause for 1s)
        this.__searchTimer = setTimeout(() => {
            // loadItems must return a promise
            loadItems( val )
                .then(results => this.setState({ isLoading: false, items: results || [] }))
                .catch(err => {
                    this.setState({ isLoading: false, items: [] });
                });
        }, delay);
    }


    /**
     * EVENTS
     */
    _onChange(e) {
        const val = e.target.value;

        this.setState({
            input   : val,
            isShow  : val.length ? true : false,
            items   : [],
            isLoading : true,
            selectedIndex: -1
        });

        this.doSearch( val );

        // trigger prop onChange
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    _onFocus(e) {
        this.bindKeyboardEvent();

        // trigger prop onFocus
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    _onBlur(e) {
        this.unbindKeyboardEvent();

        if (this.props.debugMode) {
            return;
        }

        // @hack - Enable click after lost focus
        clearTimeout(this.__onBlurTimer);
        this.__onBlurTimer = setTimeout(() => {
            this.setState({
                isShow  : false,
                items   : []
            });
        }, 200);

        // trigger prop onBlur
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    _onSelect(item) {
        // clear onBlur timer
        clearTimeout(this.__onBlurTimer);

        this.setState({
            input   : item.name,
            isShow  : false,
            items   : []
        });

        // trigger prop onSelect
        if (this.props.onSelect) {
            this.props.onSelect( item );
        }
    }

    _onKeyboardPress(e) {
        const { isShow, selectedIndex, items } = this.state;

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
            this._onSelect(items[ selectedIndex ]);
        }
        // key - esc
        else if (e.which === 27) {
            this.setState({ selectedIndex: -1, items: [], isShow: false, isLoading: false });
        }
    }
}