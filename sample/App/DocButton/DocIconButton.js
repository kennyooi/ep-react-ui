import React, { Component } from 'react';

import TableProps from '../TableProps';
import { IconButton } from '../../../src/index';


export default class DocGhostButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocGhostButton">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-button">
				<h2 className="page-subtitle">&lt;IconButton /&gt;</h2>

				<p><code>theme</code> props</p>
				<div className="group">
					<IconButton icon="fa fa-play" />
					<IconButton icon="fa fa-pause" tooltip="This is tooltip" />
					<IconButton icon="fa fa-stop" tooltip="This is tooltip too" />
					<IconButton icon="fa fa-forward" disabled={true} />
				</div>

				<p>Extend <code>className</code> with button sizes, <strong>NOT</strong> using <code>size</code> prop</p>
				<div className="group">
					<IconButton icon="fa fa-arrow-down" className="btn-sm" />
					<IconButton icon="fa fa-arrow-left" />
					<IconButton icon="fa fa-arrow-up" className="btn-lg" />
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
						{
							name 	: 'icon',
							type 	: 'string',
							desc 	: 'Button icon CSS class.',
						},
						{
							name 	: 'tooltip',
							type 	: 'string',
							desc 	: 'Tooltip text for button.',
						},
					]}
				/>
			</div>
		)
	}
}