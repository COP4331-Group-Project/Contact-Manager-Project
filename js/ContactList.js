const modalIdToClose = ['editModal', 'addContactModal']
let editRowIndex = -1; // Track the row being edited

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  var confirmDelete = confirm("Are you sure you want to delete this contact?");

  if (confirmDelete)
  {
    row.parentNode.removeChild(row);
  }
}

function editRow(button) {

  // Get the row index
  var row = button.parentNode.parentNode;
  editRowIndex = row.rowIndex;

  // Populate the form with row data
  document.getElementById('editFirstName').value = button.getAttribute('data-firstname');
  document.getElementById('editLastName').value = button.getAttribute('data-lastname');
  document.getElementById('editEmail').value = button.getAttribute('data-email');
  document.getElementById('editPhone').value = button.getAttribute('data-phone');

  // Open the modal
  const modalId = button.getAttribute('data-modal-id');
  openModal(modalId);
  
}

function updateRow() 
{
  // Update the table row with the edited data
  var table = document.querySelector('table');
  var row = table.rows[editRowIndex];
  row.cells[0].textContent = document.getElementById('editFirstName').value;
  row.cells[1].textContent = document.getElementById('editLastName').value;
  row.cells[2].textContent = document.getElementById('editEmail').value;
  row.cells[3].textContent = document.getElementById('editPhone').value;

  // Close the dialog
  const editForm = document.getElementById("editForm");
  editForm.close();

  // Reset the editRowIndex
  editRowIndex = -1;
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

function add()
{
  let firstName = document.getElementById('newFirstName').value.trim();
  let lastName = document.getElementById('newLastName').value.trim(); 
  let email = document.getElementById('newEmail').value.trim(); 
  let number = document.getElementById('newPhoneNum').value.trim(); 

	document.getElementById("contactAddResult").innerHTML = "";

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
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function searchContact()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

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
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}