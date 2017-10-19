import { apiEndpointBuilder } from '../../src/utils/apiEndpointBuilder';

const apiEndpoint = 'api/endpoint';

describe('apiEndpointBuilder', () => {
  it('builds uri from string', () => {
    const expectedResult = 'api/endpoint/12345678';
    const params = '12345678';

    const testResult = apiEndpointBuilder(apiEndpoint, params);

    expect(testResult).toEqual(expectedResult);
  });

  it('builds uri when params are undefined', () => {
    const expectedResult = 'api/endpoint';

    const testResult = apiEndpointBuilder(apiEndpoint, undefined);

    expect(testResult).toEqual(expectedResult);
  });
});
