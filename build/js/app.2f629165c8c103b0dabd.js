/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 30:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./btn.css": 102,
	"./burger.css": 227,
	"./title.css": 30
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 206;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/utils/requireAll.js
function requireAll(r) {
	r.keys().forEach(r)
}

;// CONCATENATED MODULE: ./src/css/ui/index.js

requireAll(__webpack_require__(206))

;// CONCATENATED MODULE: ./src/css/index.js










;// CONCATENATED MODULE: ./src/js/scrollManagement.js
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
class ScrollManager {
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

;// CONCATENATED MODULE: ./src/components/overlay/index.js


class Overlay {
  static instance

  static states = {
    isActive: false,
  }

  static selectors = {
    overlay: "[data-js-overlay]",
  }

  static cssVar = {
    blurringForces: "--blurring-forces",
    zIndex: "--z-index",
  }

  static classes = {
    isActive: "is-active",
  }

  static overlayElement = document.querySelector(Overlay.selectors.overlay)

  constructor() {
    if (!Overlay.instance) {
      Overlay.instance = this
    }
    return Overlay.instance
  }

  static show({ blurringForces = "8px", zIndex = 2 }) {
    Overlay.setBlurringForces(blurringForces)
    Overlay.setZindex(zIndex)
    Overlay.states.isActive = true
    Overlay.overlayElement.classList.add(Overlay.classes.isActive)
  }

  static hide() {
    Overlay.states.isActive = false
    Overlay.overlayElement.classList.remove(Overlay.classes.isActive)
  }

  static setBlurringForces(value) {
    if (value.trim()) {
      Overlay.overlayElement.style.setProperty(
        Overlay.cssVar.blurringForces,
        value
      )
    }
  }

  static setZindex(value) {
    if (Number.isInteger(value)) {
      Overlay.overlayElement.style.setProperty(Overlay.cssVar.zIndex, value)
    }
  }
}

;// CONCATENATED MODULE: ./src/components/sidebar/index.js




class Sidebar {
  static instance
  static sidebarMenu
  static sidebarBtn

  static classes = {
    sidebarActive: "is-active",
    sidebarBtnActive: "is-active",
  }

  static states = {
    isActive: false,
  }

  static selectors = {
    sidebarMenu: "[data-js-sidebar-menu]",
    sidebarBtn: "[data-js-sidebar-btn]",
    hiddenFocus: "[data-js-hidden-focus]",
  }

  static attrs = {
    sidebarBtn: "data-js-sidebar-btn",
    sidebarMenu: "data-js-sidebar-menu",
  }

  constructor() {
    if (!Sidebar.instance) {
      Sidebar.instance = this
    }
    Sidebar.sidebarMenu = document.querySelector(Sidebar.selectors.sidebarMenu)
    Sidebar.sidebarBtn = document.querySelector(Sidebar.selectors.sidebarBtn)
    Sidebar.hiddenFocus = document.querySelector(Sidebar.selectors.hiddenFocus)
    this.#bindEvents()
    return Sidebar.instance
  }

  #bindEvents() {
    document.addEventListener(
      "click",
      (e) => {
        this.#clickHandler(e)
      },
      true
    )
    if (Sidebar.sidebarMenu) {
      Sidebar.sidebarMenu.addEventListener("keydown", (e) => {
        this.#keydownHandler(e)
      })
    }
  }

  #clickHandler(e) {
    if (e.target === Sidebar.sidebarBtn && Sidebar.sidebarBtn) {
      if (!Sidebar.states.isActive) {
        e.target.classList.add(Sidebar.classes.sidebarBtnActive)
        Sidebar.openSidebar()
      } else {
        e.target.classList.remove(Sidebar.classesActive)
        Sidebar.closeSidebar()
      }
    } else if (
      Sidebar.sidebarMenu &&
      !Sidebar.sidebarMenu.contains(e.target) &&
      e.target !== Sidebar.sidebarMenu
    ) {
      //Если sidebar существует и target клика не является потомком sidebar и target клика не сам sidebar - значит был клик вне области sidebar
      if (Sidebar.states.isActive) {
        Sidebar.closeSidebar()
      }
    }
  }

  #keydownHandler(e) {
    if (Sidebar.states.isActive && (e.key === "Escape" || e.keyCode === 27)) {
      if (Sidebar.sidebarMenu) Sidebar.closeSidebar()
    }
  }

  static closeSidebar() {
    ScrollManager.unlock()
    Overlay.hide()
    Sidebar.states.isActive = false
    this.sidebarMenu.classList.remove(Sidebar.classes.sidebarActive)
    this.sidebarBtn.classList.remove(Sidebar.classes.sidebarBtnActive)
  }

  static openSidebar() {
    ScrollManager.lock()
    if (Sidebar.hiddenFocus) Sidebar.hiddenFocus.focus()
    Overlay.show({ blurringForces: "8px" })
    Sidebar.states.isActive = true
    this.sidebarMenu.classList.add(Sidebar.classes.sidebarActive)
  }

  get isSidebarActive() {
    return Sidebar.states.isActive
  }
}

;// CONCATENATED MODULE: ./src/components/modal/index.js



/**
 * Класс для управления и работы с модальными окнами. Открыто может быть только 1 модальное окно.
 * Можно развивать его, хранить сразу несколько модальных окон в условном Map и для каждого окна состояние / контент и тд.
 */
class Modal {
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

;// CONCATENATED MODULE: ./src/js/utils/utils.js
/**
 * Функция задержки
 * @param {number} ms - миллисекунды для задержки
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  )
}

;// CONCATENATED MODULE: ./src/js/forms/const.js
const formAttrs = {
  form: "data-js-form",
  inputRequired: "data-js-input-required",
}

;// CONCATENATED MODULE: ./src/js/forms/FormValidator.js

/**
 * @example
 * new FormValidator()
 * FormValidator.validateForm(form) // Валидация формы, с визуальным отображением валидации через css
 * FormValidator.clearFormValidation(form) //У переданной формы убираем подсветку валидации полей (!но не убирает ошибки, только визуал)
 * FormValidator.isFormValid(form)	// Boolean, проверка на ошибки валидации у переданной формы
 * FormValidator.getFormElementsForValidate(form) // Получить элементы формы, которые подлежат валидации
 * FormValidator.getValidation("какой-то текст", rules) //Валидация текста по переданным правилам
 * FormValidator.getValidationForElement(element) // Получить результат валидации для переданного поля
 * FormValidator.setValidVisible(element, validationResult) //Добавляет подсветку элементу валидации
 * FormValidator.removeValidVisible(element) //Убирает подсветку у элемента валидации
 * FormValidator.configForValidate = {} // Правила валидирования для разных типов полей
 * FormValidator.classes.isInvalid= "is-invalid" //css класс для манипуляции
 * FormValidator.classes.isValid = "is-valid" //css класс для манипуляции
 * FormValidator.selectors.formRow = "[data-js-form-row]" //Селектор для нахождения родительского элемента валидируемого поля, если его не будет, css классы буду добавлены на первый родительский элемент
 * FormValidator.selectors.notifyMsg = "[data-js-form-validate-message]" //Селектор для нахождения элемента подсказки валидации. Такого элемента может не быть, тогда не будет выводиться подсказка
 */
class FormValidator {
  static instance
  static #configForValidate = {
    text: {
      minLength: 1,
      maxLength: Infinity,
      validateRule: /.*/,
      errorMessage: "Поле не может быть пустым",
    },
    phone: {
      minLength: 5, //длина телефона обусловлена согласно спецификации E.164
      maxLength: 15,
      validateRule:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
      errorMessage: "Введите корректный телефон",
    },
    email: {
      minLength: 5,
      maxLength: Infinity,
      validateRule: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Введите корректный email",
    },
  }

  static selectors = {
    formRow: "[data-js-form-row]",
    notifyMsg: "[data-js-form-validate-message]",
  }

  static attrs = {
    form: "data-js-form",
    inputRequired: "data-js-input-required",
  }

  static classes = {
    isValid: "is-valid",
    isInvalid: "is-invalid",
  }

  constructor() {
    if (!FormValidator.instance) {
      FormValidator.instance = this
    }
    this.#bindEvents()
    return FormValidator.instance
  }

  #bindEvents() {
    document.addEventListener(
      "blur",
      (e) => {
        this.#blurHandler(e)
      },
      true
    )
  }

  #blurHandler(e) {
    if (
      e.target?.form?.hasAttribute(formAttrs.form) &&
      e.target.hasAttribute(formAttrs.inputRequired)
    ) {
      const response = FormValidator.getValidationForElement(e.target)
      FormValidator.setValidVisible(e.target, response)
    }
  }

  /**
   * Метод валидации строки по переданным правилам.
   * @param {String} value - строка запроса
   * @param {Object} rules - конфигурация валидации запроса
   * @throws {Error} - Ошибка, если объект с правилами валидации неверно сконфигурирован
   * @returns {Object} - Возвращает объект результата с полями isValid и message
   */
  static getValidation(value, rules) {
    value = value.trim()
    const response = { isValid: false, message: "" }
    try {
      if (value.length < rules.minLength) {
        response.message = "Недостаточное кол-во символов"
        response.isValid = false
      } else if (value.length > rules.maxLength) {
        response.message = "Слишком много символов"
        response.isValid = false
      } else if (rules.validateRule.test(value)) {
        response.message = ""
        response.isValid = true
      } else {
        response.message = rules.errorMessage
        response.isValid = false
      }
    } catch (e) {
      throw new Error(e)
    }
    return response
  }

  /**
   * Метод валидации формы. Похож по реализации на isFormValid, но имеет другой смысл. Он добавляет элементам формы классы и меняет внешнее представление элементов с помощью изменения css классов
   * @param {HTMLFormElement} form - форма для валидирования
   * @returns {undefined}
   */
  static validateForm(form) {
    if (!FormValidator.isForm(form)) return
    const requiredElements = FormValidator.getFormElementsForValidate(form)
    requiredElements.forEach((el) => {
      const response = FormValidator.getValidationForElement(el)
      FormValidator.setValidVisible(el, response)
    })
  }

  /**
   * Получения элементов формы, которые подлежат валидации
   * @param {HTMLFormElement} form - форма, из которой достаем нужные нам поля для валидации
   * @returns {Array<HTMLElement>} - Возращает массив, внутри которого будут input / textarea и тд. которые подлежат валидации
   */
  static getFormElementsForValidate(form) {
    const requiredElements = [...form.elements].filter((el) =>
      el.hasAttribute(formAttrs.inputRequired)
    )
    return requiredElements
  }

  /**
   * Валидация элемента формы
   * @param {HTMLElement} element - элемент формы, который надо свалидировать
   */
  static getValidationForElement(element) {
    const type = element.getAttribute(this.attrs.inputRequired)
    let validateRules

    switch (type) {
      case "email":
        validateRules = FormValidator.#configForValidate?.email
        break
      case "phone":
        validateRules = FormValidator.#configForValidate?.phone
        break
      default:
        validateRules = FormValidator.#configForValidate?.text
    }

    const validationResponse = FormValidator.getValidation(
      element.value,
      validateRules
    )
    return validationResponse
  }

  /**
   * Метод меняет внешнее представление валидируемых элементов, вся манипуляция css
   * formRow - Родительский элемент, в котором находился input. Если его нет, классы будут навешаны на ближайший родительский элемент
   * @param {HTMLElement} element - Валидируемый элемент
   */
  static setValidVisible(element, validationResponse) {
    const parentElement =
      element.closest(FormValidator.selectors.formRow) ?? element.parentNode
    const msgContainer = parentElement.querySelector(
      FormValidator.selectors.notifyMsg
    )
    if (msgContainer) msgContainer.textContent = validationResponse.message
    if (validationResponse.isValid) {
      parentElement?.classList.add(FormValidator.classes.isValid)
      element.classList.add(FormValidator.classes.isValid)
      parentElement?.classList.remove(FormValidator.classes.isInvalid)
      element.classList.remove(FormValidator.classes.isInvalid)
    } else {
      parentElement?.classList.add(FormValidator.classes.isInvalid)
      element.classList.add(FormValidator.classes.isInvalid)
      parentElement?.classList.remove(FormValidator.classes.isValid)
      element.classList.remove(FormValidator.classes.isValid)
    }
  }

  /**
   * Убирает любую подсветку у элемента валидации
   */
  static removeValidVisible(element) {
    const parentElement =
      element.closest(FormValidator.selectors.formRow) ?? element.parentNode
    if (parentElement) {
      parentElement.classList.remove(FormValidator.classes.isInvalid)
      parentElement.classList.remove(FormValidator.classes.isValid)
    }
    element.classList.remove(FormValidator.classes.isInvalid)
    element.classList.remove(FormValidator.classes.isValid)
  }

  /**
   * У переданной формы убираем подсветку валидации полей
   */
  static clearFormValidation(form) {
    const formElementsForValidate =
      FormValidator.getFormElementsForValidate(form)
    formElementsForValidate.forEach((formElement) =>
      FormValidator.removeValidVisible(formElement)
    )
  }

  /**
   * Метод можно вызывать для проверки валидации какой-либо формы, перед какими-нибудь действиями, например отправки данных формы и тд.
   * @param {HTMLFormElement} form - форма для валидирования
   * @returns {Boolean} true - значит форма свалидирована корректно, false - есть какие-то ошибки валидации
   * @example
   * //Пример использования
   * const form = document.querySelector('[data-js-form="contact-form"]');
   * if (FormValidator.isFormValid(form)) console.log('Форма валидна');
   */
  static isFormValid(form) {
    if (!FormValidator.isForm(form)) return
    const requiredElements = FormValidator.getFormElementsForValidate(form)
    return requiredElements.every((el) => {
      const response = FormValidator.getValidationForElement(el)
      return response.isValid
    })
  }

  static isForm(form) {
    return form?.tagName.toLowerCase() === "form"
  }

  get configForValidate() {
    return FormValidator.#configForValidate
  }

  /**
   * @param {Object} config - Конфигурация валидации, я не стал его описывать в отдельный typedef в документации, из чего он состоит можно посмотреть в #configForValidate
   */
  set configForValidate(config) {
    if (!config) {
      throw new Error("Empty config")
    }
    FormValidator.#configForValidate = config
  }
}

;// CONCATENATED MODULE: ./src/js/forms/FormController.js




class FormController {
  constructor() {
    if (!FormController.instance) {
      FormController.instance = this
    }
    this.#bindEvents()
    return FormController.instance
  }

  #bindEvents() {
    document.addEventListener(
      "submit",
      (e) => {
        this.#submitHandler(e)
      },
      true
    )
  }

  #submitHandler(e) {
    if (e.target.hasAttribute(formAttrs.form)) {
      const form = e.target
      e.preventDefault()
      FormValidator.validateForm(form)
      if (!FormValidator.isFormValid(form)) {
        return
      }
      FormSend.sendData(form)
    }
  }

  static getFormConfig(form) {
    const config = { ...JSON.parse(form.getAttribute(formAttrs.form)) }
    return config
  }
}

;// CONCATENATED MODULE: ./src/js/forms/FormSend.js




class FormSend {
  static states = {
    isLoading: false,
  }

  static stateClasses = {
    isLoading: "is-loading",
  }

  static sendData(form) {
    const config = FormController.getFormConfig(form)
    config.form = form
    config.formData = new FormData(form)

    let url = window.location.href
    if (config.url) {
      url = config.url
    } else if (form.action !== "") {
      url = form.action
    }
    const method = config.method ?? form.method

    return new Promise((resolve, reject) => {
      FormSend.states.isLoading = true
      const submitButtons = form.querySelectorAll(`button[type="submit"]`) //чисто теоретически у формы может быть более 1 элемента submit
      submitButtons.forEach((btn) => {
        btn.classList.add(FormSend.stateClasses.isLoading)
        btn.disabled = true
      })
      form.classList.add(FormSend.stateClasses.isLoading)
      const options = {}
      if (method.toLowerCase() !== "get") options.body = config.formData
      options.method = method
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            reject(new Error("Something went wrong"))
          }
          FormSend.handleFormSendSuccess(config, res)
          resolve(res)
        })
        .catch((e) => {
          FormSend.handleFormSendError(config, e)
          reject(e)
        })
        .finally(() => {
          FormSend.states.isLoading = false
          form.classList.remove(FormSend.stateClasses.isLoading)
          submitButtons.forEach((btn) => {
            btn.classList.remove(FormSend.stateClasses.isLoading)
            btn.disabled = false
          })
        })
    })
  }

  static handleFormSendSuccess(config, response) {
    //В зависимости от ответа сервера можно выполнять различные действия
    //Мне кажется можно было бы в конфигурации формы указать способ общения, json и тд и в зависимости от способа общения что-то делать с response
    console.log("Response from server", response, "Form config", config)
    if (config.showModalAfterSuccess) {
      Modal.open(config.showModalAfterSuccess)
    }
    if (config.isResetAfterSuccess) {
      config?.form.reset()
      FormValidator.clearFormValidation(config?.form)
    }
  }

  static handleFormSendError(config, error) {
    console.error("Error", error)
    if (config.showModalAfterError) {
      Modal.open(config.showModalAfterError)
    }
  }
}

;// CONCATENATED MODULE: ./src/app.js






















const init = () => {
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${getScrollbarWidth()}px`
  )
  new Overlay()
  new ScrollManager()
  new Modal()
  new FormSend()
  new FormValidator()
  new FormController()
  new Sidebar()
}

document.addEventListener("DOMContentLoaded", () => {
  init()
})

})();

/******/ })()
;