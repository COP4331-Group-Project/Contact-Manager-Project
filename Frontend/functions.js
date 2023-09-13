var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
}

function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
}

var fieldsValidated = {
  firstName: false,
  lastName: false,
  username: false,
  password: false,
};

function validateRegistration(formType) {
  var firstNameInput = document.getElementById("firstName");
  var lastNameInput = document.getElementById("lastName");
  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");

  // Validate first name
  if (!fieldsValidated.firstName) {
    fieldsValidated.firstName = true;
    if (firstNameInput.value.trim() === "") {
      firstNameInput.style.borderBottom = "1px solid red";
      return false;
    }
  } else {
    firstNameError.innerHTML = "";
    firstNameInput.style.borderBottom = "1px solid #999";
  }

  // Validate last name
  if (!fieldsValidated.lastName) {
    fieldsValidated.lastName = true;
    if (lastNameInput.value.trim() === "") {
      lastNameInput.style.borderBottom = "1px solid red";
      return false;
    }
  } else {
    lastNameError.innerHTML = "";
    lastNameInput.style.borderBottom = "1px solid #999";
  }

  // Validate username
  if (!fieldsValidated.username) {
    fieldsValidated.username = true;
    if (usernameInput.value.length < 1) {
      usernameInput.style.borderBottom = "1px solid red";
      return false;
    }
  } else {
    usernameError.innerHTML = "";
    usernameInput.style.borderBottom = "1px solid #999";
  }

  // Validate password
  if (!fieldsValidated.password) {
    fieldsValidated.password = true;
    if (passwordInput.value.length < 5) {
      passwordInput.style.borderBottom = "1px solid red";
      return false;
    }
  } else {
    passwordError.innerHTML = "";
    passwordInput.style.borderBottom = "1px solid #999";
  }

  return true;
}

// Register Form
document.getElementById('register').addEventListener('submit', (event) => {
  event.preventDefault();

  var firstName = document.getElementById('firstName').value;

  console.log('firstname: ' + firstName);
})