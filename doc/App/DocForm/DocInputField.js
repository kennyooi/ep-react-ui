import { Component } from 'react';

import TableProps from '../TableProps';
import { InputField } from '../../../src/index';


export default class DocInputField extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocInputField">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-form">
				<h2 className="page-subtitle">&lt;InputField /&gt;</h2>

				<p>All form components are <strong>controlled components</strong> (<a href="https://facebook.github.io/react/docs/forms.html#controlled-components" target="_blank">source</a>). Input changes only when <code>value</code> prop is changed, else it won't work.</p>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<InputField 
								theme="orange"
								className="input-block"
								label="Input Label"
								placeholder="Input placeholder"
								value={input.value1}
								onChange={this._onChange.bind(this, 'value1')}
							/>
						</div>
						<div className="c-sm-4">
							<InputField 
								theme="blue"
								className="input-block"
								placeholder="Placeholder text (without label)"
								value={input.value2}
								onChange={this._onChange.bind(this, 'value2')}
							/>
						</div>
						<div className="c-sm-4">
							<InputField 
								theme="ember"
								className="input-block"
								label="Input without placeholder"
								value={input.value3}
								onChange={this._onChange.bind(this, 'value3')}
							/>
						</div>
					</div>
				</div>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<InputField 
								theme="green"
								className="input-block"
								label="Focus to show hint"
								hint="This is input hint"
								value={input.value4}
								onChange={this._onChange.bind(this, 'value4')}
							/>
						</div>
						<div className="c-sm-4">
							<InputField 
								theme="blue"
								className="input-block"
								label="Input with error & maxlength"
								maxlength={10}
								errorText={(input.value5 && input.value5.length > 10) ? 'This is error message' : ''}
								value={input.value5}
								onChange={this._onChange.bind(this, 'value5')}
							/>
						</div>
						<div className="c-sm-4">
							<InputField 
								theme="orange"
								className="input-block"
								label="Input Label"
								placeholder="Placeholder text"
								value='Disabled value'
								disabled={true}
							/>
						</div>
					</div>
				</div>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-6">
							<InputField 
								theme="orange"
								className="input-block"
								label="Multiline textarea"
								placeholder="Textare content"
								multiline={3}
								value={input.value6}
								onChange={this._onChange.bind(this, 'value6')}
							/>
						</div>
						<div className="c-sm-6">
							<InputField 
								theme="green"
								className="input-block"
								label="Complicated Input"
								placeholder="Textare content"
								hint="Textarea hint"
								multiline={3}
								maxlength={20}
								errorText={(input.value7 && input.value7.length > 20) ? 'Text too long' : ''}
								value={input.value7}
								onChange={this._onChange.bind(this, 'value7')}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderProps() {
		return (
			<div className="group">
				<TableProps 
					dataset={[
						{
							name 	: 'All input event',
							type 	: '...',
							desc 	: 'All input event are supported.',
						},
						{
							name 	: 'className',
							type 	: 'string',
							desc 	: 'Extra CSS classes for input container.',
						},
						{
							name 	: 'disabled',
							type 	: 'bool',
							desc 	: 'Input disablility.',
						},
						{
							name 	: 'errorText',
							type 	: 'string',
							desc 	: 'Error message text, will replace hint text if both exists. By passing this props will automatically convert input to error input.',
						},
						{
							name 	: 'hint',
							type 	: 'string',
							desc 	: 'Input hint text at bottom.',
						},
						{
							name 	: 'inputProps',
							type 	: 'object',
							desc 	: (<div>Extra props which will passed to <code>&lt;input /&gt;</code> tag.</div>),
						},
						{
							name 	: 'label',
							type 	: 'string',
							desc 	: 'Input floating label.',
						},
						{
							name 	: 'maxlength',
							type 	: 'number',
							desc 	: 'Maximum length of input, if value is exceed will show error.',
						},
						{
							name 	: 'multiline',
							type 	: 'number',
							default : '0',
							desc 	: (<div>Number of input rows, will auto convert to <code>&lt;textarea /&gt;</code> if value is more then 0. Autosize was applied automatically.</div>),
						},
						{
							name 	: 'placeholder',
							type 	: 'string',
							desc 	: 'Input placeholder text, will appear only when input is empty.',
						},
						{
							name 	: 'theme',
							type 	: 'string',
							desc 	: 'Input color theme.',
						},
						{
							name 	: 'type',
							type 	: 'string',
							default : 'text',
							desc 	: 'Input type.',
						},
						{
							name 	: 'value',
							type 	: 'string',
							desc 	: 'Input value.',
						},
					]}
				/>
			</div>
		)
	}

	// Actions
	_onChange(state, e) {
		const { input } = this.state;

		input[ state ] = e.target.value;

		this.setState({
			input	: input
		});
	}
}