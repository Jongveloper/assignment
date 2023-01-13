export const kFormatter = (num : number) => (num <= 999
  ? num : `${((num / 1000)).toFixed(1).replace('.0', '')}k`
);
