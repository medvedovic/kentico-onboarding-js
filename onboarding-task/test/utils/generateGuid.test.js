import { generateGuid } from '../../src/utils/generateGuid';

describe('generateGuid', () => {
  it('provides correct format', () => {
    const regex = /(\w{8}-\w{4}-4\w{3}-\w{4}-\w{12})/;
    const guid = generateGuid();

    const result = regex.test(guid);

    expect(result).toBe(true);
  });

  it('provides correct length of guid', () => {
    const result = generateGuid().length;

    expect(result).toEqual(36);
  });

  it('provides unique values', () => {
    const numberOfIterations = 100;
    let arr = [];

    for (let i = 0; i < numberOfIterations; i++) {
      arr.push(generateGuid());
    }
    const set = new Set(arr);
    arr = null;

    expect(set.size).toBe(numberOfIterations);
  });
});
