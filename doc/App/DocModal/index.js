import { Component } from 'react';
import { isEmpty } from 'lodash';

import DocModalBasic from './DocModalBasic';
import DocConfirmModal from './DocConfirmModal';
import DocMessageModal from './DocMessageModal';


export default class DocModal extends Component {
	render() {
		return (
			<div className="page">
				<header className="page-title">
					<div className="container">
						<h1>Modal Component</h1>
						<h4>EP modal component. *[components/common]</h4>
					</div>
				</header>

				<div className="page-content">
					<div className="container">
						<DocModalBasic />
						<hr className="seperator" />

						<DocConfirmModal />
						<hr className="seperator" />

						<DocMessageModal />
						<hr className="seperator" />

						<h4>More is coming ...</h4>
					</div>
				</div>

			</div>
		)
	}
}