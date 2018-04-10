import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import ControlItem from '../ControlItem';


const INLINE_TYPES = [
    {label: 'Bold', styleType: 'BOLD'},
    {label: 'Italic', styleType: 'ITALIC'},
    {label: 'Underline', styleType: 'UNDERLINE'}
    // {label: 'Monospace', styleType: 'CODE'}
];


export default class InlineStyleControls extends Component {
    static propTypes = {
        editorState : PropTypes.object,
        onToggle    : PropTypes.func
    };

    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
    }

    _onClick(e) {
        e.preventDefault();

        const { editorState } = this.props;
        const { styleType } = e.target.dataset;

        this.props.onToggle( RichUtils.toggleInlineStyle(editorState, styleType) );
    }

    render() {
        const { editorState } = this.props;
        const currentStyle = editorState.getCurrentInlineStyle();

        return (
            <div className='InlineStyleControls'>
                {INLINE_TYPES.map(item =>
                    <ControlItem
                        key={item.label}
                        active={currentStyle.has(item.styleType)}
                        label={item.label}
                        data-style-type={item.styleType}
                        onClick={this._onClick}
                    />
                )}
            </div>
        );
    }
}