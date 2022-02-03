export const convertKmhToMs = (value: number): string => {
  return `${(value / 3.6).toFixed(2)}m/s`;
};

export const getMostFrequent = (arr: string[]) => {
  const hashmap = arr.reduce<Record<string, number>>((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
};
