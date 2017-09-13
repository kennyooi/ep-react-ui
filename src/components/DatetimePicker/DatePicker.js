/**
 * Date picker input
 */
import { PureComponent } from 'react';
import moment from 'moment';
import { isEqual } from 'lodash';
import { Modal } from '../Modal';
import { FlatButton } from '../Button';
import { InputField } from '../Form';
import PickerModalHeader from './core/PickerModalHeader';
import PickerModalCalendar from './core/PickerModalCalendar';
import PickerModalYear from './core/PickerModalYear';

import style from './DatePicker.less';


export default class DatePicker extends PureComponent {

	static propTypes = {
		value 			: PropTypes.string, 	// input value, moment default format
		type 			: PropTypes.string, 	// datePicker type, ['date', 'datetime', 'time']
		min 			: PropTypes.string, 	// min date value, moment default format
		max 			: PropTypes.string, 	// max date value, moment default format
		format 			: PropTypes.string, 	// value format
		timeInterval 	: PropTypes.number, 	// time interval between minutes
		displayFormat 	: PropTypes.string, 	// display format
		disableYear 	: PropTypes.bool, 		// disable year change
		disableInput 	: PropTypes.bool, 		// disable input field, replace with button text
		inputProps 		: PropTypes.object, 	// extra props for input
		onChange 		: PropTypes.func, 		// trigger when date changed
	};

	static defaultProps = {
		type 			: 'date',
		value 			: '',
		timeInterval 	: 15,
		format 			: 'YYYY-MM-DD HH:mm',
		displayFormat 	: 'ddd, MMM D YYYY, h:mm A',
		inputProps 		: {},
	};

	constructor(props) {
		super(props);

		this.state = {
			isShowModal 	: false, 	// modal flag
			currentView 	: 'date',	// calendar view
			selectedDate 	: null,		// calendar date
			isPrev 			: false, 	// flag for animation, whether new date is after / before 
		};

		// actions
		this._onConfirm = this._onConfirm.bind(this);
		this._onOpenModal = this._onOpenModal.bind(this);
		this._onCloseModal = this._onCloseModal.bind(this);
		this._onChangeView = this._onChangeView.bind(this);
		this._onChangeDate = this._onChangeDate.bind(this);
	}

  	render() {
  		const { children, value, format, displayFormat, inputProps } = this.props;
  		const { isShowModal } = this.state;

  		const formatted_value = value ? moment(value, format).format(displayFormat) : '';

  		return (
  			<div>
  				<InputField 
  					{...inputProps}
  					className={classNames('DatetimePicker-input', inputProps.className)}
  					value={formatted_value}
  					readOnly={true}
  					onFocus={this._onOpenModal}
  				/>

  				<Modal 
					className="DatetimePickerModal"
					isShow={isShowModal}
					onRequestClose={this._onCloseModal}
				>
					{this.renderModalContent()}
				</Modal>
  			</div>
		)
  	}

  	renderModalContent() {
  		const { disableYear } = this.props;
  		const { isShowModal, selectedDate, currentView, min, max, isPrev } = this.state;

  		if (!isShowModal) {
  			return null;
  		}

  		return (
  			<div className="DatetimePickerModal-content">
				<div className="DatetimePickerModal-header">
					<PickerModalHeader
						type='date'
						disableYear={disableYear}
						view={currentView}
						isPrev={isPrev}
						momentValue={selectedDate}
						onChange={this._onChangeView}
					/>
				</div>
				<div className="DatetimePickerModal-body">
					{currentView === 'date' &&
						<PickerModalCalendar
							min={min}
							max={max}
							momentValue={selectedDate}
							onChange={this._onChangeDate}
						/>
					}

					{currentView === 'year' &&
						<PickerModalYear
							min={min}
							max={max}
							momentValue={selectedDate}
							onChange={this._onChangeDate}
						/>
					}
				</div>
				<div className="DatetimePickerModal-footer">
					<FlatButton 
						theme="default"
						onClick={this._onCloseModal}
					>
						CANCEL
					</FlatButton>
					<FlatButton 
						theme="orange"
						onClick={this._onConfirm}
					>
						OK
					</FlatButton>
				</div>
			</div>
		)
  	}

	// renderModalContent2() {
	// 	const { value, type, format, displayFormat, onChange, disableYear, min, max, timeInterval } = this.props;
	// 	const { selectedDate, currentView, isShowModal } = this.state;

	// 	if (!isShowModal) {
	// 		return null;
	// 	}

	// 	return (
	// 		<div className="DatePickerModal-content">
	// 			<div className="DatePickerModal-header">
	// 				<DatePickerHeader
	// 					format={format}
	// 					view={currentView}
	// 					type={type}
	// 					disableYear={disableYear}
	// 					value={selectedDate}
	// 					onChange={this._onChange.bind(this, 'currentView')}
	// 				/>
	// 			</div>
	// 			<div className="DatePickerModal-body">
	// 				{currentView === 'date' &&
	// 					type !== 'time' &&
	// 					<DatePickerCalendar
	// 						min={min}
	// 						max={max}
	// 						format={format}
	// 						value={selectedDate}
	// 						onChange={this._onChange.bind(this, 'selectedDate')}
	// 					/>
	// 				}
	// 				{currentView === 'year' &&
	// 					type !== 'time' &&
	// 					<DatePickerYears 
	// 						min={min}
	// 						max={max}
	// 						format={format}
	// 						value={selectedDate}
	// 						onChange={this._onChange.bind(this, 'selectedDate')}
	// 					/>
	// 				}
	// 				{currentView === 'time' &&
	// 					type !== 'date' &&
	// 					<DatePickerTime
	// 						format={format}
	// 						timeInterval={timeInterval}
	// 						value={selectedDate}
	// 						onChange={this._onChange.bind(this, 'selectedDate')}
	// 					/>
	// 				}
	// 			</div>
	// 			<div className="DatePickerModal-footer">
	// 				<FlatButton 
	// 					theme="default"
	// 					onClick={this._onCloseModal}
	// 				>
	// 					CANCEL
	// 				</FlatButton>
	// 				<FlatButton 
	// 					theme="orange"
	// 					onClick={this._onConfirm}
	// 				>
	// 					OK
	// 				</FlatButton>
	// 			</div>
	// 		</div>
	// 	)
	// }


	// actions
	_onOpenModal() {
		const { value, format } = this.props;

		this.setState({
			isShowModal  : true,
			selectedDate : value ? moment(value, format) : moment(),
		});
	}

	_onCloseModal() {
		this.setState({
			isShowModal  : false,
			selectedDate : null,
		});
	}

	_onChangeView(view) {
		this.setState({ 
			currentView : view 
		});
	}

	_onChangeDate(momentObj) {
		this.setState({
			selectedDate : momentObj,
			isPrev 		 : momentObj.isBefore(this.state.selectedDate),
		});
	}

	_onConfirm() {
		const { selectedDate } = this.state;

		if (this.props.onChange) {
			this.props.onChange( selectedDate );
		}

		this._onCloseModal();
	}
} 