import { Promise } from 'es6-promise';
import { httpActionBuilder } from '../../src/actions/httpActionBuilder';

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


    const mockFetch = httpActionBuilder(myFetch);

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


    const result = httpActionBuilder(myFetch)('', '');


    expect(result).toThrow();
  });
});
