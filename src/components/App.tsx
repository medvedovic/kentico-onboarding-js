import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/List';
import { Loader } from './uiComponents/Loader';
import { IAppSettings } from '../models/IAppSettings';
import * as PropTypes from 'prop-types';
import { ListOfShortcuts } from './uiComponents/ListOfShortcuts';
import { ErrorPopup } from './uiComponents/ErrorPopup';
import { AppFooter } from './uiComponents/AppFooter';
import { Header } from './uiComponents/Header';

const App: React.SFC<IAppSettings> = ({ isLoading, fetchHasFailed }) => (
  <div>
    <div className="container">
      <Header />
      <div id="app-content">
        {isLoading && (
          <Loader />
        )}
        <List />
      </div>
      {fetchHasFailed && (
        <ErrorPopup />
      )}
      <ListOfShortcuts />
    </div>
    <AppFooter />
  </div>
);
App.displayName = 'App';

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fetchHasFailed: PropTypes.bool.isRequired,
};

export { App };
