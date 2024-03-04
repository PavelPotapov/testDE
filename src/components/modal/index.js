import { ScrollManager } from "../../js/scrollManagement"
import "./style.css"
import { Overlay } from "./../overlay/index"
/**
 * Класс для управления и работы с модальными окнами. Открыто может быть только 1 модальное окно.
 * Можно развивать его, хранить сразу несколько модальных окон в условном Map и для каждого окна состояние / контент и тд.
 */
export class Modal {
  static currentModalOpen
  static inertElement = document.querySelector("[data-js-inert-element]")

  static selectors = {
    modalContent: "[data-js-modal-content]",
  }
  static attrs = {
    modalOpenTrigger: `data-js-modal-open`,
    modalCloseTrigger: `data-js-modal-close`,
  }
  static stateClasses = {
    isOpen: "is-open",
  }

  static state = {
    isOpen: false,
  }

  constructor() {
    if (Modal.instance) {
      Modal.instance = this
    }
    this.bindEvents()

    return Modal.instance
  }

  bindEvents() {
    document.addEventListener(
      "click",
      (e) => {
        this.clickHandler(e)
      },
      true
    )
    document.addEventListener(
      "keydown",
      (e) => {
        this.keyHandler(e)
      },
      true
    )
  }

  clickHandler(e) {
    if (e.target.hasAttribute(Modal.attrs.modalOpenTrigger)) {
      const config = JSON.parse(
        e.target.getAttribute(Modal.attrs.modalOpenTrigger)
      )
      if (config.src) {
        if (config.src) {
          Overlay.show({ blurringForces: "10px" })
          Modal.open(config.src)
        }
      }
    } else if (e.target.hasAttribute(Modal.attrs.modalCloseTrigger)) {
      Overlay.hide()
      Modal.close(e.target)
    } else if (Modal.currentModalOpen) {
      if (!Modal.currentModalOpen.contains(e.target)) {
        //клик вне области
        Overlay.hide()
        Modal.close(e.target)
      }
    }
  }

  keyHandler(e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      if (Modal.currentModalOpen) {
        Overlay.hide()
        Modal.close()
      }
    }
  }

  /**
   *
   * @param {} id - id модалки
   */
  static open(id) {
    if (Modal.currentModalOpen && Modal.state.isOpen) {
      Modal.close()
    }
    const modal = document.querySelector(id)
    if (!modal) {
      Overlay.hide()
      return
    }
    Modal.currentModalOpen = modal
    Modal.state.isOpen = true
    Modal.addInert()
    Modal.currentModalOpen.classList.add(Modal.stateClasses.isOpen)
    ScrollManager.lock()
  }

  static close() {
    Modal.currentModalOpen.classList.remove(Modal.stateClasses.isOpen)
    Modal.currentModalOpen = null
    Modal.state.isOpen = false
    ScrollManager.unlock()
    Modal.removeInert()
  }

  /**
   * ловушка фокуса
   * модальное окно не должно быть внутри передаваемого элемента
   * @param {element} - dom элемент, на который будет вешаться атрибут inert
   */
  static addInert(element) {
    if (element) {
      element.setAttribute("inert", "")
    } else if (Modal.inertElement) {
      Modal.inertElement.setAttribute("inert", "")
    }
  }

  static removeInert(element) {
    if (element) {
      element.removeAttribute("inert")
    } else if (Modal.inertElement) {
      Modal.inertElement.removeAttribute("inert")
    }
  }
}
