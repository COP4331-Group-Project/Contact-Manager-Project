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