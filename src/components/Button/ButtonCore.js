/**
 * Enhanced button components (internal use)
 */
import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { offset } from '../../helpers/waves';

import Ripple from '../Ripple';


export default class ButtonCore extends PureComponent {

	static propTypes = {
		TagName 	: PropTypes.string, 	// button tag
		theme 		: PropTypes.string, 	// button color
		size 		: PropTypes.string, 	// button size
		rippleTheme : PropTypes.string, 	// ripple theme
	};

	static defaultProps = {
		TagName 	: 'button',
		className 	: 'btn',
		theme 		: 'default',
	};

	constructor(props) {
		super(props);

		// actions
		this._onClick = this._onClick.bind(this);
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
		this._onMouseOut = this._onMouseOut.bind(this);
	}

	render() {
		const { children, TagName, className, theme, size, rippleTheme, ...others } = this.props;

		const props = {
			...others,
			className 	: classNames(className, {
								[`btn-${theme}`] : theme,
								[`btn-${size}`]  : size
							}),
			onClick 	: this._onClick,
			onMouseDown : this._onMouseDown,
			onMouseUp 	: this._onMouseUp,
			onMouseOut 	: this._onMouseOut
		};

		const childs = [];
		childs.push((
			<Ripple 
				key="ripple"
				ref={el => this.__rippleEl = el} 
				theme={rippleTheme}
				speed="slow" 
			/>
		));
		childs.push((
			<div className="btn-inner" key="inner">
				{children}
			</div>
		));

		return (
			<TagName {...props}>
				{childs}
			</TagName>
		)
	}

	getPosition(el, e) {
		const pos = offset(el);

		let relativeY = e.pageY - pos.top;
		let relativeX = e.pageX - pos.left;

		// Support for touch devices
        if ('touches' in e) {
          	relativeY   = e.touches[0].pageY - pos.top;
          	relativeX   = e.touches[0].pageX - pos.left;
        }
	
		return {	
			x 	: relativeX,
			y 	: relativeY,
		}
	}

	_onClick(e) {
		const { disabled } = this.props;

		// Check button disabled
		if (disabled) {
			return;
		}

		if (this.props.onClick) {
			this.props.onClick(e);
		}
	}

	_onMouseDown(e) {
		const { onMouseDown, disabled } = this.props;

		// Check button disabled
		if (disabled) {
			return;
		}

		const el = ReactDOM.findDOMNode(this.__rippleEl);
		const pos = this.getPosition(el, e);
		// @refs -> http://stackoverflow.com/questions/35493942/get-react-refs-dom-node-width-after-render-and-trigger-a-re-render-only-if-width
		// const el = e.target;
		// const scale = (el.clientWidth / 100) * 10;
		// const scale = (el.getBoundingClientRect().width / 100) * 10;

		const maxWidth = el.getBoundingClientRect().width;
		const maxHeight = el.getBoundingClientRect().height;
		// 10 = default ripple-item size 10px * 10px
		// 2  = for scaling from center need multiply by 2
		// 0.1 = offset fix for radius cut
		// calculate needed maximum width/height only, not need full width
		const width = Math.max( Math.abs(maxWidth - pos.x), pos.x );
		const height = Math.max( Math.abs(maxHeight - pos.y), pos.y );
		const scale = Math.max(width, height) / 10 * (2 + 0.1);
		
		this.__rippleEl.show(pos, scale);

		if (onMouseDown) {
			onMouseDown(e);
		}
	}

	_onMouseUp(e) {
		const { onMouseUp, disabled } = this.props;

		// Check button disabled
		if (disabled) {
			return;
		}

		this.__rippleEl.hide();

		if (onMouseUp) {
			onMouseUp(e);
		}
	}

	_onMouseOut(e) {
		const { onMouseOut, disabled } = this.props;

		// Check button disabled
		if (disabled) {
			return;
		}

		this.__rippleEl.hide();
		
		if (onMouseOut) {
			onMouseOut(e);
		}
	}
} 