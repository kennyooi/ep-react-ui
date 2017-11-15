import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { offset } from '../../helpers/waves';
import Ripple from '../Ripple';


export default class ListItemCore extends Component {

    static propTypes = {
        TagName         : PropTypes.string,     // element tag-name
        speed           : PropTypes.string,
        theme           : PropTypes.string,
        disabled        : PropTypes.bool
    };

    static defaultProps = {
        TagName         : 'div',
        className       : '',
        speed           : 'slow',
        theme           : 'default'
    };

    constructor(props) {
        super(props);

        // actions
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
    }

    render() {
        const { children, TagName, className, speed, theme, ...others } = this.props;

        return (
            <TagName
                {...others}
                className={classNames('ripple-list-item', className)}
                onMouseDown={this._onMouseDown}
                onMouseUp={this._onMouseUp}
                onMouseOut={this._onMouseOut}
            >
                {children}
                <Ripple
                    ref={el => this.__rippleEl = el}
                    theme={theme}
                    speed={speed}
                />
            </TagName>
        );
    }


    // Internal methods
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
            x   : relativeX,
            y   : relativeY
        };
    }


    // Events handler
    _onMouseDown(e) {
        const { disabled } = this.props;

        // Check button disabled
        if (disabled) {
            return;
        }

        const el = this.__rippleEl.getEl();
        const pos = this.getPosition(el, e);

        const maxWidth = el.getBoundingClientRect().width;
        // 10 = default ripple-item size 10px * 10px
        // 2  = for scaling from center need multiply by 2
        // 0.1 = offset fix for radius cut
        // calculate needed maximum width only, not need full width
        const width = Math.max( Math.abs(maxWidth - pos.x), pos.x );
        const scale = width / 10 * (2 + 0.1);

        this.__rippleEl.show(pos, scale);

        if (this.props.onMouseDown) {
            this.props.onMouseDown(e);
        }
    }

    _onMouseUp(e) {
        this.__rippleEl.hide();

        if (this.props.onMouseUp) {
            this.props.onMouseUp(e);
        }
    }

    _onMouseOut(e) {
        this.__rippleEl.hide();

        if (this.props.onMouseOut) {
            this.props.onMouseOut(e);
        }
    }
}