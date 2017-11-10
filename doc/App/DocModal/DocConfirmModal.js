import React, { Component } from 'react';
import TableProps from '../TableProps';
import { Button, ConfirmModal } from '../../../src/index';


export default class DocConfirmModal extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<div className="DocConfirmModal">
				{this.renderSample()}
				{this.renderProps()}

				{this.generateModal('modal1', {
					onConfirm: e => this.setState({ modal1: false }, () => alert('You Confirmed!')),
				})}

				{this.generateModal('modal2', {
					isSecure: true,
					textCancel: 'No',
					textConfirm: 'Double Confirm!',
					onConfirm: e => this.setState({ modal2: false }, () => alert('You Confirmed!')),
				})}
			</div>
		)
	}

	renderSample() {
		return (
			<div className="doc-modal">
				<h2 className="page-subtitle">&lt;ConfirmModal /&gt;</h2>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<Button theme="orange" onClick={e => this.setState({ modal1: true })}>
								Confirm Modal
							</Button>
						</div>
						<div className="c-sm-4">
							<Button theme="red" onClick={e => this.setState({ modal2: true })}>
								Secure Confirm Modal
							</Button>
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
							desc 	: 'Support all props from Modal.',
						},
						{
							name 	: 'isSecure',
							type 	: 'bool',
							desc 	: 'Enable double confirmation.',
						},
						{
							name 	: 'textCancel',
							type 	: 'string',
							default : 'Cancel',
							desc 	: 'Cancel button text.',
						},
						{
							name 	: 'textConfirm',
							type 	: 'string',
							default : 'Confirm',
							desc 	: 'Confirm button text.',
						},
						{
							name 	: 'textDelete',
							type 	: 'string',
							default : 'DELETE',
							desc 	: 'Double confirmation text.',
						},
						{
							name 	: 'onConfirm',
							type 	: 'func',
							desc 	: '()',
							desc 	: 'Trigger when confirm button clicked.',
						},
					]}
				/>
			</div>
		)
	}

	// helpers
	generateModal(modalId, props) {
		return (
			<ConfirmModal 
				{...props}
				isShow={this.state[ modalId ]}
				onCancel={e => this.setState({ [modalId]: false })}
				onRequestClose={e => this.setState({ [modalId]: false })}
			>
				<p>Are you sure?</p>
			</ConfirmModal>
		)
	}
}