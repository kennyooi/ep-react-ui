/**
 * Ghost Button (using ButtonCore)
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ButtonCore from './ButtonCore';

import './style.less';
import './GhostButton.less';


export default class GhostButton extends Component {

    static propTypes = {
        children    : PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ])
    };

    static defaultProps = {
        className   : ''
    };

    render() {
        const { children, className, ...others } = this.props;

        return (
            <ButtonCore
                {...others}
                className={classNames('btn-ghost', className)}
            >
                {children}
            </ButtonCore>
        );
    }
}