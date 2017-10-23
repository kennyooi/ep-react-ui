/**
 * Geo location Autocomplete (using SelectAutocomplete) 
 */
import { Component } from 'react';
import SelectAutocomplete from './SelectAutocomplete';

import './GeoAutocomplete.less';


export default class GeoAutocomplete extends Component {

	static propTypes = {
		acOptions : PropTypes.object,
	};

	// @ref => https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
	static defaultProps = {
		acOptions : {}
	};

	constructor(props) {
		super(props);

		// actions
		this._onLoadItems = this._onLoadItems.bind(this);
		this._onSelect = this._onSelect.bind(this);
	}

	render() {
		const { className, ...other } = this.props;

		return (
			<SelectAutocomplete
				{...other}
				className={classNames('GeoAutocomplete', className)}
				loadItems={this._onLoadItems}
				onRender={this._onRender}
				onSelect={this._onSelect}
			/>
		)
	}

	/**
	 * Internal
	 */
	doAutocompleteService(val) {
		return new Promise((resolve, reject) => {
			if (!this.__acService) {
				this.__acService = new google.maps.places.AutocompleteService();
			}

			// this.__acService.getQueryPredictions({ 
			this.__acService.getPlacePredictions(Object.assign(this.props.acOptions, { input: val }), (results, status) => { 
				// success -> resolve
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					resolve(results.map(obj => ({
						id 	 : obj.place_id,
						name : obj.structured_formatting.main_text,
						sub  : obj.structured_formatting.secondary_text || '',
					})));
				}
				// error -> reject
				else {
					reject();
				}
			})
		})
	}

	doPlaceService(place_id) {
		return new Promise((resolve, reject) => {
			if (!this.__placeService) {
				// as Google place service require map DOM, hence simply inject empty div on body
				const tempMap = document.createElement('span');
				this.__placeService = new google.maps.places.PlacesService( tempMap );
			}

			this.__placeService.getDetails({ placeId: place_id }, (result, status) => {
				// success -> resolve
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					resolve(result);
				}
				// error -> reject
				else {
					reject();
				}
			})
		})
	}

	// actions
	_onLoadItems(keyword) {
		return this.doAutocompleteService(keyword);
	}

	_onRender(item) {
		return (
			<div className="GeoAutocomplete-item">
				<strong>{item.name}</strong>
				<small>{item.sub}</small>
			</div>
		)
	}

	_onSelect(item) {
		const { onSelect } = this.props;

		return this.doPlaceService(item.id)
			.then(resp => onSelect ? onSelect(resp) : resp);
	} 
} 