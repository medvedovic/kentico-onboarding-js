import { HttpAction } from '../../constants/HttpAction';

export const fetchBuilder = <T>(injectedFetch: (url: string, init?: any) => Promise<Response>, httpMethod: HttpAction) =>
  (url: string, body?: T) => {
    const requestParameters = {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    return injectedFetch(url, requestParameters)
      .then((response) => {
        if (!response.ok)
          throw new Error(response.statusText + ' at ' + response.url);

        switch (httpMethod) {
          case HttpAction.GET:
          case HttpAction.POST:
          case HttpAction.PUT:
            return response.json();
          default:
            return response;
        }
      });
  };
