import { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { times } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './PickerModalYear.less';


export default class PickerModalYear extends Component {

	static propTypes = {
		momentValue : PropTypes.object, 	// current picker moment object
		min 		: PropTypes.object, 	// min date value, moment default format
		max 		: PropTypes.object, 	// max date value, moment default format
		yearsGap 	: PropTypes.number, 	// years gap from this year 
		onChange 	: PropTypes.func, 		// when calendar date changed
	};

	static defaultProps = {
		yearsGap 	: 5,
	};

	constructor(props) {
		super(props);

		// actions
		this._onSelect = this._onSelect.bind(this);
	}

  	componentDidMount() {
  		this.doSetScrollTop();
  	}

  	componentDidUpdate() {
  		this.doSetScrollTop();
  	}

	render() {
		const { yearsGap } = this.props;

		const currentYear = parseInt(moment().format('YYYY'));

		// start loop
		let startYear = currentYear - yearsGap;
		const childs = [];
		while((currentYear + yearsGap) >= startYear) {
			childs.push( this.renderItem(startYear) );
			startYear++;
		}
		
		return (
			<div className="PickerModalYear" ref={el => this.__el = el}>
				{childs}
			</div>
		)
	}

	renderItem(year) {
		const { momentValue, min, max } = this.props;

		const classNameArr = [];
		// selected
		if (year === parseInt(momentValue.format('YYYY'))) {
			classNameArr.push('__is-select');
		}
		// min & max
		if (min && parseInt(min.format('YYYY')) > year) {
			classNameArr.push('__is-disabled');
		}
		else if (max && parseInt(max.format('YYYY')) < year) {
			classNameArr.push('__is-disabled');
		}

		return (
			<div key={year}
				id={`year_${year}`}
				className={classNames('PickerModalYear-item', classNameArr)}>
				{classNameArr.indexOf('__is-disabled') !== -1 &&
					<span>{year}</span>
				}

				{classNameArr.indexOf('__is-disabled') === -1 &&
					<a href="#"
						data-year={year}
						onClick={this._onSelect}>{year}</a>
				}
			</div>
		)
	}

	//actions
	_onSelect(e) {
		e.preventDefault();

		const { momentValue, min, max } = this.props;

		// new moment date
		let newDate = moment(momentValue).year( e.currentTarget.dataset.year );

		// Check min & max date allowed
		if (min && newDate.isBefore(min)) {
			newDate = moment(min);
		}
		else if (max && newDate.isAfter(max)) {
			newDate = moment(max);
		}

		if (this.props.onChange) {
			this.props.onChange(newDate);
		}
	}

	// internal
	doSetScrollTop() {
		const { momentValue } = this.props;

  		const selectedEl = document.getElementById( 'year_' + momentValue.format('YYYY') );
  		this.__el.scrollTop = selectedEl.offsetTop - (this.__el.clientHeight - selectedEl.clientHeight)/2;
	}
} 