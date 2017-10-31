import 'isomorphic-fetch';
import { fetchBuilder } from '../../../src/actions/httpActionFactories/fetchBuilder';

const mockResponse = (status: number, statusText: string, response: any) =>
  new Response(response, {
    status,
    statusText,
    headers: {
      'Content-Type': 'applications/json'
    }
  });

describe('httpActionBuilder', () => {
  it('returns response', () => {
    const mockBody = { foo: 'bar' };
    const myFetch = jest.fn((_url: string, _body?: any) =>
      Promise.resolve(mockResponse(201, 'Created', JSON.stringify(mockBody))));


    const mockFetch = fetchBuilder(myFetch);

    return mockFetch('', '', undefined)
      .then((response: Response) => {
        expect(response).toBeTruthy();
        expect(response).toBeInstanceOf(Response);
      }).catch((error) => {
        expect(error).toBeNull();
      });
  });

  it('throws an error', () => {
    const myFetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockResponse(500, 'Internal server error', undefined)));


    const result = fetchBuilder(myFetch)('', '');


    expect(result).toThrow();
  });
});
