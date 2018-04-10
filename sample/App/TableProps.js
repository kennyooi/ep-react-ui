import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// styles
import './TableProps.less';


export default class TableProps extends Component {

    static propTypes = {
        name    : PropTypes.string,
        dataset : PropTypes.array
    };

    static defaultProps = {
        name    : 'Properties'
    };

    render() {
        const { className, name, dataset } = this.props;

        return (
            <div className={classNames('TableProps', className)}>
                <h4 className='TableProps-header'>{name}</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th width='13%'>Name</th>
                            <th width='7%'>Type</th>
                            <th width='7%'>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(dataset || []).map((item, index) =>
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td><small className='TableProps-val-type'>{item.type}</small></td>
                                <td>{item.default &&
                                    <small className='TableProps-val-default'>{item.default}</small>
                                }</td>
                                <td>{item.desc}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}