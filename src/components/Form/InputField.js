/**
 * Normal input text field
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omitBy, isNull, isEmpty } from 'lodash';

import './InputField.less';

export default class InputField extends PureComponent {

    static propTypes = {
        value       : PropTypes.string,     // input value
        type        : PropTypes.string,     // input type
        theme       : PropTypes.string,     // input theme color
        name       : PropTypes.string,      // input name
        label       : PropTypes.string,     // input label
        icon        : PropTypes.string,     // input icon classes
        placeholder : PropTypes.string,     // input placeholder text
        hint        : PropTypes.string,     // input hint
        disabled    : PropTypes.bool,       // input disabled
        readOnly    : PropTypes.bool,       // input readonly prop
        inputProps  : PropTypes.object,     // input props
        maxlength   : PropTypes.number,     // input max length
        errorText   : PropTypes.string,     // show error message (doesn't stack with hint)
        multiline   : PropTypes.number,     // convert to textarea rows if > 0
        onChange    : PropTypes.func        // onChange event
    };

    static defaultProps = {
        className   : '',
        value       : '',
        type        : 'text',
        multiline   : 0,
        maxlength   : 0
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

    componentDidUpdate() {
        const { multiline } = this.props;

        // For textarea only
        if (multiline > 0) {
            this.__inputEl.style.height = '';
            this.__inputEl.style.height = `${Math.max(this.__inputEl.clientHeight, this.__inputEl.scrollHeight)}px`;
        }
    }

    render() {
        const { children, className, value, type, name, label, placeholder, theme, icon, hint, disabled, readOnly, inputProps, errorText, multiline, maxlength, onChange } = this.props;
        const { isFocus } = this.state;

        const inputPropsObj = omitBy({
            ...inputProps,
            className   : 'input',
            value       : value || '',
            name        : name || '',
            disabled    : disabled || null,
            readOnly    : readOnly || null,
            rows        : multiline || null,
            type        : multiline === 0 ? type : null,
            onChange    : onChange || null
        }, isNull);

        const TagName = multiline > 0 ? 'textarea' : 'input';

        const $input = (
            <div className={classNames('input-field', className, {
                [`theme-${theme}`]  : theme !== undefined,
                'has-hint'          : errorText || hint || maxlength,
                '__is-focus'        : isFocus,
                '__is-active'       : value.length !== 0,
                '__is-error'        : !isEmpty(errorText) || (maxlength && value.length > maxlength),
                '__is-disabled'     : disabled || false,
                '__is-readonly'     : readOnly || false
            })}>
                {label &&
                    <label className='input-label'>{label}</label>
                }
                {placeholder &&
                    <div className={classNames('input-placeholder', {
                        '__is-visible'  : (isFocus || !label) && value.length === 0
                    })}>{placeholder}</div>
                }
                <TagName
                    {...inputPropsObj}
                    ref={el => this.__inputEl = el}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                />
                <div className='input-line'></div>
                {(errorText || hint) &&
                    <div className='input-hint'>{errorText || hint}</div>
                }
                {maxlength > 0 &&
                    <div className='input-count'>
                        {value.length} / {maxlength}
                    </div>
                }

                {children}
            </div>
        );

        if (!icon) {
            return $input;
        }
        // Wrap with 'input-icon wrapper'
        else {
            return (
                <div className='input-icon'>
                    <i className={icon}></i>
                    <div className='input-icon-content'>{$input}</div>
                </div>
            );
        }
    }

    _onFocus(e) {
        this.setState({
            isFocus     : true
        });

        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    _onBlur(e) {
        this.setState({
            isFocus     : false
        });

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }
}