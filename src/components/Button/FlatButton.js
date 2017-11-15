/**
 * Flat Button (using ButtonCore)
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonCore from './ButtonCore';

import './style.less';
import './FlatButton.less';


export default class FlatButton extends Component {

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
                className={classNames('btn-flat', className)}
                rippleTheme="default"
            >
                {children}
            </ButtonCore>
        );
    }
}