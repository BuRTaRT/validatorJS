let validatorMethods = {
    notEmpty: function (el) {
        return el.value !== "" ? true : {message: "can't be sent empty"};
    },
    email: function (el, pattern) {
        return pattern.test(el.value) ? true : {message: "invalid e-mail adress"};
    },
    max: function (el, length) {
        return el.value.length < length ? true : {message: "too big value"};
    },
    noDigit: function (el, pattern) {
        return pattern.test(el.value) ? true : {message: "Только буква А-Я A-Z"};
    },
    min: function (el, length) {
        return el.value.length + "" >= length ? true : {message: "Минимум 6 символов"}

    },
    noLetter: function (el, pattern) {
        return pattern.test(el.value) ? true : {message: "Только цифры"};

    },

}

function Validator(settings) {
    let form = document.getElementById(settings.id),
        formFields = form.elements,
        errors = [],
        rulesPattern = {};
    document.querySelector(".send-form").onclick = function () {
            for (let i = 0; i < formFields.length; i++) {
                if (formFields[i].tagName != "BUTTON" || formFields[i].tagName != "A") {
                    var event = new Event("change")
                    formFields[i].dispatchEvent(event);
                }
            }
            if(errors.length == 0) form.submit();

    }

    // Вешаю на все поля формы (кроме баттонов) по событию "blur" функц checkIt
    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].tagName != "BUTTON")
            formFields[i].addEventListener("change", checkIt);
    }

    for (let key in settings.pattern) {
        rulesPattern[key] = settings.pattern[key];
    }

    function checkIt() {
        if (isValid(this)) {
            showSuccess(this);
            errors.forEach((item, index) => {
                item.el == this ? errors.splice(errors[index, 1]) : null;
            })
        } else {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].el = this) {
                    showError(this, errors[i].message)
                }
            }
        }

        function isValid(el) {
            let methods = settings.methods[el.getAttribute("id")];
            for (let i = 0; i < methods.length; i++) {
                if (typeof validatorMethods[methods[i][0]](el, methods[i][1]) == "object") {
                    errors.push({el: el, message: validatorMethods[methods[i][0]](el, methods[i][1]).message})
                    return false;
                }
            }
            return true;
        }

    }


    let showError = function (el, error) {
        el.parentNode.classList.remove("success");
        el.parentNode.classList.add("error");
        el.parentNode.nextElementSibling.innerHTML = error;


    }
    let showSuccess = function (el) {
        el.parentNode.classList.add("success");
        el.parentNode.classList.remove("error");
        el.parentNode.nextElementSibling.innerHTML = "";
    }


}