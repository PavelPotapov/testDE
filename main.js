import "./css/normalize.css"
import "./css/font.css"
import "./scss/index.scss"

const burger = document.querySelector(".burger")
const sidebar = document.querySelector(".sidebar-menu")

burger.addEventListener("click", () => {
	burger.classList.toggle("active")
	sidebar.classList.toggle("active")
})
