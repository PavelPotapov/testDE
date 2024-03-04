/**
Класс помощник для контроля скрола страницы. Если надо где-либо запретить скрол - lock(), разрешить снова unlock()
CSS
html.noscroll {
	position: fixed;
	overflow-y: scroll;
	width: 100%;
	top: var(--st);
}
 */
export class ScrollManager {
  static #cssVar = "--st"
  static #lastPosition = 0
  static #isLocked = false
  static instance
  static stateClasses = {
    noscroll: "noscroll",
  }

  constructor() {
    if (!ScrollManager.instance) {
      ScrollManager.instance = this
    }
    return ScrollManager.instance
  }

  static lock() {
    ScrollManager.#isLocked = true
    document.documentElement.style.setProperty(
      ScrollManager.#cssVar,
      -1 * document.documentElement.scrollTop + "px"
    )
    ScrollManager.#lastPosition = document.documentElement.scrollTop
    document.documentElement.classList.add(ScrollManager.stateClasses.noscroll)
  }

  static unlock() {
    ScrollManager.#isLocked = false
    document.documentElement.classList.remove(
      ScrollManager.stateClasses.noscroll
    )
    window.scrollTo(0, ScrollManager.#lastPosition)
  }

  get isLocked() {
    return ScrollManager.#isLocked
  }
}
