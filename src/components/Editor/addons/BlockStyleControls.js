import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import ControlItem from '../ControlItem';


const BLOCK_TYPES = [
    // {label: 'H1', styleType: 'header-one'},
    {label: 'H2', styleType: 'header-two'},
    // {label: 'H3', styleType: 'header-three'},
    {label: 'H4', styleType: 'header-four'},
    // {label: 'H5', styleType: 'header-five'},
    // {label: 'H6', styleType: 'header-six'},
    // {label: 'Blockquote', styleType: 'blockquote'},
    {label: 'UL', styleType: 'unordered-list-item'},
    {label: 'OL', styleType: 'ordered-list-item'}
    // {label: 'Code Block', styleType: 'code-block'}
];


export default class BlockStyleControls extends Component {
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

        this.props.onToggle( RichUtils.toggleBlockType(editorState, styleType) );
    }

    render() {
        const { editorState } = this.props;

        const selection = editorState.getSelection();
        const currentStyleType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return (
            <div className='BlockStyleControls'>
                {BLOCK_TYPES.map(item =>
                    <ControlItem
                        key={item.label}
                        active={item.styleType === currentStyleType}
                        label={item.label}
                        data-style-type={item.styleType}
                        onClick={this._onClick}
                    />
                )}
            </div>
        );
    }
}