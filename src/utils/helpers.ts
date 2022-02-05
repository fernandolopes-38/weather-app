export const convertKmhToMs = (value: number): string => {
  return `${(value / 3.6).toFixed(2)}m/s`;
};

export const formatDate = (date: Date) => {
 return Intl.DateTimeFormat("pt-BR", {
   hour: "2-digit",
   minute: "2-digit"
 }).format(date);
}