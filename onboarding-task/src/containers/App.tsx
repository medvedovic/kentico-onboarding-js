import { App as AppComponent } from '../components/App';
import { connect } from 'react-redux';

const mapStateToProps = ({ app }: any) => ({
  showLoader: app.settings.showLoader
});

const App = connect(
  mapStateToProps,
  {}
)(AppComponent);

export { App };
