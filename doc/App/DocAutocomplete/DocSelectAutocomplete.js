import React, { Component } from 'react';

import TableProps from '../TableProps';
import { SelectAutocomplete } from '../../../src/index';


export default class DocSelectAutocomplete extends Component {

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
				<h2 className="page-subtitle">&lt;SelectAutocomplete /&gt;</h2>

				<p>Different with <code>Autocomplete</code> as this will show a loading state.</p>
				<div className="group">
					<div className="grid-12 grid-p-sm-15">
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
							desc 	: (<div>All <code>Autocomplete</code> props are supported.</div>),
						},
					]}
				/>
			</div>
		)
	}
}