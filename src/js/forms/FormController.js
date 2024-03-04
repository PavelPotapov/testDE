import { FormSend } from "./FormSend"
import { FormValidator } from "./FormValidator"
import { formAttrs } from "./const"

export class FormController {
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
