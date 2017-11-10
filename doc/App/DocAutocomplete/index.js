import React, { Component } from 'react';

import DocAutocompleteBasic from './DocAutocomplete';


export default class DocAutocomplete extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="page">
				<header className="page-title">
					<div className="container">
						<h1>Autocomplete Component</h1>
						<h4>EP modal component. *[components/common]</h4>
					</div>
				</header>

				<div className="page-content">
					<div className="container">
						<DocAutocompleteBasic />
					</div>
				</div>
			</div>
		)
	}
}