import { Component } from 'react';

import './Loader.less';


export default class Loader extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isShow 	: false
		};
	}

	componentDidMount() {
		this.__timer = setTimeout(() => {
			this.setState({ isShow : true });
		}, 50);
	}

	componentWillUnmount() {
		clearTimeout(this.__timer);
	}

	render() {
		const { className, text, ...others } = this.props;
		const { isShow } = this.state;

		return (
			<div {...others} className={classNames("Loader", className)}>
				<div className="Loader-content">
					<div className={classNames("Loader-spinner", { '__is-stop' : !isShow })}>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
					</div>
					{text &&
						<p className="loader-text">{ text }</p>
					}
				</div>
			</div>
		)
	}
} 