/**
 * Enhanced checkbox & radio components (internal use)
 */
import { PureComponent } from 'react';
import Ripple from '../Ripple';


export default class CheckboxCore extends PureComponent {

	static propTypes = {
		TagName 	: PropTypes.string, 	// wrapper tag
		theme 		: PropTypes.string, 	// checkbox theme color
		checked 	: PropTypes.bool, 		// checkbox checked status
		disabled 	: PropTypes.bool, 		// checkbox disabled
		onChange 	: PropTypes.func, 		// onChange event
	};

	static defaultProps = {
		TagName 	: 'label',
		className 	: '',
		theme 		: 'default',
	};

	constructor(props) {
		super(props);

		// actions
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
	}

	render() {
		const { children, TagName, className, theme, checked, disabled, ...others } = this.props;

		const inputProps = {
			checked : checked ? "checked" : "",
			...others,
		};

		if (disabled) {
			inputProps.disabled = true;
		}

		return (
			<TagName 
				className={classNames(className, {
					[`theme-${theme}`] 	: theme,
					'input__checked' 	: checked,
					'input__disabled' 	: disabled,
				})}
				onMouseDown={this._onMouseDown}
				onMouseUp={this._onMouseUp}
				onMouseOut={this._onMouseUp}
			>
				<input 
					{...inputProps}
				/>
				<div className="input-box" 
					ref={el => this.__boxEl = el}>
					<Ripple 
						ref={el => this.__rippleEl = el}
						theme={checked ? theme : "default"}
					/>
					<span className="input-box-unchecked"></span>
					<span className="input-box-checked"></span>
				</div>
				<div className="input-label">{children}</div>
			</TagName>
		)
	}

	_onMouseDown(e) {
		const { disabled } = this.props;

		// Check disabled
		if (disabled) {
			return;
		}

		const pos = {
			x 	: this.__boxEl.clientWidth / 2,
			y 	: this.__boxEl.clientHeight / 2,
		};
		const scale = (this.__boxEl.clientWidth / 10) * 2.2;

		this.__rippleEl.show(pos, scale);
	}

	_onMouseUp(e) {
		const { disabled } = this.props;

		// Check disabled
		if (disabled) {
			return;
		}

		this.__rippleEl.hide();
	}
}