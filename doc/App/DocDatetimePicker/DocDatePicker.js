import { Component } from 'react';

import TableProps from '../TableProps';
import { DatePicker } from '../../../src/index';


export default class DocDatePicker extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocDatePicker">
				{this.renderSample()}
				{/*this.renderProps()*/}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-autocomplete">
				<h2 className="page-subtitle">DatePicker</h2>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-6">
							<DatePicker
								type="datetime"
								className="input-block"
								theme="orange"
								label="Datepicker Label"
								icon="fa fa-calendar"
								placeholder="Placeholder text"
								value={input.date1 || ''}
								// onChange={this._onChange.bind(this, 'date1')}
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
							name 	: (<i>inherited</i>),
							type 	: '...',
							desc 	: (<div>All <code>InputField</code> props are supported.</div>),
						},
						{
							name 	: 'debugMode',
							type 	: 'bool',
							default : 'false',
							desc 	: 'Enable Autocomplete debug mode for styling.',
						},
						{
							name 	: 'delay',
							type 	: 'number',
							default : '700',
							desc 	: 'Autocomplete search trigger delay.',
						},
						{
							name 	: 'loadItems',
							type 	: 'func',
							desc 	: (<div>Load datasource of Autocomplete. <br/>*This function must return a <code>Promise</code>. <br/>*Response must contains array of objects with props <code>id</code> & <code>name</code>.</div>),
						},
						{
							name 	: 'onRender',
							type 	: 'func',
							default : 'item => item.name',
							desc 	: 'Render method of Autocomplete item.',
						},
						{
							name 	: 'onSelect',
							type 	: 'func',
							default : 'item => item',
							desc 	: 'Triggered when item is selected.',
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
}