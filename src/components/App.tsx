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
import styled from 'styled-components';

const Container = styled.section`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 12px;

  //@media (min-width: 1440px) {
  //  max-width: 1440px;
  //  padding: 16px;
  //}
`;

const App: React.FC<IAppSettings> = ({ isLoading, fetchHasFailed }) => (
  <>
    <Container>
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
    </Container>
    <AppFooter />
  </>
);
App.displayName = 'App';

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fetchHasFailed: PropTypes.bool.isRequired,
};

export { App };
