 // export const apiEndpoint = (process.env.NODE_ENV === 'production')
 // ? 'http://patrikm-todo-app.azurewebsites.net/api/v1/todos'
 // : '/api/v1/todos';

export const apiEndpoint = `${process.env.API_URL}/api/v1/todos`;
