import { PureComponent } from 'react';
import moment from 'moment';
import { isEqual } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import style from './PickerModalHeader.less';


export default class PickerModalHeader extends PureComponent {

	static propTypes = {
		momentValue 	: PropTypes.object, 	// current picker moment object
		type 			: PropTypes.string, 	// datepicker type
		view 			: PropTypes.string, 	// active view: 'date'*, 'year'
		disableYear 	: PropTypes.bool, 		// disable year view
		disableTime 	: PropTypes.bool, 		// disable time view
	};

	constructor(props) {
		super(props);

		// actions
		this._onChangeView = this._onChangeView.bind(this);
	}

  	// componentWillReceiveProps(nextProps, nextState) {
  	// 	if (!isEqual(nextProps.value, this.props.value)) {
  	// 		this.__isPrev = moment(nextProps.value, nextProps.format).isBefore(moment(this.props.value, this.props.format));
  	// 	}
  	// }

	render() {
		return (
			<div className="PickerModalHeader">
				{this.renderSectionYear()}
				{this.renderSectionDate()}
				{this.renderSectionTime()}
			</div>
		)
	}

	renderSectionDate() {
		const { momentValue, type, view, isPrev } = this.props;

		// disable on time type
		if (type === 'time') {
			return;
		}

		return (
			<div className={classNames("PickerModalHeader-date __is-large", {
					'__is-active' 	: view === 'date'
				})}
	        	data-view="date"
				onClick={this._onChangeView}
			>
	        	<ReactCSSTransitionGroup 
					transitionName={isPrev ? "slideUp" : "slideDown"}
					transitionEnterTimeout={350} 
					transitionLeaveTimeout={350}
				>
	          		<span key={momentValue.format('YYYY-MM-DD')}>{momentValue.format('ddd, MMM D')}</span>
	        	</ReactCSSTransitionGroup>
	        </div>
		)
	}

	renderSectionYear() {
		const { momentValue, type, view, disableYear, isPrev } = this.props;

		// disable on time type
		if (type === 'time') {
			return;
		}

		return (
			<div className={classNames("PickerModalHeader-year", {
					'__is-active' 	: view === 'year',
				})}
				data-view="year"
				onClick={!disableYear ? this._onChangeView : null}
			>
				<ReactCSSTransitionGroup
					transitionName={isPrev ? "slideUp" : "slideDown"} 
					transitionEnterTimeout={350} 
					transitionLeaveTimeout={350}
				>
	          		<span key={momentValue.format('YYYY')}>{momentValue.format('YYYY')}</span>
	        	</ReactCSSTransitionGroup>
	        </div>
		)
	}

	renderSectionTime() {
		const { momentValue, type, view, disableTime, isPrev } = this.props;

		// disable on date type
		if (type === 'date') {
			return;
		}

		return (
			<div  className={classNames("PickerModalHeader-time", {
	        		'__is-active' 	: view === 'time',
	        		'__is-large' 	: type === 'time',
	        	})}
	        	data-view="time"
	        	onClick={!disableTime ? this._onChangeView : null}
	        >
	        	<span>{momentValue.format('h:mm')}<small>{momentValue.format('A')}</small></span>
	        </div>
		)
	}

	_onChangeView(e) {
		const view = (e.currentTarget.dataset || {}).view;

		if (view && this.props.onChange) {
			this.props.onChange(view);
		}
	}
} 