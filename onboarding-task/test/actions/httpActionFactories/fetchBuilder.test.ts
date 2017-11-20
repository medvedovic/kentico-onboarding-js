import 'isomorphic-fetch';
import { fetchBuilder } from '../../../src/actions/httpActionFactories/fetchBuilder';
import { HttpAction } from '../../../src/constants/HttpAction';

const mockResponse = (status: number, statusText: string, response?: any) =>
  new Response(response, {
    status,
    statusText,
    headers: {
      'Content-Type': 'applications/json'
    }
  });

describe('httpActionBuilder', () => {
  it('returns object', async () => {
    const mockBody = {foo: 'bar'};
    const myFetch = jest.fn((_url: string, _body?: any) =>
      Promise.resolve(mockResponse(201, 'Created', JSON.stringify(mockBody))));
    const mockFetch = fetchBuilder(myFetch);

    const result = await mockFetch('', HttpAction.GET, undefined)
      .then(response => response.json());

    expect(result).toEqual(mockBody);
  });

  it('returns response', async () => {
    const myFetch = jest.fn((_url: string, _body?: any) =>
      Promise.resolve(mockResponse(204, 'Created')));
    const mockFetch = fetchBuilder(myFetch);

    const result = await mockFetch('', HttpAction.DELETE, undefined);

    expect(result).toBeInstanceOf(Response);
    expect(result.status).toBe(204);
  });

  it('throws an error', () => {
    const myFetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockResponse(500, 'Internal server error', undefined)));


    const result = fetchBuilder(myFetch)('', HttpAction.GET);


    expect(result).toThrow();
  });
});
