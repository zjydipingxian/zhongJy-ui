export const defaultNamespace = 'jy'
const statePrefix = 'is-'

const _bem = (namespace: string, block: string, blockSuffix: string, element: string, modifier: string) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useNamespace = (block: string) => {
  const namespace = defaultNamespace

  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')

  const e = (element?: string) => (element ? _bem(namespace, block, '', element, '') : '')

  const m = (modifier?: string) => (modifier ? _bem(namespace, block, '', '', modifier) : '')

  const be = (blockSuffix?: string, element?: string) => {
    return blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''
  }

  const em = (element?: string, modifier?: string) => {
    return element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  }

  const bm = (blockSuffix?: string, modifier?: string) => {
    return blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  }

  const bem = (blockSuffix?: string, element?: string, modifier?: string) => {
    return blockSuffix && element && modifier ? _bem(namespace, block, blockSuffix, element, modifier) : ''
  }

  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
