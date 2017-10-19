export const fetchBuilder = (injectedFetch: (url: string, init?: any) => Promise<Response>) =>
  (url: string, httpMethod: string = 'GET', body?: any) => {
    const requestParameters = {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    return injectedFetch(url, requestParameters)
      .then((response: Response) => {
        if (!response.ok)
          throw new Error(response.statusText + ' at ' + response.url);

        return response;
      });
  };
