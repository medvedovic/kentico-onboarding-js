import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/List';
import { Loader } from './Loader';
import { IAppSettings } from '../constants/AppSettings';

export const App: React.SFC<IAppSettings> = ({ showLoader, apiEndpoint, fetchHasFailed }: IAppSettings) => (
  <div>
    <div className="container">
      <div className="header clearfix">
        <h3 className="text-muted">Kentico Academy</h3>
      </div>

      <div id="app-content">
        {
          showLoader &&
          <Loader />
        }
        <List apiEndpoint={apiEndpoint} />
      </div>

      {
        fetchHasFailed &&
        <div className="error-wrapper">
          <div className="error-message">
            <i>X</i>
            <b>Something went wrong :(</b>
            <p>Hit "F5" to reload application</p>
          </div>
        </div>
      }

      <section className="shortcuts">
        <h3>List of shortcuts</h3>
        <ul>
          <li><code>alt + n</code>Focus main input</li>
          <li><code>escape</code>Cancel</li>
        </ul>
        <p>More to be added...</p>
      </section>

    </div>

    <footer className="footer">
      <p>&copy; 2016 Kentico Software</p>
    </footer>
  </div>
);

App.displayName = 'App';
