import React, { Component } from 'react';

import TableProps from '../TableProps';
import { InputSelect } from '../../../src/index';


export default class DocInputSelect extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocInputSelect">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-form">
				<h2 className="page-subtitle">&lt;InputSelect /&gt;</h2>

				<p>Select input did inherit mostly props from Input Text.</p>
				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<InputSelect
								theme="orange"
								className="input-block"
								label="Select input"
								value={input.select1}
								onChange={this._onChange.bind(this, 'select1')}
							>
								<option value="">Select value</option>
								<option value="1">Value 1</option>
								<option value="2">Value 2</option>
								<option value="3">Value 3</option>
							</InputSelect>	
						</div>
						<div className="c-sm-4">
							<InputSelect
								theme="green"
								className="input-block"
								value={input.select2}
								onChange={this._onChange.bind(this, 'select2')}
							>
								<option value="">Select input without label</option>
								<option value="1">Value 1</option>
								<option value="2">Value 2</option>
								<option value="3">Value 3</option>
							</InputSelect>	
						</div>
						<div className="c-sm-4">
							<InputSelect
								theme="red"
								className="input-block"
								label="Disabled input"
								value=""
								disabled={true}
								onChange={e => e}
							>
								<option value="">Disabled Input</option>
							</InputSelect>	
						</div>
					</div>
				</div>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<InputSelect
								theme="blue"
								className="input-block"
								label="Select input"
								hint="Select hint"
								value={input.select3}
								onChange={this._onChange.bind(this, 'select3')}
							>
								<option value="">Select value</option>
								<option value="1">Value 1</option>
								<option value="2">Value 2</option>
								<option value="3">Value 3</option>
							</InputSelect>	
						</div>
						<div className="c-sm-4">
							<InputSelect
								theme="ember"
								className="input-block"
								label="Select input"
								errorText="Error message"
								value={input.select4}
								onChange={this._onChange.bind(this, 'select4')}
							>
								<option value="">Select value</option>
								<option value="1">Value 1</option>
								<option value="2">Value 2</option>
								<option value="3">Value 3</option>
							</InputSelect>	
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
							name 	: (<i>inherited</i>),
							type 	: '...',
							desc 	: (<div>Include props above except <code>maxlength</code>,  <code>multiline</code>, and <code>placeholder</code></div>),
						},
						{
							name 	: 'label',
							type 	: 'string',
							desc 	: (<div>Note: Label <code>div</code> contains white color of background, use your own style to overwrite it.</div>),
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