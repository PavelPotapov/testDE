function validatingEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // регулярное выражение для проверки email
	return re.test(email) // возвращает true, если email валиден, и false в противном случае
}

function validatingText(text) {
	return text.trim() !== "" // возвращает true, если текст непустой, и false в противном случае
}

async function fetchData(formAction) {
	let res = await fetch(formAction.url, {
		method: formAction.method,
		headers: {
			"Content-Type": "application/json",
		},
	})
	res = res.json()
	return res
}

function clearForm() {
	spanEmail.classList.remove("form__validate-active")
	spanName.classList.remove("form__validate-active")
	spanText.classList.remove("form__validate-active")
	spanSubmit.classList.remove("form__validate-active-success")
	spanSubmit.classList.remove("form__validate-active")
	userName.value = ""
	email.value = ""
	text.value = ""
}

function hideForm() {
	//modal__content
	modalForm.classList.remove("modal__content-active")
	clearForm()
}

function showForm() {
	modalForm.classList.add("modal__content-active")
}

function showModal() {
	modal.classList.add("modal__active")
	html.classList.add("disabled-scroll")
}

function hideModal() {
	clearForm()
	hideForm()
	hidePopup()
	modal.classList.remove("modal__active")
	html.classList.remove("disabled-scroll")
}

function hidePopup() {
	modalPopup.classList.remove("modal__popup-active")
}

function showPopup() {
	modalPopup.classList.add("modal__popup-active")
}

function submitError() {
	spanSubmit.innerText = "Ошибка при отправке"
	spanSubmit.classList.add("validate-active")
	submitBtn.value = "SUBMIT"
}

const modal = document.querySelector(`div[data-js-modal="modal"]`)
const modalForm = document.querySelector(
	`div[data-js-modal-content="modal-content"]`
)
const modalPopup = document.querySelector(
	`div[data-js-modal-popup="modal-popup"]`
)
const form = document.querySelector(`form[data-js="form"]`)
const cross = document.querySelector(`div[data-js-cross-form="cross-form"]`)
const crossPopup = document.querySelector(
	`div[data-js-cross-popup="cross-popup"]`
)
const submitBtn = document.querySelector(
	`input[data-js-form-submit="form-submit"]`
)
const footerBtn = document.querySelector(
	`button[data-js-footer-btn="footer-btn"]`
)
const userName = document.querySelector(
	`input[data-js-input-name="input-name"]`
)
const email = document.querySelector(`input[data-js-input-email="input-email"]`)
const text = document.querySelector(`textarea[data-js-input-text="input-text"]`)
const spanEmail = document.querySelector(`span[data-form=${email.id}]`)
const spanName = document.querySelector(`span[data-form=${userName.id}]`)
const spanText = document.querySelector(`span[data-form=${text.id}]`)
const spanSubmit = document.querySelector(`span[data-form=${submitBtn.id}]`)
const html = document.querySelector("html")

if (
	modal &&
	modalPopup &&
	modalForm &&
	form &&
	cross &&
	crossPopup &&
	submitBtn &&
	footerBtn &&
	userName &&
	email &&
	text &&
	spanEmail &&
	spanName &&
	spanText &&
	spanSubmit &&
	html
) {
	//показываем модальное окно при клике на кнопку
	footerBtn.addEventListener("click", function (e) {
		showModal()
		showForm()
	})

	//скрываем модальное окно при клике на кнопку крестика
	cross.addEventListener("click", function (e) {
		hideModal()
	})

	crossPopup.addEventListener("click", function (e) {
		hideModal()
	})

	//скрываем модальное окно при клике на вншенюю область вокруг окна
	modal.addEventListener("click", function (e) {
		console.log(e, "!!!")
		if (e.target === modal) {
			hideModal()
		}
	})

	//отправка и валидация формы
	form.addEventListener("submit", function (e) {
		e.preventDefault()

		spanEmail.classList.remove("form__validate-active")
		spanEmail.classList.remove("form__validate-active-success")
		submitBtn.value = "SENDING..."

		email.addEventListener("input", () => {
			spanEmail.classList.remove("form__validate-active")
		})

		userName.addEventListener("input", () => {
			spanName.classList.remove("form__validate-active")
		})

		text.addEventListener("input", () => {
			spanText.classList.remove("form__validate-active")
		})

		const validateEmail = validatingEmail(email.value)
		const validateName = validatingText(userName.value)
		const validateText = validatingText(text.value)
		if (validateEmail && validateName && validateText) {
			let formAction = form?.dataset.jsForm
			formAction = JSON.parse(formAction)
			try {
				if (formAction.method === "POST" || formAction.method === "GET") {
					fetchData(formAction)
						.then((res) => {
							submitBtn.value = "SUBMIT"
							spanSubmit.innerText = "Данные отправлены"
							spanSubmit.classList.add("form__validate-active-success")
							setTimeout(() => {
								spanSubmit.classList.remove("form__validate-active-success")
								userName.value = ""
								email.value = ""
								text.value = ""
								hideForm()
								showPopup()
							}, 500)
						})
						.catch((err) => {
							submitError()
						})
				} else {
					submitError()
				}
			} catch (e) {
				submitError()
			}
		} else {
			if (!validateEmail) {
				spanEmail.innerText = "Неверно введённый email"
				spanEmail.classList.add("form__validate-active")
			}
			if (!validateName) {
				spanName.innerText = "Пустое имя"
				spanName.classList.add("form__validate-active")
			}
			if (!validateText) {
				spanText.innerText = "Пустое поле"
				spanText.classList.add("form__validate-active")
			}
			submitBtn.value = "SUBMIT"
		}
	})
}
