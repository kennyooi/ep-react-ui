/**
 * Date picker input
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import ControlItem from '../../ControlItem';
import LinkForm from './LinkForm';


export default class LinkControl extends PureComponent {

    static propTypes = {
        editorState : PropTypes.object,
        onToggle    : PropTypes.func
    };

    state = {
        isShow : false,
        value  : ''
    };

    constructor(props) {
        super(props);

        // actions
        this._onToggle = this._onToggle.bind(this);
        this._onConfirm = this._onConfirm.bind(this);
    }

    _onToggle() {
        // show popup
        if (!this.state.isShow) {
            this.onShow();
        }
        // hide popup
        else {
            this.onHide();
        }
    }

    _onConfirm(url) {
        // apply
        if (url) {
            this.onApply(url);
        }
        // remove
        else {
            this.onRemove();
        }
    }

    render() {
        const { isShow, value } = this.state;

        return (
            <div className='LinkControl' style={{display: 'inline', position: 'relative'}}>
                <ControlItem
                    label='Link'
                    onClick={this._onToggle}
                />

                {isShow &&
                    <LinkForm
                        value={value}
                        onChange={this._onChange}
                        onCancel={this._onToggle}
                        onConfirm={this._onConfirm}
                    />
                }
            </div>
        );
    }

    // internal
    onShow() {
        const { editorState } = this.props;

        const selection = editorState.getSelection();

        // have selection
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }

            this.setState({
                isShow : true,
                value  : url
            });
        }
    }

    onHide() {
        this.setState({ isShow: false });
    }

    onApply(url) {
        const { editorState } = this.props;

        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        const newEditorStateWithLink = RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        );

        this.props.onToggle(newEditorStateWithLink);

        this.setState({ isShow: false });
    }

    onRemove() {
        const { editorState } = this.props;

        const newEditorStateWithLink = RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            null
        );

        this.props.onToggle(newEditorStateWithLink);

        this.setState({ isShow: false });
    }
}