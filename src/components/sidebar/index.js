import "./style.css"
import { ScrollManager } from "../../js/scrollManagement"
import { Overlay } from "../overlay"

export class Sidebar {
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
