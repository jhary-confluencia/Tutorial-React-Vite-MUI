export const removeItem = (arr: any[], index: number) => {
  arr.splice(index, 1);
};
export const modifyItem = (arr: any[], index: number, newValue: any) => {
  arr.splice(index, 1, newValue);
};
