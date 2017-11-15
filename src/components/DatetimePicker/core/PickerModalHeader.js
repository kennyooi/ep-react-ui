import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './PickerModalHeader.less';


export default class PickerModalHeader extends PureComponent {

    static propTypes = {
        momentValue     : PropTypes.object,     // current picker moment object
        type            : PropTypes.string,     // datepicker type
        view            : PropTypes.string,     // active view: 'date'*, 'year'
        disableYear     : PropTypes.bool,       // disable year view
        disableTime     : PropTypes.bool,       // disable time view
        onChange        : PropTypes.func
    };

    constructor(props) {
        super(props);

        // variables
        this.__isPrev = false;

        // actions
        this._onChangeView = this._onChangeView.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.momentValue.isSame(this.props.momentValue)) {
            this.__prev = nextProps.momentValue.isBefore( this.props.momentValue );
        }
    }

    render() {
        return (
            <div className='PickerModalHeader'>
                {this.renderSectionYear()}
                {this.renderSectionDate()}
                {this.renderSectionTime()}
            </div>
        );
    }

    renderSectionDate() {
        const { momentValue, type, view } = this.props;

        // disable on time type
        if (type === 'time') {
            return;
        }

        return (
            <div
                className={classNames('PickerModalHeader-date __is-large', {
                    '__is-active'   : view === 'date'
                })}
                data-view='date'
                onClick={this._onChangeView}
            >
                <ReactCSSTransitionGroup
                    transitionName={this.__isPrev ? 'slideUp' : 'slideDown'}
                    transitionEnterTimeout={350}
                    transitionLeaveTimeout={350}
                >
                    <span key={momentValue.format('YYYY-MM-DD')}>{momentValue.format('ddd, MMM D')}</span>
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    renderSectionYear() {
        const { momentValue, type, view, disableYear } = this.props;

        // disable on time type
        if (type === 'time') {
            return;
        }

        return (
            <div
                className={classNames('PickerModalHeader-year', {
                    '__is-active'   : view === 'year'
                })}
                data-view='year'
                onClick={!disableYear ? this._onChangeView : null}
            >
                <ReactCSSTransitionGroup
                    transitionName={this.__isPrev ? 'slideUp' : 'slideDown'}
                    transitionEnterTimeout={350}
                    transitionLeaveTimeout={350}
                >
                    <span key={momentValue.format('YYYY')}>{momentValue.format('YYYY')}</span>
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    renderSectionTime() {
        const { momentValue, type, view, disableTime } = this.props;

        // disable on date type
        if (type === 'date') {
            return;
        }

        return (
            <div
                className={classNames('PickerModalHeader-time', {
                    '__is-active'   : view === 'time',
                    '__is-large'    : type === 'time'
                })}
                data-view='time'
                onClick={!disableTime ? this._onChangeView : null}
            >
                <span>{momentValue.format('h:mm')}<small>{momentValue.format('A')}</small></span>
            </div>
        );
    }

    _onChangeView(e) {
        const view = (e.currentTarget.dataset || {}).view;

        if (view && this.props.onChange) {
            this.props.onChange(view);
        }
    }
}