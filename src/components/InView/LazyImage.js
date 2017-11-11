/**
 * Image Lazy Load
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { assign } from 'lodash';
import InView from './InView';

import './LazyImage.less';


export default class LazyImage extends PureComponent {

	static propTypes = {
		uniqId 		: PropTypes.string.isRequired, 	// unique ID for InView to work
		src 		: PropTypes.string.isRequired, 	// image src
		width 		: PropTypes.string.isRequired, 	// image width
		height 		: PropTypes.string.isRequired, 	// image height
		useBg 		: PropTypes.bool, 		// using background-image instead of img tag
	};

	constructor(props) {
		super(props);

		this.state = {
			isLoaded 	: false,
		}

		// events
		this._onInView = this._onInView.bind(this);
		this._onImageLoad = this._onImageLoad.bind(this);
	}

	render() {
		const { className, uniqId, src, width, height, useBg, ...others } = this.props;
		const { isLoaded } = this.state;

		const TagName = useBg ? 'div' : 'img';
		const attr = {
			...others,
			className: classNames('img', className),
		};

		if (useBg) {
			attr.style = assign({}, this.props.style, {
				width,
				height,
				backgroundImage: isLoaded ? `url(${src})` : undefined,
			});
		}
		else {
			attr.src = isLoaded ? src : undefined;
			attr.width = width;
			attr.height = height;
		}

		return (
			<InView 
				className="LazyImage" 
				uniqId={uniqId}
				onInView={this._onInView}
			>
				<TagName {...attr} />
			</InView>
		)
	}

	_onInView() {
		const { src } = this.props;
        const { isLoaded } = this.state;

        if (isLoaded) {
            return;
        }

        this.__img = new Image();
        this.__img.addEventListener('load', this._onImageLoad);
        this.__img.src = src;
	}

	_onImageLoad() {
		this.__img.removeEventListener('load', this._onImageLoad);
		this.setState({ isLoaded: true });
	}
}