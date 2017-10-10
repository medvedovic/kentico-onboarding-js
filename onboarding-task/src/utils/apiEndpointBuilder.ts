export const apiEndpointBuilder = (apiEndpoint: string, params?: string): string => {
  if (params)
    return apiEndpoint.concat('/').concat(params);

  return apiEndpoint;
};

