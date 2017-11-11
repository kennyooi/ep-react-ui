import React, { Component } from 'react';
import DocInView from './DocInView';
import DocLazyImage from './DocLazyImage';


export default class DocInViewPage extends Component {

	render() {
		return (
			<div className="page">
				<header className="page-title">
					<div className="container">
						<h1>InView Components</h1>
						<h4>EP InView components.</h4>
					</div>
				</header>

				<div className="page-content">
					<div className="container">
						<DocInView />
						<hr className="seperator" />

						<DocLazyImage />
					</div>
				</div>
			</div>
		)
	}
}