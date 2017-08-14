import { generateGuid } from '../../src/utils/generateGuid';

describe('generateGuid', () => {
  it('provides correct format', () => {
    const regex = /(\w{8}-\w{4}-4\w{3}-\w{4}-\w{12})/;
    const id = generateGuid();

    const isMatch = regex.test(id);

    expect(isMatch).toBe(true);
  });

  it('provides correct length of id', () => {
    const id = generateGuid();

    expect(id.length).toEqual(36);
  });

  it('provides unique values', () => {
    const numberOfIterations = 100;
    const generatedGuids = [];

    for (let i = 0; i < numberOfIterations; i++) {
      generatedGuids.push(generateGuid());
    }
    const uniqueIds = new Set(generatedGuids);

    expect(uniqueIds.size).toBe(numberOfIterations);
  });
});
