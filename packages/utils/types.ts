export const isUndefined = (val: unknown): val is undefined => val === undefined
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

export const isStringNumber = (val: unknown): val is string => isString(val) && !isNaN(Number(val))
