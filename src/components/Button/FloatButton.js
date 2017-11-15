/**
 * Float Button (using ButtonCore)
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonCore from './ButtonCore';

import './style.less';
import './FloatButton.less';


export default class FloatButton extends Component {

    static propTypes = {
        theme       : PropTypes.string,
        children    : PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ])
    };

    static defaultProps = {
        className   : '',
        theme       : 'default'
    };

    render() {
        const { children, className, theme, ...others } = this.props;

        return (
            <ButtonCore
                {...others}
                className={classNames('btn-float', className)}
                theme={theme}
                rippleTheme={theme === 'default' ? 'default' : 'light'}
            >
                {children}
            </ButtonCore>
        );
    }
}