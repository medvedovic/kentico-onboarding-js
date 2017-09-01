import { App as AppComponent } from '../components/App';
import { connect } from 'react-redux';
import { Store } from '../reducers/stores';

const mapStateToProps = ({ app: {
  settings: {
    showLoader, apiEndpoint, fetchHasFailed
  } } }: Store.IRoot) => ({
  showLoader: showLoader,
  apiEndpoint: apiEndpoint,
  fetchHasFailed: fetchHasFailed,
});

const App = connect(
  mapStateToProps,
  {}
)(AppComponent);

export { App };
