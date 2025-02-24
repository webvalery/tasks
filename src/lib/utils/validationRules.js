function isNull(val) {
  return val === null
}

function isNotNull(val) {
  return !isNull(val)
}

function isUndefined(val) {
  return val === undefined
}

function isNotUndefined(val) {
  return !isUndefined(val)
}

function isEmpty(val) {
  return isEmptyString(val) || isNan(val) || isEmptyArray(val) || isEmptyObject(val)
}

function isNotEmpty(val) {
  return !isEmpty(val)
}

function isBoolean(val) {
  return typeof val === 'boolean'
}

function isNotBoolean(val) {
  return !isBoolean(val)
}

function isNan(val) {
  return Number.isNaN(val)
}

function isString(val) {
  return typeof val === 'string'
}

function isNotString(val) {
  return !isString(val)
}

function isEmptyString(val) {
  return isString(val) && val === ''
}

function isNotEmptyString(val) {
  return isString(val) && val.length > 0
}

function isEmptyArray(val) {
  return isArray(val) && val.length === 0
}

function isNotEmptyArray(val) {
  return isArray(val) && val.length > 0
}

function isObject(val) {
  return (
    isNotNull(val) &&
    isNotUndefined(val) &&
    isNotString(val) &&
    isNotArray(val) &&
    isNotNumber(val) &&
    isNotInfinity(val) &&
    isNotBoolean(val)
  )
}

function isFunction(val) {
  return typeof val === 'function'
}

function isNotObject(val) {
  return !isObject(val)
}

function isEmptyObject(val) {
  return isObject(val) && Object.keys(val).length === 0
}

function isNotEmptyObject(val) {
  return isObject(val) && Object.keys(val).length > 0
}

function isArray(val) {
  return Array.isArray(val)
}

function isNotArray(val) {
  return !isArray(val)
}

function isObjectWithFields(object, fields) {
  return (
    isObject(object) && fields.every((field) => Object.prototype.hasOwnProperty.call(object, field))
  )
}

function isObjectWithSubField(object, fieldMap) {
  return (
    isObject(object) &&
    fieldMap.every((field, index) => {
      const previousFields = fieldMap.slice(0, index)

      if (previousFields.length === 0) {
        Object.prototype.hasOwnProperty.call(object, field)
      }

      let validatedObject = object

      previousFields.forEach((prevField) => (validatedObject = validatedObject[prevField]))

      return (
        isObject(validatedObject) && Object.prototype.hasOwnProperty.call(validatedObject, field)
      )
    })
  )
}

function isNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val) && isFinite(val)
}

function isNotNumber(val) {
  return !isNumber(val)
}

function isInfinity(value) {
  return value === Infinity || value === -Infinity
}

function isNotInfinity(value) {
  return !isInfinity(value)
}

function isHtmlElement(value) {
  return value instanceof HTMLElement
}

const validationRules = {
  isNull,
  isNotNull,
  isUndefined,
  isNotUndefined,
  isEmpty,
  isNotEmpty,
  isEmptyString,
  isNotEmptyString,
  isEmptyArray,
  isNotEmptyArray,
  isEmptyObject,
  isNotEmptyObject,
  isArray,
  isNotArray,
  isString,
  isNotString,
  isObject,
  isNotObject,
  isObjectWithFields,
  isObjectWithSubField,
  isNumber,
  isNotNumber,
  isBoolean,
  isNotBoolean,
  isNan,
  isFunction,
  isInfinity,
  isNotInfinity,
  isHtmlElement,
}

export default validationRules
