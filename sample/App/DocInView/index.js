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
						<p>This component will trigger events when component are inside / outside viewport. <br/>
						Component rely on <b>in-view.js</b> (<a href="https://github.com/camwiegert/in-view" target="_blank">https://github.com/camwiegert/in-view</a>).</p>
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