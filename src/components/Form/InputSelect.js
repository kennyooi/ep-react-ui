/**
 * Normal input text field
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omitBy, isNull } from 'lodash';

import './InputSelect.less';


export default class InputSelect extends PureComponent {

    static propTypes = {
        value       : PropTypes.oneOfType([ // input value
            PropTypes.string,
            PropTypes.number
        ]),
        theme       : PropTypes.string,     // input theme color
        name        : PropTypes.string,     // input name
        label       : PropTypes.string,     // input label
        placeholder : PropTypes.string,     // input placeholder text
        hint        : PropTypes.string,     // input hint
        disabled    : PropTypes.bool,       // input disabled
        readOnly    : PropTypes.bool,       // input readOnly
        inputProps  : PropTypes.object,     // input props
        errorText   : PropTypes.string,     // show error message (doesn't stack with hint)
        onChange    : PropTypes.func        // onChange event
    };

    static defaultProps = {
        className   : '',
        value       : ''
    };

    constructor(props) {
        super(props);

        this.state = {
            isFocus     : false
        };

        // actions
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    render() {
        const { children, className, value, name, theme, label, hint, disabled, readOnly, inputProps, errorText, onChange } = this.props;
        const { isFocus } = this.state;

        const inputPropsObj = omitBy({
            ...inputProps,
            className   : 'input',
            value       : value || '',
            name        : name || null,
            disabled    : disabled || null,
            onChange    : onChange || null
        }, isNull);

        return (
            <div className={classNames('input-field input-field-select', className, {
                [`theme-${theme}`]  : theme !== undefined,
                'has-hint'          : errorText || hint,
                '__is-focus'        : isFocus,
                '__is-active'       : value.length !== 0,
                '__is-error'        : errorText !== undefined,
                '__is-disabled'     : disabled || false,
                '__is-readonly'     : readOnly || false
            })}>
                {label &&
                    <label className='input-label'>{label}</label>
                }
                <select
                    {...inputPropsObj}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                >
                    {children}
                </select>
                <div className='input-line'></div>
                {(errorText || hint) &&
                    <div className='input-hint'>{errorText || hint}</div>
                }

                <i className='input-icon-caret'>▼</i>
            </div>
        );
    }

    _onFocus() {
        this.setState({
            isFocus     : true
        });
    }

    _onBlur() {
        this.setState({
            isFocus     : false
        });
    }
}