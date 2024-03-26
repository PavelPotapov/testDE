import { Modal } from "../../components/modal"
import { FormValidator } from "./FormValidator"

export class FormSend {
  static async sendData(form, config) {
    config.form = form
    config.formData = new FormData(form)
    let url = window.location.href
    if (config.url) {
      url = config.url
    } else if (form.action !== "") {
      url = form.action
    }
    const method = config.method ?? form.method

    const options = {}
    if (method.toLowerCase() !== "get") options.body = config.formData
    options.method = method

    return fetch(url, options)
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
