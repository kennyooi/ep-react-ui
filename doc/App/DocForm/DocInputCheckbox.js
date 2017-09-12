import { Component } from 'react';

import TableProps from '../TableProps';
import { InputCheckbox, InputRadio, InputToggle } from '../../../src/index';


export default class DocInputCheckbox extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocInputCheckbox">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-form">
				<h2 className="page-subtitle">&lt;InputCheckbox /&gt; &lt;InputRadio /&gt; &lt;InputToggle /&gt;</h2>

				<p>Checkbox input</p>
				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<InputCheckbox 
								theme="orange"
								checked={input.checkbox1}
								onChange={this._onChecked.bind(this, 'checkbox1')}
							>
								Checkbox content
							</InputCheckbox>
						</div>
						<div className="c-sm-4">
							<InputCheckbox 
								theme="red"
								checked={input.checkbox2}
								onChange={this._onChecked.bind(this, 'checkbox2')}
							>
								Checkbox content
							</InputCheckbox>
						</div>
						<div className="c-sm-4">
							<InputCheckbox 
								theme="green"
								checked={input.checkbox3}
								disabled={true}
								onChange={this._onChecked.bind(this, 'checkbox3')}
							>
								Checkbox content (disabled)
							</InputCheckbox>
						</div>
					</div>
				</div>

				<p>Radion input</p>
				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<InputRadio 
								theme="ember"
								value="ember"
								checked={input.radio1 === 'ember'}
								onChange={this._onChange.bind(this, 'radio1')}
							>
								Radio content
							</InputRadio>
						</div>
						<div className="c-sm-4">
							<InputRadio 
								theme="blue"
								value="blue"
								checked={input.radio1 === 'blue'}
								onChange={this._onChange.bind(this, 'radio1')}
							>
								Radio content
							</InputRadio>
						</div>
						<div className="c-sm-4">
							<InputRadio 
								theme="green"
								value="green"
								checked={input.radio1 === 'green'}
								disabled={true}
								onChange={this._onChange.bind(this, 'radio1')}
							>
								Radio content (disabled)
							</InputRadio>
						</div>
					</div>
				</div>

				<p>Toggle Input</p>
				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<InputToggle 
								theme="orange"
								checked={input.toggle1}
								onChange={this._onChecked.bind(this, 'toggle1')}
							>
								Toggle Content
							</InputToggle>
						</div>
						<div className="c-sm-4">
							<InputToggle 
								theme="blue"
								checked={input.toggle2}
								onChange={this._onChecked.bind(this, 'toggle2')}
							>
								Toggle Content
							</InputToggle>
						</div>
						<div className="c-sm-4">
							<InputToggle 
								theme="green"
								checked={input.toggle3}
								disabled={true}
								onChange={this._onChecked.bind(this, 'toggle3')}
							>
								Toggle Content
							</InputToggle>
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
							name 	: 'checked',
							type 	: 'bool',
							desc 	: 'Input checked status.',
						},
						{
							name 	: 'className',
							type 	: 'string',
							desc 	: 'Extra CSS classes passed to input.',
						},
						{
							name 	: 'disabled',
							type 	: 'bool',
							desc 	: 'Input disabled status.',
						},
						{
							name 	: 'theme',
							type 	: 'string',
							desc 	: 'Input color theme.',
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

	_onChecked(state, e) {
		const { input } = this.state;

		input[ state ] = e.target.checked;

		this.setState({
			input 	: input
		});
	}
}