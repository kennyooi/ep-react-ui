/**
 * InView component
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InViewJs from 'in-view';


export default class InView extends PureComponent {

    static propTypes = {
        uniqId      : PropTypes.string.isRequired,  // unique ID for InView to work
        isOnce      : PropTypes.bool,       // trigger once only, (onOutView won't be created)
        onInView    : PropTypes.func,       // trigger when element inview
        onOutView   : PropTypes.func
    };

    static defaultProps = {
        isOnce      : true,
        onInView    : () => {},
        onOutView   : () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            isInView    : false
        };
    }

    componentDidMount() {
        const { uniqId, isOnce, onInView, onOutView } = this.props;

        const inviewObj = InViewJs(`#${uniqId}`);
        if (isOnce) {
            inviewObj
                .once('enter', () => {
                    this.setState({ isInView: true });
                    onInView();
                });
        }
        else {
            inviewObj
                .on('enter', () => {
                    this.setState({ isInView: true });
                    onInView();
                })
                .on('exit', () => {
                    this.setState({ isInView: false });
                    onOutView();
                });
        }
    }

    render() {
        const { children, className, uniqId } = this.props;
        const { isInView } = this.state;

        return (
            <div
                id={uniqId}
                className={classNames('InView', className, { '__inview': isInView })}
            >
                {children}
            </div>
        );
    }
}