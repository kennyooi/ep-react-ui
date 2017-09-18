import { Component } from 'react';
import TableProps from '../TableProps';
import { Notification, Button } from '../../../src/index';


export default class DocNotificationBasic extends Component {

	render() {
		return (
			<div className="DocNotificationBasic">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		return (
			<div className="doc-autocomplete">
				<h2 className="page-subtitle">&lt;Notification /&gt;</h2>
						
				<div className="group">
					<Button theme="orange"
						onClick={e => {
							const arr = ['success', 'error', 'info'];

							this.__notif.pushItem({
								type 	: arr[ Math.floor(Math.random() * arr.length) ],
								message : 'This is push item message', 
							});
						}}>
						Push Notification
					</Button>
				</div>

				<Notification ref={el => this.__notif = el} />
			</div>
		)
	}

	renderProps() {
		return (
			<div className="group">
				<TableProps 
					dataset={[
						{
							name 	: 'fadeoutTime',
							type 	: 'number',
							default : '3000',
							desc 	: 'Notification stay duration.',
						},
						{
							name 	: 'iconError',
							type 	: 'string',
							default : 'fa fa-exclamation-circle',
							desc 	: 'Error icon.',
						},
						{
							name 	: 'iconInfo',
							type 	: 'string',
							default : 'fa fa-info-circle',
							desc 	: 'Info icon.',
						},
						{
							name 	: 'iconSuccess',
							type 	: 'string',
							default : 'fa fa-check-circle-o',
							desc 	: 'Success icon.',
						},
						{
							name 	: 'pushItem',
							type 	: 'func',
							default : '({type, message})',
							desc 	: (<div>Public method. Push new notification to DOM.<br/>Supported type: <code>error</code>, <code>success</code>, <code>info</code>.</div>),
						},
					]}
				/>
			</div>
		)
	}
}