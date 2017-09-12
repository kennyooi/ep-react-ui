import { Component } from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './TableProps.less'; 


export default class TableProps extends Component {

	render() {
		const { dataset } = this.props;

		return (
			<div className="TableProps">
				<h4 className="TableProps-header">Properties</h4>
				<table className="table">
					<thead>
						<tr>
							<th width="13%">Name</th>
							<th width="7%">Type</th>
							<th width="7%">Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{(dataset || []).map((item, index) =>
							<tr key={index}>
								<td>{item.name}</td>
								<td><small className="TableProps-val-type">{item.type}</small></td>
								<td>{item.default &&
									<small className="TableProps-val-default">{item.default}</small>
								}</td>
								<td>{item.desc}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		)
	}
}