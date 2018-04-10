import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LinkForm.less';

export default class LinkForm extends Component {
    static propTypes = {
        value     : PropTypes.string,
        onConfirm : PropTypes.func,
        onCancel  : PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            input   : props.value
        };

        // refs
        this.setInputRef = el => this.__inputRef = el;

        this._onChange = this._onChange.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onKeyup = this._onKeyup.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    _onChange(e) {
        this.setState({ input: e.target.value });
    }

    _onBlur() {
        this.__cancelTimer = setTimeout(() => {
            this.props.onCancel();
        }, 100);
    }

    _onKeyup(e) {
        // Enter pressed
        if (e.which === 13) {
            clearTimeout(this.__cancelTimer);
            this.onApply();
        }
    }

    _onClick() {
        clearTimeout(this.__cancelTimer);
        this.onApply();
    }

    render() {
        const { input } = this.state;

        return (
            <div className='LinkForm'>
                <input
                    ref={this.setInputRef}
                    type='text'
                    className='input'
                    placeholder='Insert link here'
                    value={input}
                    onChange={this._onChange}
                    onBlur={this._onBlur}
                    onKeyUp={this._onKeyup}
                    autoFocus={true}
                />

                <button
                    type='button'
                    className='button'
                    onClick={this._onClick}
                >
                    Add
                </button>
            </div>
        );
    }

    // internal
    onApply() {
        // apply filter here
        this.props.onConfirm( this.state.input );
    }
}