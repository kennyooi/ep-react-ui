/**
 * Select Automcomplete component (extends Autocomplete)
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map, findIndex } from 'lodash';
import Autocomplete from './Autocomplete';


export default class SelectAutocomplete extends Autocomplete {

    renderDropdown() {
        const { isShow, isLoading, items } = this.state;

        // not focus
        if (!isShow) {
        	return;
        }

        // loading state
        let content = '';
        if (isLoading) {
        	content = ( <li className="Autocomplete-item __is-loading">Loading ...</li> )
        } 
        // empty state
        else if (isEmpty(items)) {
        	content = ( <li className="Autocomplete-item __is-empty">No result</li> )
        }
        // items state
        else {
        	content = items.map(this.renderDropdownItem.bind(this));
        }

        return (
            <div className="Autocomplete-list">
                {content}
            </div>
        )
    }
}