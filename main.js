import "./css/normalize.css"
import "./css/font.css"
import "./scss/main.scss"

const burger = document.querySelector(".burger")
const sidebar = document.querySelector(".sidebar-menu-overlay")
const sidebarContent = document.querySelector(".sidebar-menu-content")
const html = document.querySelector("html")

if (html && sidebar && sidebarContent && burger) {
	burger.addEventListener("click", () => {
		burger.classList.toggle("active")
		sidebar.classList.toggle("sidebar-menu-overlay--active")
		sidebarContent.classList.toggle("sidebar-menu-content--active")
		html.classList.toggle("disabled-scroll")
	})
}
