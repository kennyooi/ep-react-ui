import { Component } from 'react';
import moment from 'moment';

import TableProps from '../TableProps';
import { DatetimePicker } from '../../../src/index';


export default class DocDatePicker extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input 	: {},
		};
	}

	render() {
		return (
			<div className="DocDatePicker">
				{this.renderSample()}
				{this.renderProps()}
			</div>
		)
	}

	renderSample() {
		const { input } = this.state;

		return (
			<div className="doc-autocomplete">
				<h2 className="page-subtitle">&lt;DatetimePicker /&gt;</h2>

				<div className="group">
					<div className="grid-12 grid-p-sm-15">
						<div className="c-sm-4">
							<DatetimePicker
								type="date"
								format="YYYY-MM-DD"
								displayFormat="D MMM, YYYY"
								inputProps={{
									className 	: "input-block",
									theme 		: "blue",
									label 		: "Date Picker",
									icon 		: "fa fa-calendar-o",
									placeholder : "Select date",
								}}
								value={input.date1 || ''}
								onChange={date => {
									this.state.input.date1 = date;
									this.setState({ input })
								}}
							/>
						</div>
						<div className="c-sm-4">
							<DatetimePicker
								type="time"
								format="hh:mm"
								displayFormat="h:mm A"
								inputProps={{
									className 	: "input-block",
									theme 		: "green",
									label 		: "Time Picker",
									icon 		: "fa fa-clock-o",
									placeholder : "Select time",
								}}
								value={input.date2 || ''}
								onChange={date => {
									this.state.input.date2 = date;
									this.setState({ input })
								}}
							/>
						</div>
						<div className="c-sm-4">
							<DatetimePicker
								type="datetime"
								inputProps={{
									className 	: "input-block",
									theme 		: "orange",
									label 		: "Datetime Picker",
									icon 		: "fa fa-calendar",
									placeholder : "Select date & time",
								}}
								value={input.date3 || ''}
								min={moment().subtract(1, 'month')}
								max={moment().add(1, 'month')}
								onChange={date => {
									this.state.input.date3 = date;
									this.setState({ input })
								}}
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
							name 	: 'disableYear',
							type 	: 'bool',
							default : 'false',
							desc 	: 'Disable change of year.',
						},
						{
							name 	: 'displayFormat',
							type 	: 'string',
							default : 'ddd, MMM D YYYY, h:mm A',
							desc 	: 'Display date format of value.',
						},
						{
							name 	: 'format',
							type 	: 'string',
							default : 'YYYY-MM-DD HH:mm',
							desc 	: 'Date format of value.',
						},
						{
							name 	: 'inputProps',
							type 	: 'object',
							desc 	: (<div>All <code>InputField</code> supported props.</div>),
						},
						{
							name 	: 'max',
							type 	: 'moment',
							desc 	: 'Maximum allowed date. Not applicable for time.',
						},
						{
							name 	: 'min',
							type 	: 'moment',
							desc 	: 'Minumum allowed date. Not applicable for time.',
						},
						{
							name 	: 'onChange',
							type 	: 'func',
							default : '(date)',
							desc 	: 'Triggered when datetime is selected.',
						},
						{
							name 	: 'onRenderDay',
							type 	: 'func',
							default : '(classNames, momentDay)',
							desc 	: 'Triggered during day render. Use this method to inject your own CSS className on each day.',
						},
						{
							name 	: 'timeInterval',
							type 	: 'number',
							default : '15',
							desc 	: 'Minumum interval of minutes.',
						},
						{
							name 	: 'txtCancel',
							type 	: 'string',
							default : 'Cancel',
							desc 	: 'Cancel button text.',
						},
						{
							name 	: 'txtConfirm',
							type 	: 'string',
							default : 'Select',
							desc 	: 'Select button text.',
						},
						{
							name 	: 'type',
							type 	: 'string',
							default : 'datetime',
							desc 	: (<div>Type of picker.<br/>Supported value: <code>datetime</code>, <code>date</code>, <code>time</code>.</div>),
						},
						{
							name 	: 'value',
							type 	: 'string',
							desc 	: 'Value of input.',
						},
					]}
				/>
			</div>
		)
	}
}