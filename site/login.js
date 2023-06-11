const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");


const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}


const handleFormData = (e) => {
    e.preventDefault();


    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");


    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());


    if (fullname === "") {
        showError(fullnameInput, "Coloque o nome completo");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Coloque um email válido");
    }
    if (password === "") {
        showError(passwordInput, "Coloque sua senha");
    }



    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;


    form.submit();
}


passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});


form.addEventListener("submit", handleFormData);