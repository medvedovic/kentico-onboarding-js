import { generateGuid } from '../src/utils/generateGuid';

describe('GuidGenerator', () => {
  it('provides correct format', () => {
    expect(/(\w{8}-\w{4}-4\w{3}-\w{4}-\w{12})/.test(generateGuid())).toBe(true);
  });

  it('provides correct length of guid', () => {
    expect(generateGuid().length).toEqual(36);
  });

  it('provides unique values', () => {
    const numberOfIterations = 1000;
    let arr = [];
    for (let i = 0; i < numberOfIterations; i++) {
      arr.push(generateGuid());
    }
    const newArr = arr.filter((x, y) => x !== y);
    arr = null;
    expect(newArr.length).toBe(numberOfIterations);
  });
});
