/**
 * Modal component
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { render } from 'react-dom';
import { map, assign, remove, uniqueId } from 'lodash-es';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Notification.less';


export default class Notification extends PureComponent {

    static propTypes = {
        fadeoutTime     : PropTypes.number,
        iconError       : PropTypes.string,
        iconSuccess     : PropTypes.string,
        iconInfo        : PropTypes.string
    };

    static defaultProps = {
        fadeoutTime     : 3000,
        iconError       : 'fa fa-exclamation-circle',
        iconSuccess     : 'fa fa-check-circle-o',
        iconInfo        : 'fa fa-info-circle'
    };

    constructor(props) {
        super(props);

        this.state = {
            length  : 0
        };

        // internal variable
        this.__items = [];
        this.__timers = {};
    }

    componentDidMount() {
        // Create wrapper
        this.__el = document.createElement('div');
        this.__el.className = classNames('Notification');
        document.body.appendChild( this.__el );
    }

    componentWillUnmount() {
        // Clear all timers
        map(this.__timers, t => clearTimeout(t));
        // Clear DOM
        document.body.removeChild( this.__el );
    }

    componentDidUpdate() {
        this.renderItems();
    }

    render() {
        // Render nothing
        return null;
    }

    renderItems() {
        const { iconError, iconSuccess, iconInfo } = this.props;

        render((
            <ReactCSSTransitionGroup
                className='Notification-inner'
                transitionName={'slideUp'}
                transitionEnterTimeout={350}
                transitionLeaveTimeout={350}
            >
                {this.__items.map(item =>
                    <div key={item.id} className={classNames('Notification-item', {
                        [`__${item.type}`] : item.type
                    })}>
                        <i className={classNames('Notification-icon', {
                            [iconError]   : item.type === 'error',
                            [iconSuccess] : item.type === 'success',
                            [iconInfo]    : item.type === 'info'
                        })}></i>
                        <p>{item.message}</p>
                    </div>
                )}
            </ReactCSSTransitionGroup>
        ), this.__el);
    }


    // public method
    // Add new notification item
    pushItem(item) {
        const id = uniqueId('notification_');
        this.__items.push( assign(item, { id }) );

        // Update state (force re-render)
        this.setState({
            length  : this.__items.length
        });

        // Add remove queue
        this.__timers[id] = setTimeout(() => {
            this.removeItem(id);
        }, this.props.fadeoutTime);
    }

    removeItem(id) {
        remove(this.__items, item => item.id === id);

        this.setState({
            length : this.__items.length
        });
    }
}