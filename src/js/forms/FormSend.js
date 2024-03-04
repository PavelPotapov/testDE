import { Modal } from "../../components/modal"
import { FormValidator } from "./FormValidator"
import { FormController } from "./FormController"

export class FormSend {
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
