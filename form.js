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
	console.log(res, typeof res)
	return res
}

function clearForm() {
	spanEmail.classList.remove("validate-active")
	spanName.classList.remove("validate-active")
	spanText.classList.remove("validate-active")
	userName.value = ""
	email.value = ""
	text.value = ""
}

function hideForm() {
	modal.classList.remove("modal__active")
	clearForm()
}

function showForm() {
	modal.classList.add("modal__active")
}

const modal = document.querySelector(".modal")
const submitBtn = document.querySelector(".form-submit")
const cross = document.querySelector(".modal__cross")
const footerBtn = document.querySelector(".footer__btn")

const userName = document.querySelector("#form-input-name")
const email = document.querySelector("#form-input-email")
const text = document.querySelector("#form-textarea")

const spanEmail = document.querySelector(`span[data-form=${email.id}`)
const spanName = document.querySelector(`span[data-form=${userName.id}`)
const spanText = document.querySelector(`span[data-form=${text.id}`)
const spanSubmit = document.querySelector(`span[data-form=${submitBtn.id}`)

//показываем модальное окно при клике на кнопку
footerBtn.addEventListener("click", function (e) {
	showForm()
})

//скрываем модальное окно при клике на кнопку крестика
cross.addEventListener("click", function (e) {
	hideForm()
})

modal.addEventListener("click", function (e) {
	if (e.target === modal) {
		hideForm()
	}
})

//отправка и валидация формы
submitBtn.addEventListener("click", function (e) {
	e.preventDefault()

	spanEmail.classList.remove("validate-active")
	spanEmail.classList.remove("validate-active-success")
	submitBtn.value = "SENDING..."

	email.addEventListener("input", () => {
		spanEmail.classList.remove("validate-active")
	})

	userName.addEventListener("input", () => {
		spanName.classList.remove("validate-active")
	})

	text.addEventListener("input", () => {
		spanText.classList.remove("validate-active")
	})

	const validateEmail = validatingEmail(email.value)
	const validateName = validatingText(userName.value)
	const validateText = validatingText(text.value)
	if (validateEmail && validateName && validateText) {
		const dataForm = e.currentTarget?.dataset?.form
		if (dataForm) {
			let formAction = document.querySelector(`form[data-form=${dataForm}]`)
				?.dataset.jsForm
			formAction = JSON.parse(formAction)
			try {
				if (formAction.method === "POST" || formAction.method === "GET") {
					fetchData(formAction, dataForm)
						.then((res) => {
							submitBtn.value = "SUBMIT"
							spanSubmit.innerText = "Данные отправлены"
							spanSubmit.classList.add("validate-active-success")
							setTimeout(() => {
								spanSubmit.classList.remove("validate-active-success")
								userName.value = ""
								email.value = ""
								text.value = ""
								/* здесь можно и закрывать окно с показыванием popup уведомления */
							}, 1500)
						})
						.catch((err) => {
							spanSubmit.innerText = "Ошибка при отправке"
							spanSubmit.classList.add("validate-active")
						})
				} else {
					spanSubmit.innerText = "Ошибка при отправке"
					spanSubmit.classList.add("validate-active")
				}
			} catch (e) {
				spanSubmit.innerText = "Ошибка при отправке"
				spanSubmit.classList.add("validate-active")
			}
		}
	} else {
		if (!validateEmail) {
			spanEmail.innerText = "Неверно введённый email"
			spanEmail.classList.add("validate-active")
		}
		if (!validateName) {
			spanName.innerText = "Пустое имя"
			spanName.classList.add("validate-active")
		}
		if (!validateText) {
			spanText.innerText = "Пустое поле"
			spanText.classList.add("validate-active")
		}
		submitBtn.value = "SUBMIT"
	}
})
