import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';
// plugins
import createAutoListPlugin from 'draft-js-autolist-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
// addons
import BlockStyleControls from './addons/BlockStyleControls';
import InlineStyleControls from './addons/InlineStyleControls';
import LinkControl from './addons/LinkControl/index';
import { findLinkEntities, LinkComp } from './addons/LinkControl/decorator';

import './EpEditor.less';

// create draft-js plugins
const autoListPlugin = createAutoListPlugin();
const blockBreakoutPlugin = createBlockBreakoutPlugin();


export default class EpEditor extends PureComponent {

    static propTypes = {
        value       : PropTypes.string,
        placeholder : PropTypes.string,
        onBlur      : PropTypes.func
    };

    constructor(props) {
        super(props);

        const contentState = stateFromHTML(props.value || '');
        this.state = {
            editorState : EditorState.createWithContent(contentState)
        };

        // refs
        this.setEditorRef = el => this.__editorRef = el;

        // actions
        this._onChange = this._onChange.bind(this);
        this._onChangeFocus = this._onChangeFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onHandleKeyCommand = this._onHandleKeyCommand.bind(this);
    }

    _onChange(editorState) {
        this.setState({ editorState });
    }

    _onChangeFocus(editorState) {
        this.setState({ editorState });

        setTimeout(() => this.__editorRef.focus(), 0);
    }

    _onBlur() {
        const { onBlur } = this.props;
        const { editorState } = this.state;

        if (onBlur) {
            onBlur(stateToHTML(editorState.getCurrentContent()));
        }
    }

    _onHandleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this._onChange(newState);
            return true;
        }
        return false;
    }

    render() {
        const { className, placeholder } = this.props;
        const { editorState } = this.state;

        return (
            <div className={classNames('EpEditor', className)}>
                <div className='EpEditor-editor'>
                    <Editor
                        ref={this.setEditorRef}
                        placeholder={placeholder}
                        plugins={[
                            autoListPlugin,
                            blockBreakoutPlugin
                        ]}
                        decorators={[
                            {
                                strategy  : findLinkEntities,
                                component : LinkComp
                            }
                        ]}
                        editorState={editorState}
                        handleKeyCommand={this._onHandleKeyCommand}
                        onChange={this._onChange}
                        onBlur={this._onBlur}
                    />
                </div>
                <div className='EpEditor-controls'>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this._onChangeFocus}
                    />

                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this._onChangeFocus}
                    />

                    <div className='AddonsControls'>
                        <LinkControl
                            editorState={editorState}
                            onToggle={this._onChangeFocus}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // public methods
    setHtml(html) {
        const contentState = stateFromHTML(html || '');
        const editorState = EditorState.createWithContent(contentState);

        this._onChange({ editorState });
    }

    getHtml() {
        const { editorState } = this.state;

        return stateToHTML(editorState.getCurrentContent());
    }
}