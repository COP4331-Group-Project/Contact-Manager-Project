const urlBase = 'http://cop4331-group23.com/LAMPAPI';
const extension = 'php';

var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

let userId;
let firstName = "";
let lastName = "";

let passwordIncorrect = false;

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

async function doLogin() {
    let userId;
    
    let usernameField = document.getElementById("loginUsername");
    let passwordField = document.getElementById("loginPassword");
    
    let login = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    
    // Reset username and password border colors
    usernameField.style.borderBottom = "1px solid #999";
    passwordField.style.borderBottom = "1px solid #999";

    var hash = md5(password);
    let tmp = { Login: login, Password: hash };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Login.' + extension;

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: jsonPayload
        });

        if (!response.ok) {
            // Handle non-successful response (e.g., show an error message)
            console.error("Login failed:", response.statusText);
            return;
        }

        let jsonObject = await response.json();
        console.log(jsonObject);
        userId = jsonObject.id;
        localStorage.setItem("userId", jsonObject.id);

        if (userId < 1) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let jsonObject = JSON.parse(xhr.responseText);
                    userId = jsonObject.id;

                    if (userId < 1)
                    {
                       const loginResult = document.getElementById("loginResult");
                       loginResult.textContent = "User/Password combination incorrect";
                       loginResult.style.display = 'block';
                       
                       usernameField.style.borderBottom = "1px solid red";
                       usernameField.placeholder += " *";
                       
                       passwordField.style.borderBottom = "1px solid red";
                       passwordField.placeholder += " *";
                       
                       return;
                    }

                    firstName = jsonObject.firstName;
                    lastName = jsonObject.lastName;

                    saveCookie();

                    window.location.href = "contact.html";
                }
            };
            xhr.open("POST", url, true);
            xhr.send(jsonPayload);
        } else {
            firstName = jsonObject.firstName;
            lastName = jsonObject.lastName;

            saveCookie();

            window.location.href = "ContactList.html";
        }
    } catch (err) {
        console.error(err);
    }
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
        firstNameInput.placeholder += " *";
        return false;
    }

    // Validate last name
    else if (lastNameInput.value.trim() === "") {
        lastNameInput.style.borderBottom = "1px solid red";
        lastNameInput.placeholder += " *";
        return false;
    }

    // Validate username
    else if (usernameInput.value.length < 1) {
        usernameInput.style.borderBottom = "1px solid red";
        usernameInput.placeholder += " *";
        return false;
    }

    // Validate password
    else if (passwordInput.value.length < 5) {
        passwordIncorrect = true;
        passwordInput.style.borderBottom = "1px solid red";
        passwordInput.placeholder += " *";
        return false;
    }
    
    else
    {
      return true;
    }

}

function registerNewUser()
{
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
    // Handles errors in the form 
    if (!validateRegistrationForm(firstNameInput, lastNameInput, usernameInput, passwordInput))
    {
        if (!passwordIncorrect)
        {
          const errorMsg = document.getElementById('errorMsg');
          errorMsg.style.display = 'block';
          return;
        }
        else
        {
          const passErrorMsg = document.getElementById('passErrorMsg');
          passErrorMsg.style.display = 'block';
          return;
        }
        
    }
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
    try {
            xhr.send(payload);
        }
    catch (err)
    {
        console.log("err");
    }
    console.log("SUCCESS");
    return;
}

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

function clearErrorMessages() {
    const errorMsg = document.getElementById('errorMsg');
    const passErrorMsg = document.getElementById('passErrorMsg');
    const loginResult = document.getElementById('loginResult');

    errorMsg.style.display = 'none';
    passErrorMsg.style.display = 'none';
    loginResult.style.display = 'none';
}

 function saveCookie()
 {
 	let minutes = 20;
 	let date = new Date();
 	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
 }

 function readCookie()
 {
 	userId = -1;
 	let data = document.cookie;
	let splits = data.split(",");
 	for(var i = 0; i < splits.length; i++) 
 	{
 		let thisOne = splits[i].trim();
 		let tokens = thisOne.split("=");
 		if( tokens[0] == "firstName" )
 		{
 			firstName = tokens[1];
 		}
 		else if( tokens[0] == "lastName" )
 		{
 			lastName = tokens[1];
 		}
 		else if( tokens[0] == "userId" )
 		{
			userId = parseInt( tokens[1].trim() );
 		}
 	}
	
 	if( userId < 0 )
 	{
 		window.location.href = "index.html";
 	}
 	else
 	{
 		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
 	}
 }
