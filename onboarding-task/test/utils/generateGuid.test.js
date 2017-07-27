import { generateGuid } from '../../src/utils/generateGuid';

describe('generateGuid', () => {
  it('provides correct format', () => {
    const regex = /(\w{8}-\w{4}-4\w{3}-\w{4}-\w{12})/;
    const guid = generateGuid();

    const isMatch = regex.test(guid);

    expect(isMatch).toBe(true);
  });

  it('provides correct length of guid', () => {
    const guid = generateGuid();

    expect(guid.length).toEqual(36);
  });

  it('provides unique values', () => {
    const numberOfIterations = 100;
    const generatedGuids = [];

    for (let i = 0; i < numberOfIterations; i++) {
      generatedGuids.push(generateGuid());
    }
    const uniqueGuids = new Set(generatedGuids);

    expect(uniqueGuids.size).toBe(numberOfIterations);
  });
});
