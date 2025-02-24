export function inArray(validValues) {
  return function (value) {
    return validValues.includes(value)
  }
}

export const getMaxValue = (array, key) => {
  if (array.length === 0) return 0
  return Math.max(...array.map((item) => item[key]), 0)
}
