import React, { Component } from 'react';

import DocInputField from './DocInputField';
import DocInputSelect from './DocInputSelect';
import DocInputCheckbox from './DocInputCheckbox';


export default class DocForm extends Component {

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
						<h1>Form Components</h1>
						<h4>EP form components. *[components/common]</h4>
					</div>
				</header>

				<div className="page-content">
					<div className="container">
						<DocInputField />
						<hr className="seperator" />

						<DocInputSelect />
						<hr className="seperator" />

						<DocInputCheckbox />
					</div>
				</div>
			</div>
		)
	}
}