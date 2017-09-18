import { Component } from 'react';
import DocNotificationBasic from './DocNotificationBasic';


export default class DocNotification extends Component {

	render() {
		return (
			<div className="page">
				<header className="page-title">
					<div className="container">
						<h1>Notification Component</h1>
						<h4>React medium-draft plugin. *[components/common]</h4>
					</div>
				</header>

				<div className="page-content">
					<div className="container">
						<DocNotificationBasic />
						<hr className="seperator" />
					</div>
				</div>
			</div>
		)
	}
}