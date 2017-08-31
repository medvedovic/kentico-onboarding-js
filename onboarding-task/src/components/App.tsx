import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/List';
import { Loader } from './Loader';
import { IAppSettings } from '../reducers/app/settings';

export const App: React.SFC<IAppSettings> = ({ showLoader, apiEndpoint }: IAppSettings) => (
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
