import { Component } from 'react';

import TableProps from '../TableProps';
import { FlatButton } from '../../../src/index';


export default class DocFlatButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocFlatButton">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-button">
				<h2 className="page-subtitle">&lt;FlatButton /&gt;</h2>

				<p><code>theme</code> prop</p>
				<div className="group">
					<FlatButton>
						FlatButton
					</FlatButton>
					<FlatButton theme="grey">
						FlatButton
					</FlatButton>
					<FlatButton theme="orange">
						FlatButton
					</FlatButton>
					<FlatButton theme="blue">
						FlatButton
					</FlatButton>
					<FlatButton theme="red">
						FlatButton
					</FlatButton>
					<FlatButton theme="green">
						FlatButton
					</FlatButton>
					<FlatButton theme="ember">
						FlatButton
					</FlatButton>
					<FlatButton disabled={true}>
						Disabled
					</FlatButton>
				</div>

				<p>Extend <code>className</code> with <code>btn-block</code> CSS class</p>
				<div className="group">
					<FlatButton className="btn-block">
						FlatButton 
					</FlatButton>
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
							desc 	: (<div>Same as <code>Button</code>.</div>),
						},
					]}
				/>
			</div>
		)
	}
}