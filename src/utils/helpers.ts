export const convertKmhToMs = (value: number): string => {
  return `${(value / 3.6).toFixed(2)}m/s`;
};
