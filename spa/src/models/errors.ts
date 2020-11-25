export default interface Errors {
  login: () => void,
}

export interface Tools {
  MONTHS: string[],
  getMonth: (month: string) => string,
  getMonthsOptions: () => any,
  getJsonField (field, name, noneVal): () => any,
  removeJsonItem (field, name, noneVal, toRemove, hasValue): () => any,
  addJsonItem (field, name, noneVal, toAdd): () => any,
}
