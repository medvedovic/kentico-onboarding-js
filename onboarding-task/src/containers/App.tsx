import { App as AppComponent } from '../components/App';
import { connect } from 'react-redux';
import { Store } from '../reducers/stores';

const mapStateToProps = ({ app }: Store.IRoot) => ({
  showLoader: app.settings.showLoader,
  apiEndpoint: app.settings.apiEndpoint,
});

const App = connect(
  mapStateToProps,
  {}
)(AppComponent);

export { App };
