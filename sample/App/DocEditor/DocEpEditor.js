import React, { Component } from 'react';

import TableProps from '../TableProps';
import { Button, EpEditor } from '../../../src/index';


export default class DocDatePicker extends Component {

    constructor(props) {
        super(props);

        // refs
        this.setEditorRef = el => this.__editorRef = el;
    }

    render() {
        return (
            <div className='DocDatePicker'>
                {this.renderSample()}
                {this.renderProps()}
            </div>
        );
    }

    renderSample() {
        // sample html
        const html = `<div>
            <h2>Sample Default HTML</h2>
            <p>Lorem ipsuem random generated text</p>
            <p>Inline test <b>bold</b> <strong>strong</strong> <i>italic</i> <u>underline</u></p>
            <p>Sample of <a href='https://sample.link'>link</a></p>
            <ul>
                <li>List 1</li>
                <li>List 2</li>
                <li>List 3</li>
            </ul>
            <p></p>
        </div>`;


        return (
            <div className='doc-autocomplete'>
                <h2 className='page-subtitle'>&lt;EpEditor /&gt;</h2>
                <p>
                    Using <code>Draft.js</code> as base. Plugins used:<br/>
                    <b>createAutoListPlugin</b>: <a href='https://github.com/icelab/draft-js-autolist-plugin' target='_blank' rel='noopener noreferrer'>https://github.com/icelab/draft-js-autolist-plugin</a><br/>
                    <b>createBlockBreakoutPlugin</b>: <a href='https://github.com/icelab/draft-js-block-breakout-plugin' target='_blank' rel='noopener noreferrer'>https://github.com/icelab/draft-js-block-breakout-plugin</a>
                </p>
                <p>This component does not work like input type of component, as it keep the state itself and did not trigger <code>onChange</code> event. Use method <code>getHtml()</code> to get the value from editor.</p>

                <div className='group m-t-30'>
                    <EpEditor
                        ref={this.setEditorRef}
                        className='m-b-30'
                        value={html}
                        placeholder='Enter text here...'
                    />

                    <div>
                        <Button
                            theme='orange'
                            onClick={() => console.info( this.__editorRef.getHtml() )}
                        >Get HTML (console)</Button>
                    </div>
                </div>
            </div>
        );
    }

    renderProps() {
        return (
            <div className='group'>
                <TableProps
                    dataset={[
                        {
                            name    : 'placeholder',
                            type    : 'string',
                            desc    : 'Placeholder text.'
                        },
                        {
                            name    : 'value',
                            type    : 'strong',
                            desc    : 'Editor default value.'
                        }
                    ]}
                />

                <TableProps
                    name='Methods'
                    className='m-t-30'
                    dataset={[
                        {
                            name    : 'getHtml',
                            type    : 'func()',
                            desc    : 'Get editor HTML.'
                        },
                        {
                            name    : 'setHtml',
                            type    : 'func(html)',
                            desc    : 'Set HTML to Editor'
                        }
                    ]}
                />
            </div>
        );
    }
}