import { Component } from 'react';

import TableProps from '../TableProps';
import { Autocomplete, SelectAutocomplete } from '../../../src/index';


export default class DocAutocomplete extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocSelectAutocomplete">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-autocomplete">
				<h2 className="page-subtitle">&lt;Autocomplete /&gt;</h2>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-6">
							<Autocomplete
								className="input-block"
								theme="orange"
								label="Autocomplete"
								placeholder="Suggestion method"
								value=''
								loadItems={q => {
									// should return promise
									// but simply return an array here
									return new Promise((resolve, reject) => {
										resolve([
											{ id: 'happy', name: 'Happy' },
											{ id: 'fun', name: 'Fun' },
											{ id: 'angry', name: 'Angry' },
											{ id: 'sad', name: 'Sad' },
											{ id: 'awesome', name: 'Awesome' },
											{ id: 'deabak', name: 'Deabak' },
										]);
									});
								}}
								onSelect={item => alert(item.id)}
							/>
						</div>
						<div className="c-sm-6">
							<SelectAutocomplete
								className="input-block"
								theme="orange"
								label="SelectAutocomplete"
								placeholder="Select Mandatory Autocomplete"
								hint="Select from dropdown"
								value=''
								loadItems={q => {
									// should return promise
									// but simply return an array here
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											if (q.length > 5) {
												resolve([]);
											}
											else {
												resolve([
													{ id: 'happy', name: 'Happy' },
													{ id: 'fun', name: 'Fun' },
													{ id: 'angry', name: 'Angry' },
													{ id: 'sad', name: 'Sad' },
													{ id: 'awesome', name: 'Awesome' },
													{ id: 'deabak', name: 'Deabak' },
												]);
											}
										}, 500);
									});
								}}
								onSelect={item => alert(item.id)}
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