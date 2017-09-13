import { Component } from 'react'; 
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

// components
import Layout from './App/Layout';
import DocButton from './App/DocButton/index';
import DocModal from './App/DocModal/index';
import DocForm from './App/DocForm/index';
import DocAutocomplete from './App/DocAutocomplete/index';
import DocDatetimePicker from './App/DocDatetimePicker/index';

import style from './app.less';


// Define your routes here
const __ROUTES = [
	{
		id 		: 'button',
		name 	: 'Button',
		component : DocButton,
		route 	: '/button',
	},
	{
		id 		: 'modal',
		name 	: 'Modal',
		component : DocModal,
		route 	: '/modal',
	},
	{
		id 		: 'form',
		name 	: 'Form',
		component : DocForm,
		route 	: '/form',
	},
	{
		id 		: 'autocomplete',
		name 	: 'Autocomplete',
		component : DocAutocomplete,
		route 	: '/autocomplete',
	},
	{
		id 		: 'datetimepicker',
		name 	: 'DatetimePicker',
		component : DocDatetimePicker,
		route 	: '/datetimepicker',
	}
]


// Render component
// const getComponent = (obj) => {
// 	return ({ match }) => obj.component;
// }


// Render App
render((
	<HashRouter>
		<Layout routes={__ROUTES}>
			{__ROUTES.map(obj =>
				<Route 
					key={obj.id} 
					path={obj.route}
					component={obj.component}
				/>
			)}
		</Layout>
	</HashRouter>
), document.getElementById('App'));