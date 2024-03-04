/**
 * Функция задержки
 * @param {number} ms - миллисекунды для задержки
 * @returns {Promise}
 */
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth

export function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  )
}
