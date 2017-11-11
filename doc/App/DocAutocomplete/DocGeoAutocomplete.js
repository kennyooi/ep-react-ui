import React, { Component } from 'react';

import TableProps from '../TableProps';
import { GeoAutocomplete } from '../../../src/index';


export default class DocGeoAutocomplete extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocGeoAutocomplete">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-autocomplete">
				<h2 className="page-subtitle">&lt;GeoAutocomplete /&gt;</h2>

				<p>Location autocomplete.</p>
				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-6">
							<GeoAutocomplete
								className="input-block"
								theme="orange"
								label="GeoAutocomplete"
								placeholder="Google Geo Autocomplete"
								acOptions={{componentRestrictions: { country: 'my' }}}
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
							desc 	: (<div>All <code>Autocomplete</code> props are supported, just without <code>loadItems</code> props.</div>),
						},
					]}
				/>
			</div>
		)
	}
}