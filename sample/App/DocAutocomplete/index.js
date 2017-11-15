import React, { Component } from 'react';

import DocAutocomplete from './DocAutocomplete';
import DocSelectAutocomplete from './DocSelectAutocomplete';
import DocGeoAutocomplete from './DocGeoAutocomplete';


export default class DocAutocompletePage extends Component {

    render() {
        return (
            <div className="page">
                <header className="page-title">
                    <div className="container">
                        <h1>Autocomplete Component</h1>
                        <p>Autocomplete, suggestion, & Geolocation suggestion input.</p>
                    </div>
                </header>

                <div className="page-content">
                    <div className="container">
                        <DocAutocomplete />
                        <hr className="seperator" />

                        <DocSelectAutocomplete />
                        <hr className="seperator" />

                        <DocGeoAutocomplete />
                    </div>
                </div>
            </div>
        );
    }
}