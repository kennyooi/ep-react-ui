import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './ControlItem.less';


const ControlItem = ({ label, active, ...other }) => (
    <span
        {...other}
        className={classNames('ControlItem', {
            __active: active
        })}
    >
        {label}
    </span>
);

ControlItem.propTypes = {
    label     : PropTypes.string,
    active    : PropTypes.bool
};

export default ControlItem;