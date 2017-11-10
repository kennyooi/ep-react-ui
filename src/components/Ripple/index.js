/**
 * Ripple effect 
 * @ref -> https://github.com/Dogfalo/materialize/blob/master/js/waves.js
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { convertStyle } from '../../helpers/waves';
import './style.less';

const SPEED = {
	normal 	: {
		fade_in 	: 500,
		fade_out 	: 500,
	},
	fast 	: {
		fade_in 	: 250,
		fade_out 	: 250,
	},
	slow 	: {
		fade_in 	: 1000,
		fade_out 	: 750,
	},
};

export default class RippleEffect extends Component {

	static propTypes = {
		theme 	: PropTypes.string, 	// type of ripple effect : light*, dark
		speed 	: PropTypes.string, 	// speed of ripple effect
	};

	static defaultProps = {
		theme 	: 'light', 	
		speed 	: 'normal',
	};

	render() {
		const { theme, speed } = this.props;

		return (
			<div className={classNames("ripple", {
				[`ripple-${theme}`] 	: theme !== '',
				[`ripple-${speed}`] 	: Object.keys(SPEED).indexOf(speed) !== -1,
			})} ref={el => this.__el = el}></div>
		)
	}

	// show ripple effect
	// @pos 	: position of item
	// @scale 	: scale of ripple
	show(pos, scale) {
		// Create ripple item
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        this.__el.appendChild(ripple);

        // Set position && data
        const styles = {
        	top  : `${pos.y}px`,
        	left : `${pos.x}px`,
        };
        ripple.setAttribute('data-hold', Date.now()); 	// use for fadeout delay
        ripple.className += ' ripple-effect__init';
        ripple.setAttribute('style', convertStyle(styles));
        
        // @hack - refresh style changes
        // ref -> https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
        window.getComputedStyle(ripple).opacity;

        // Scale ripple
        ripple.className = ripple.className.replace('ripple-effect__init', 'ripple-effect__in');
        // styles.transform = `scale(${scale})`;
        styles.transform = `scale(${Math.ceil(scale)})`; 	// @fix Chrome sudden black issue
        ripple.setAttribute('style', convertStyle(styles));
	}

	hide() {
		const { speed } = this.props;

		const childs = this.__el.childNodes;

		// Check if have child node
		if (childs.length === 0) {
			return;
		}

		const ripple = childs[ childs.length-1 ];

		// Check if child already on fade out state
		if (ripple.className.indexOf('ripple-effect__end') !== -1) {
			return;
		}
		ripple.className += ' ripple-effect__end';

		// Check fade out delay
		const diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        const delay = SPEED[ speed ].fade_in - diff;

        setTimeout(() => {
        	ripple.className += ' ripple-effect__out';

        	// Remove ripple item
			setTimeout(() => {
				if (ripple && this.__el) {
					this.__el.removeChild( ripple );
				}
			}, SPEED[ speed ].fade_out); 

        }, (delay > 0 ? delay : 0));
	}
} 