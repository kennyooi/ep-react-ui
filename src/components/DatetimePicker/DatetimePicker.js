/**
 * Date picker input
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { Modal } from '../Modal';
import { FlatButton } from '../Button';
import { InputField } from '../Form';
import PickerModalHeader from './core/PickerModalHeader';
import PickerModalCalendar from './core/PickerModalCalendar';
import PickerModalYear from './core/PickerModalYear';
import PickerModalTime from './core/PickerModalTime';

import './DatetimePicker.less';


export default class DatetimePicker extends PureComponent {

    static propTypes = {
        name            : PropTypes.string,     // input name, will be return in second params
        value           : PropTypes.string,     // input value, moment default format
        type            : PropTypes.string,     // datePicker type, ['date', 'datetime', 'time']
        min             : PropTypes.object,     // min date value, moment default format
        max             : PropTypes.object,     // max date value, moment default format
        format          : PropTypes.string,     // value format
        timeInterval    : PropTypes.number,     // time interval between minutes
        displayFormat   : PropTypes.string,     // display format
        disableYear     : PropTypes.bool,       // disable year change
        inputProps      : PropTypes.object,     // extra props for input
        txtCancel       : PropTypes.string,     // cancel button text
        txtConfirm      : PropTypes.string,     // confirm button text
        onChange        : PropTypes.func,       // trigger when date changed
        onRenderDay     : PropTypes.func        // apply extra custom classNames to day
    };

    static defaultProps = {
        type            : 'datetime',
        value           : '',
        timeInterval    : 15,
        format          : 'YYYY-MM-DD HH:mm',
        displayFormat   : 'ddd, MMM D YYYY, h:mm A',
        inputProps      : {},
        txtCancel       : 'Cancel',
        txtConfirm      : 'Select'
    };

    constructor(props) {
        super(props);

        this.state = {
            isShowModal     : false,    // modal flag
            currentView     : props.type == 'time' ? 'time' : 'date',   // calendar view
            selectedDate    : null      // calendar date
        };

        // actions
        this._onConfirm = this._onConfirm.bind(this);
        this._onOpenModal = this._onOpenModal.bind(this);
        this._onCloseModal = this._onCloseModal.bind(this);
        this._onChangeView = this._onChangeView.bind(this);
        this._onChangeDate = this._onChangeDate.bind(this);
    }

    render() {
        const { value, format, displayFormat, inputProps } = this.props;
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
        );
    }

    renderModalContent() {
        const { disableYear, min, max, type, timeInterval, onRenderDay, txtCancel, txtConfirm } = this.props;
        const { isShowModal, selectedDate, currentView } = this.state;

        if (!isShowModal) {
            return null;
        }

        return (
            <div className="DatetimePickerModal-content">
                <div className="DatetimePickerModal-header">
                    <PickerModalHeader
                        type={type}
                        disableYear={disableYear}
                        view={currentView}
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
                            onRenderDay={onRenderDay}
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

                    {currentView === 'time' &&
                        <PickerModalTime
                            min={min}
                            max={max}
                            timeInterval={timeInterval}
                            momentValue={selectedDate}
                            onChange={this._onChangeDate}
                        />
                    }
                </div>
                <div className="DatetimePickerModal-footer">
                    <FlatButton
                        theme="default"
                        onClick={this._onCloseModal}
                    >{txtCancel}</FlatButton>
                    <FlatButton
                        theme="orange"
                        onClick={this._onConfirm}
                    >{txtConfirm}</FlatButton>
                </div>
            </div>
        );
    }


    // actions
    _onOpenModal() {
        const { type, value, format } = this.props;

        this.setState({
            isShowModal  : true,
            currentView  : type == 'time' ? 'time' : 'date',
            selectedDate : value ? moment(value, format) : moment()
        });
    }

    _onCloseModal() {
        this.setState({
            isShowModal  : false,
            selectedDate : null
        });
    }

    _onChangeView(view) {
        this.setState({
            currentView : view
        });
    }

    _onChangeDate(momentObj) {
        this.setState({
            selectedDate : momentObj
        });
    }

    _onConfirm() {
        const { format, name } = this.props;
        const { selectedDate } = this.state;

        if (this.props.onChange) {
            this.props.onChange( selectedDate.format(format), name );
        }

        this._onCloseModal();
    }
}