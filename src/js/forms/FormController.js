import { FormSend } from "./FormSend"
import { FormValidator } from "./FormValidator"
import { formAttrs } from "./const"

export class FormController {
  static stateClasses = {
    isLoading: "is-loading",
  }
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
      true,
    )
  }

  async #submitHandler(e) {
    if (e.target.hasAttribute(formAttrs.form)) {
      const form = e.target
      e.preventDefault()
      FormValidator.validateForm(form)
      if (!FormValidator.isFormValid(form)) {
        return
      }
      const config = FormController.getFormConfig(form)
      if (!form.isLoading) {
        FormController.setIsLoading(form, true)
        try {
          const res = await FormSend.sendData(form, config)
          if (!res.ok) {
            throw new Error("Something went wrong")
          }
          FormSend.handleFormSendSuccess(config, res)
        } catch (e) {
          FormSend.handleFormSendError(config, e)
        } finally {
          FormController.setIsLoading(form, false)
        }
      }
    }
  }

  static setIsLoading(form, forceLoading) {
    form.isLoading = forceLoading
    const triggerSubmits = [...form.elements].filter(
      (el) => el.type === "submit",
    )
    if (forceLoading) {
      triggerSubmits.forEach((el) => {
        el.classList.add(FormController.stateClasses.isLoading)
        el.disabled = true
      })
      form.classList.add(FormController.stateClasses.isLoading)
    } else {
      form.classList.remove(FormController.stateClasses.isLoading)
      triggerSubmits.forEach((el) => {
        el.classList.remove(FormController.stateClasses.isLoading)
        el.disabled = false
      })
    }
  }

  static getFormConfig(form) {
    return { ...JSON.parse(form.getAttribute(formAttrs.form)) }
  }
}
