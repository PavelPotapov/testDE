import { formAttrs } from "./const"
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
export class FormValidator {
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
      true,
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
    return [...form.elements].filter((el) =>
      el.hasAttribute(formAttrs.inputRequired),
    )
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
      validateRules,
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
      FormValidator.selectors.notifyMsg,
    )
    if (msgContainer) msgContainer.textContent = validationResponse.message
    const forceMode = validationResponse.isValid

    parentElement?.classList.toggle(FormValidator.classes.isValid, forceMode)
    element.classList.toggle(FormValidator.classes.isValid, forceMode)
    parentElement?.classList.toggle(FormValidator.classes.isInvalid, !forceMode)
    element.classList.toggle(FormValidator.classes.isInvalid, !forceMode)
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
      FormValidator.removeValidVisible(formElement),
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
