const PRODUCTION = 'production';
const apiPrefix = 'api/v1/todos';
const apiUrl = 'http://patrikm-todo-app.azurewebsites.net';

function getConfig(env) {
  process.env.API_URL = env.NODE_ENV === PRODUCTION
    ? apiUrl
    : '';
}

module.exports = getConfig;
