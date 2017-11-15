import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

// components
import Layout from './App/Layout';
import LandingPage from './App/LandingPage';
import EmptyPage from './App/EmptyPage';
import DocButton from './App/DocButton/index';
import DocModal from './App/DocModal/index';
import DocForm from './App/DocForm/index';
import DocAutocomplete from './App/DocAutocomplete/index';
import DocDatetimePicker from './App/DocDatetimePicker/index';
import DocNotification from './App/DocNotification/index';
import DocInView from './App/DocInView/index';
import DocLoader from './App/DocLoader/index';

import './app.less';


// Define your routes here
const __ROUTES = [
    {
        id      : 'landing',
        name    : 'Landing',
        component : LandingPage,
        route   : '/'
    },
    {
        id      : 'button',
        name    : 'Button',
        component : DocButton,
        route   : '/button'
    },
    {
        id      : 'modal',
        name    : 'Modal',
        component : DocModal,
        route   : '/modal'
    },
    {
        id      : 'form',
        name    : 'Form Component',
        component : DocForm,
        route   : '/form'
    },
    {
        id      : 'autocomplete',
        name    : 'Autocomplete',
        component : DocAutocomplete,
        route   : '/autocomplete'
    },
    {
        id      : 'datetimepicker',
        name    : 'Datetime Picker',
        component : DocDatetimePicker,
        route   : '/datetimepicker'
    },
    {
        id      : 'notification',
        name    : 'Notification',
        component : DocNotification,
        route   : '/notification'
    },
    {
        id      : 'inview',
        name    : 'InView',
        component : DocInView,
        route   : '/inview'
    },
    {
        id      : 'loader',
        name    : 'Loader',
        component : DocLoader,
        route   : '/loader'
    },
    {
        id      : 'mediumdraft',
        name    : 'Medium Draft (progress)',
        component : EmptyPage,
        route   : '/mediumdraft'
    }
];


// Render component
// const getComponent = (obj) => {
//  return ({ match }) => obj.component;
// }


// Render App
render((
    <HashRouter>
        <Layout routes={__ROUTES}>
            {__ROUTES.map(obj =>
                <Route
                    key={obj.id}
                    exact={true}
                    path={obj.route}
                    component={obj.component}
                />
            )}
        </Layout>
    </HashRouter>
), document.getElementById('App'));