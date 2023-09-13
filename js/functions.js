const urlBase = "http://cop4331-group23.com/LAMPAPI";
const extension = "php";

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

const validateRegistrationForm = (firstNameInput, lastNameInput, usernameInput, passwordInput) =>
{
    // Reset error styles
    firstNameInput.style.borderBottom = "1px solid #999";
    lastNameInput.style.borderBottom = "1px solid #999";
    usernameInput.style.borderBottom = "1px solid #999";
    passwordInput.style.borderBottom = "1px solid #999";
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.style.display = 'none';


    // Validate first name
    if (firstNameInput.value.trim() === "") {
        firstNameInput.style.borderBottom = "1px solid red";
        return false;
    }

    // Validate last name
    if (lastNameInput.value.trim() === "") {
        lastNameInput.style.borderBottom = "1px solid red";
        return false;
    }

    // Validate username
    if (usernameInput.value.length < 1) {
        usernameInput.style.borderBottom = "1px solid red";
        return false;
    }

    // Validate password
    if (passwordInput.value.length < 5) {
        passwordInput.style.borderBottom = "1px solid red";
        return false;
    }

    return true;
}

function registerNewUser()
{
    console.log("ENTER FUNCT");
    // For error handling
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const usernameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');

    // Getting the users full name
    const firstName = document.getElementById('firstName').value.trim(); 
    const lastName = document.getElementById('lastName').value.trim();
    // Getting the username/password
    const username = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();
    console.log("HANDLING FORM ERR");
    // Handles errors in the form 
    if (!validateRegistrationForm(firstNameInput, lastNameInput, usernameInput, passwordInput))
    {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.style.display = 'block';
        return;
    }
    console.log("HASHING PASS AND GETTING DATA READY");
    // Handles a valid form and sending to the database
    let hashedPassword = md5(password);

    let formData = 
    {
        FirstName: firstName,
        LastName: lastName,
        Login: username,
        Password: hashedPassword,
    }

    let payload = JSON.stringify(formData);


    const url = urlBase + '/Register.' + extension;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    console.log("ENTER TRY");
    try {
            console.log("Send payload");
            xhr.send(payload);
        }
    catch (err)
    {
        console.log("FUCK");
    }
    console.log("SUCCESS");
    return;
}

// const sendNewUserData = async (url, data) => {
//     try 
//     {
//         const response = await fetch(url, {
//             method: "POST",
//             body: data,
//             headers: {
//                 'Content-type': 'application/json',
//             },
//         });

//         // Response/errors
//         if (response.ok) 
//         {
//             const res = await response.json();
//             console.log(res);
//         }
//         else 
//         {
//             console.error("HTTP Error:", response.status);
//         }
//     }
//     catch (error) 
//     {
//         console.error('An error occurred:', error);
//     }
//     return;
// }

const showErr = (inputId) => 
{
    const inputElement = document.getElementById(inputId);
    inputElement.style.borderBottom = '1px solid red';
}

const clearErr = (inputId) =>
{
    const inputElement = document.getElementById(inputId);
    inputElement.style.borderBottom = '1px solid red';
}
