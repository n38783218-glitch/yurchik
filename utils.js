export function isString(data) {
  return typeof data === 'string';
}
export function isNumber(data) {
  return typeof data === 'number';
}
export function isNotEmpty(data) {
  return (
    data !== undefined ||
    data !== null ||
    JSON.stringify(data) !== '{}' ||
    data !== ''
  );
}
export function isEmpty(data) {
  return (
    data === undefined ||
    data === null ||
    JSON.stringify(data) === '{}' ||
    data === ''
  );
}
export function isNotEmptyArray(data) {
  return Array.isArray(data) && data.length !== 0; //проверка что это массив и проверка что он не пустой
}
export function isCorrectStatus(enums, status) {
  return Object.values(enums).includes(status);
}
