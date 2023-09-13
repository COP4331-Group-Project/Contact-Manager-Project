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

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "Username or Password incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "ContactList.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
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
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.style.display = 'block';
        return;
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
    sendNewUserData(url, payload);
}

const sendNewUserData = async (url, data) => {
    try 
    {
        const response = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json',
            },
        });

        // Response/errors
        if (response.ok) 
        {
            const res = await response.json();
            console.log(res);
        }
        else 
        {
            console.error("HTTP Error:", response.status);
        }
    }
    catch (error) 
    {
        console.error('An error occurred:', error);
    }
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


function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
