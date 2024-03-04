import "./css"
import "./components/header"
import "./components/intro"
import "./components/card"
import "./components/work"
import "./components/clients"
import "./components/copyright"
import "./components/footer"
import "./components/sidebar"
import "./components/overlay"
import "./components/modal"
import "./components/form"

import { ScrollManager } from "./js/scrollManagement"
import { getScrollbarWidth } from "./js/utils/utils"
import { Modal } from "./components/modal"
import { FormSend } from "./js/forms/FormSend"
import { FormValidator } from "./js/forms/FormValidator"
import { FormController } from "./js/forms/FormController"
import { Sidebar } from "./components/sidebar"
import { Overlay } from "./components/overlay"

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
