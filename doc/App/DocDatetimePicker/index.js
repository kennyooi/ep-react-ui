import React, { Component } from 'react';
import DocDatePicker from './DocDatePicker';


export default class DocDatetimePicker extends Component {

	render() {
		return (
			<div className="page">
				<header className="page-title">
					<div className="container">
						<h1>DatetimePicker Component</h1>
						<h4>EP modal component. *[components/common]</h4>
					</div>
				</header>

				<div className="page-content">
					<div className="container">
						<DocDatePicker />
						<hr className="seperator" />
					</div>
				</div>
			</div>
		)
	}
}