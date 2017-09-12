import { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

// styles
import styles from './Layout.less'; 

import { ListItem } from '../../src/index';


export default class Layout extends Component {

	render() {
		const { children } = this.props;

		return (
			<div className="Layout">
				{this.renderHeader()}

				<main className="content">
					{children}
				</main>
			</div>
		)
	}

	renderHeader() {
		const { routes } = this.props;

		return (
			<header className="header">
				<nav className="main-nav">
					<div className="main-nav-logo">
						<Link to="/">EP React UI</Link>
					</div>

					<ul className="main-nav-list list-unstyled">
						{(routes || []).map((obj, index) =>
							<ListItem
								key={index}
								TagName="li"
							>
								<NavLink
									to={obj.route}
									activeClassName="active"
								>{obj.name}</NavLink>
							</ListItem>
						)}
					</ul>
				</nav>
			</header>
		)
	}
}