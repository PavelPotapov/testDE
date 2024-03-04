import "./style.css"

export class Overlay {
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
