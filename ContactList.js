let searchForm = document.getElementById("search");
let addContactForm = document.getElementById("addContact");
let btn = document.getElementById("btn");
let inputGroup = document.querySelector('.inputWrapper');

const search = () => 
{
  searchForm.style.left = "50px";
  addContactForm.style.left ="450px";
  btn.style.left = "0px";
  inputGroup.style.gridTemplateColumns = '1fr 1fr';
}

const addContact = () => 
{
  searchForm.style.left = "-400px";
  addContactForm.style.left ="50px";
  btn.style.left = "110px";
  inputGroup.style.gridTemplateColumns = "repeat(2, 1fr)";
}

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  var confirmDelete = confirm("Are you sure you want to delete this contact?");

  if (confirmDelete)
  {
    row.parentNode.removeChild(row);
  }
}

var editRowIndex = -1; // Track the row being edited

    function editRow(button) {
      // Get the row index
      var row = button.parentNode.parentNode;
      editRowIndex = row.rowIndex;

      // Display the edit form
      document.getElementById('editForm').style.display = 'block';

      // Populate the form with row data
      document.getElementById('editFirstName').value = button.getAttribute('data-firstname');
      document.getElementById('editLastName').value = button.getAttribute('data-lastname');
      document.getElementById('editEmail').value = button.getAttribute('data-email');
      document.getElementById('editPhone').value = button.getAttribute('data-phone');
    }

    function updateRow() {
      // Update the table row with the edited data
      var table = document.querySelector('table');
      var row = table.rows[editRowIndex];
      row.cells[0].textContent = document.getElementById('editFirstName').value;
      row.cells[1].textContent = document.getElementById('editLastName').value;
      row.cells[2].textContent = document.getElementById('editEmail').value;
      row.cells[3].textContent = document.getElementById('editPhone').value;

      // Hide the edit form
      document.getElementById('editForm').style.display = 'none';

      // Reset the editRowIndex
      editRowIndex = -1;
    }