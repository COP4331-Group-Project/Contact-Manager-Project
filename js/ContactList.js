const urlBase = 'http://cop4331-group23.com/LAMPAPI';
const extension = 'php';
const modalIdToClose = ['editModal', 'addContactModal']
let contactId = null;
let currentContactData = { curFN: null, curLN: null, curEmail: null, curPhone: null };
const contactFormMsg = document.getElementById("addContactFormMsg");
const editContactFormMsg = document.getElementById("editContactFormMsg");

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  let contactId = row.id;
  var confirmDelete = confirm("Are you sure you want to delete this contact?");

  if (confirmDelete)
  {
    let tmp = { ID: contactId }
    deleteFromContactAsync(tmp).catch((error) =>
    {
      console.log(error.message);
    });
  }
}

async function deleteFromContactAsync(tmp)
{
  const jsonPayload = JSON.stringify(tmp);
  const url = `${urlBase}/Delete.${extension}`;

  try
  {
    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: jsonPayload,
    });

    if (response.status === 200)
    {
      search();
    }
    else
    {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  }
  catch(error)
  {
    console.log(error.message);
  }
}

function openEditContactModal(button) {
  // Get the row ID
  contactId = button.parentNode.parentNode.id;
  document.getElementById('editFirstName').value = button.getAttribute('data-firstname');
  document.getElementById('editLastName').value = button.getAttribute('data-lastname');
  document.getElementById('editEmail').value = button.getAttribute('data-email');
  document.getElementById('editPhone').value = button.getAttribute('data-phone');

  currentContactData = {
    curFN: document.getElementById('editFirstName').value,
    curLN: document.getElementById('editLastName').value,
    curEmail: document.getElementById('editEmail').value,
    curPhone: document.getElementById('editPhone').value
  }

  // Open the modal
  const modalId = button.getAttribute('data-modal-id');
  openModal(modalId);
}

function updateRow()
{
  if (contactId)
  {
    // Get the data to send
    let updatedFN = document.getElementById('editFirstName').value;
    let updatedLN = document.getElementById('editLastName').value;
    let updatedPhone = document.getElementById('editPhone').value;
    let updatedEmail = document.getElementById('editEmail').value;

    if (
        currentContactData.curFN === updatedFN &&
        currentContactData.curLN === updatedLN &&
        currentContactData.curEmail === updatedEmail &&
        currentContactData.curPhone === updatedPhone
      ) {
        editContactFormMsg.style.display = 'block';
        editContactFormMsg.style.color = 'red';
        editContactFormMsg.textContent = "No Information Changed!";
        return;
      }

    let tmp =
    {
      ID: contactId,
      FirstName: updatedFN,
      LastName: updatedLN,
      Phone: updatedPhone,
      Email: updatedEmail,
    }

    updateContactAsync(tmp).catch((error) => console.log(error.message));
  }

  // Reset the editRowIndex
  editRowIndex = -1;
}

async function updateContactAsync(tmp)
{
  const jsonPayload = JSON.stringify(tmp);
  const url = `${urlBase}/Update.${extension}`;
  try
  {
    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: jsonPayload,
    });

    if (response.status === 200)
    {
      editContactFormMsg.style.display = 'block';
      editContactFormMsg.style.color = 'white';
      editContactFormMsg.textContent = "Contact Updated!";
      search();
    }
    else
    {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  }
  catch (error)
  {
    console.log(error.message);
  }
}

// ADD CONTACT FUNCTIONS
const addContact = () =>
{
  // Open Modal
  const addContactModalId= document.getElementById('addContactModal');
  addContactModalId.showModal();
}

// MODAL FUNCTIONS
function closeModal(id) {
  const modal = document.getElementById(id);
  modal.close();

  // Reset Form Error Validation
  contactFormMsg.style.display = "none";
  editContactFormMsg.style.display = "none";
  // Clear the input fields of the forms
  // Reset Add Contact Form
  document.getElementById('newFirstName').value = "";
  document.getElementById('newLastName').value = "";
  document.getElementById('newEmail').value = "";
  document.getElementById('newPhoneNum').value = "";
  // Reset Edit Contact Form
  document.getElementById('editFirstName').value = "";
  document.getElementById('editLastName').value = "";
  document.getElementById('editPhone').value = "";
  document.getElementById('editEmail').value = "";
  // Reset the editRowIndex
  editRowIndex = -1;
}

const openModal = (id) =>
{
  const modal = document.getElementById(id);
  // Open the modal
  modal.showModal();
}

// Closing the edit modal
const editModal = document.getElementById('editModal');
editModal.addEventListener('click', (event) =>
{
  const dialogDimensions = editModal.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    editModal.close();
  }
})

// Close the Add Contact Modal
const contactModal = document.getElementById('addContactModal');
contactModal.addEventListener('click', (event) =>
{
  const dialogDimensions = contactModal.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    contactModal.close();
  }
})

function search()
{
  const noContactElement = document.getElementById("noContacts");
	let srch = document.getElementById("searchContact").value.trim();
  const userId = localStorage.getItem("userId");

	let tmp = { search:srch, userId:userId };
	let jsonPayload = JSON.stringify( tmp );
  console.log(jsonPayload);

	let url = urlBase + '/Search.' + extension;

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

        if (jsonObject.results == null)
        {
          document.getElementById('tableBody').innerHTML = ``;
          noContactElement.style.display = 'flex';
          return;
        }
        else
        {
          noContactElement.style.display = 'none';
          let tableBody = document.getElementById("tableBody");
          tableBody.innerHTML = '';

          jsonObject.results.forEach((results) =>
          {
            let row = tableBody.insertRow();

            // Extract the contact's ID
            let contactID = results.ID;

            row.id = contactID;

            let fnCell = row.insertCell(0);
            let lnCell = row.insertCell(1);
            let emailCell = row.insertCell(2);
            let phoneCell = row.insertCell(3);
            let actionCell1 = row.insertCell(4);
            let actionCell2 = row.insertCell(5);

            // Set the cell content based on the JSON data
            fnCell.innerHTML = results.FirstName;
            lnCell.innerHTML = results.LastName;
            emailCell.innerHTML = results.Email;
            // puts phone # in (xxx)-xxx-xxxx format
            const formattedPhoneNumber = 
            `(${results.Phone.slice(0, 3)})-${results.Phone.slice(3, 6)}-${results.Phone.slice(6)}`;
            phoneCell.innerHTML = formattedPhoneNumber;
            // Add Action Cells
            actionCell1.innerHTML = `
            <td>
                <button
                  id="editButton"
                  class="editBtn"
                  onclick="openEditContactModal(this)"
                  data-firstname="${results.FirstName}"
                  data-lastname="${results.LastName}"
                  data-email="${results.Email}"
                  data-phone="${results.Phone}"
                  data-modal-id="editModal"
                >
                  EDIT
                </button>
              </td>
            `
            actionCell2.innerHTML = `
              <td>
                <button
                  id="deleteButton"
                  class="deleteBtn"
                  onclick="deleteRow(this)"
                >
                  REMOVE
                </button>
              </td>
            `
          })
        }
        console.log(jsonObject);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
    console.log("error");
	}
}

function add()
{
  const userId = localStorage.getItem("userId");
  let newFirstName = document.getElementById('newFirstName').value;
  let newLastName = document.getElementById('newLastName').value;
  let newEmail = document.getElementById('newEmail').value;
  let newPhoneNum = document.getElementById('newPhoneNum').value;
  // Hanlde form validation
  // First name
  if (newFirstName === "" || newLastName === "")
  {
    contactFormMsg.style.display = "block";
    contactFormMsg.style.color = "red";
    contactFormMsg.textContent = "Please Enter a Valid First/Last Name!";
    return;
  }
  if (newEmail === "" || newPhoneNum === "")
  {
    contactFormMsg.style.display = "block";
    contactFormMsg.style.color = "red";
    contactFormMsg.textContent = "Please Enter a Valid Email/Phone Number!";
    return;
  }
  
	let tmp =
  {
    FirstName: newFirstName,
    LastName: newLastName,
    Phone: newPhoneNum,
    Email: newEmail,
    UserID: userId,
  };

	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Create.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
        // Show a success message when we get the 200 code back
        contactFormMsg.style.display = "block";
        contactFormMsg.style.color = "white";
        contactFormMsg.textContent = "Contact Successfully Added!";
        search();

        // Clear the input fields
        document.getElementById('newFirstName').value = "";
        document.getElementById('newLastName').value = "";
        document.getElementById('newEmail').value = "";
        document.getElementById('newPhoneNum').value = "";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
    console.log("Error");
	}
}

const refreshPage = () => window.location.reload();

function doLogout()
{
  console.log("Logout hit");
  userId = 0;
  FirstName = "";
  LastName = "";
  localStorage.removeItem("userId");
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
}
