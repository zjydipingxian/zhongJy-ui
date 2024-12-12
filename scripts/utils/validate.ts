/**
 * 验证组件名称。
 *
 * @param {string} name - 要验证的组件名称。
 * @returns {string|boolean} - 如果名称无效，则返回错误信息，否则返回 true。
 */
export const validateComponentName = (name: string) => {
  // 检查是否提供了名称
  if (!name) return '需要提供组件名称'

  // 检查名称是否以字母开头，并且仅包含小写字母、数字和短横线
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    return '组件名称必须以字母开头，并且只能包含小写字母、数字和短横线'
  }

  // 如果名称有效，返回 true
  return true
}
