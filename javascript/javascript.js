/**
 * represantion is:
 * Nikita sigalov: 321953390
 * Razi Kabiya: 211756630
 */
'use strict';

const users = [
  {
    "username": "user2",
    "phone": "123-456-7890",
    "email": "user2@gmail.com",
    "address": "haifa",
    "text": "random text 2"
  },
  {
    "username": "user1",
    "phone": "234-567-8901",
    "email": "user1@gmail.com",
    "address": "tel aviv",
    "text": "random text 1"

  },
  {
    "username": "user5",
    "phone": "345-678-9012",
    "email": "user5@gmail.com",
    "address": "Jerusalem",
    "text": "random text 5"

  },
  {
    "username": "user4",
    "phone": "456-789-0123",
    "email": "user4@gmail.com",
    "address": "Eilat",
    "text": "random text 4"

  },
  {
    "username": "user3",
    "phone": "567-890-1234",
    "email": "user3@gmail.com",
    "address": "italy",
    "text": "random text 3"

  }
];

renderList();
function sortArray() {
  // Function to sort the array of users by their username
  users.sort((a, b) => {
    // Convert usernames to lowercase for case-insensitive comparison
    const usernameA = a.username.toLowerCase();
    const usernameB = b.username.toLowerCase();

    // Compare the usernames
    if (usernameA < usernameB) {
      return -1; // a comes before b
    }
    if (usernameA > usernameB) {
      return 1; // a comes after b
    }
    return 0; // usernames are equal
  });
}
function renderList() {
  const list = document.querySelector(".list");
  sortArray();
  list.innerHTML = '';
  users.forEach((elem, index) => {
    const item = document.createElement('li');
    item.className = "item";
    item.innerHTML = `
            <div class="Book">
                <div class="person_name">${elem.username}</div>
                <div class="Person_Phone">${elem.phone}</div>
            </div>
            <div class="btns">
                <button class="btn" onclick="editUser(${index})">Edit</button>
                <button class="btn" onclick="deleteUser(${index})">Delete</button>
            </div>
        `;
    list.appendChild(item);
  });
}

function deleteUser(index) {
  users.splice(index, 1);
  renderList();
}

function renderListFilter(filteredUsers) {
  const list = document.querySelector(".list");
  list.innerHTML = '';
  filteredUsers.forEach((elem, index) => {
    const item = document.createElement('li');
    item.className = "item";
    item.innerHTML = `
            <div class="Book">
                <div class="person_name">${elem.username}</div>
                <div class="Person_Phone">${elem.phone}</div>
            </div>
            <div class="btns">
                <button class="btn" onclick="editUser(${index})">Edit</button>
                <button class="btn" onclick="deleteUser(${index})">Delete</button>
            </div>
        `;
    list.appendChild(item);
  });
}
function searchUsers() {
  const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();

  // Filter users based on search input
  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchValue));

  // Render filtered users
  renderListFilter(filteredUsers);
}
function deleteUser(index) {
  users.splice(index, 1);
  renderList();
}
document.getElementById('searchInput').addEventListener('input', searchUsers);

function editUser(index) {
  const modal = document.getElementById('myModal');
  const saveUserBtn = document.getElementById('saveUserBtn');
  const inputUserName = document.getElementById('inputUserName');
  const inputUserPhone = document.getElementById('inputUserPhone');
  const inputUserEmail = document.getElementById('inputUserEmail');
  const inputUserAddress = document.getElementById('inputUserAddress');


  inputUserName.value = users[index].username;
  inputUserPhone.value = users[index].phone;
  inputUserEmail.value = users[index].email;
  inputUserAddress.value = users[index].address;
  setModalTitle('Edit User');

  // Set up event listener for the form submission
  const userForm = document.getElementById('userForm');
  userForm.onsubmit = function (event) {
    event.preventDefault();
    const username = inputUserName.value.trim();
    const phone = inputUserPhone.value.
      trim();
    const email = inputUserEmail.value.trim();
    const address = inputUserAddress.value.trim();
    if (username && phone) {
      users[index].username = username;
      users[index].phone = phone;
      users[index].email = email;
      users[index].address = address;
      closeModal();
      renderList();
    } else {
      alert('Please enter both username and phone.');
    }

  };

  // Display the modal
  modal.style.display = 'flex';
  document.addEventListener('click', outsideClickListener);

}

function openModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';

}


function addContact() {
  const modal = document.getElementById('myModal');
  modal.style.h2 = 'Add contact'
  const inputUserName = document.getElementById('inputUserName');
  const inputUserPhone = document.getElementById('inputUserPhone');
  const inputUserEmail = document.getElementById('inputUserEmail');
  const inputUserAddress = document.getElementById('inputUserAddress');
  // Clear previous input values
  inputUserName.value = '';
  inputUserPhone.value = '';
  inputUserEmail.value = '';
  inputUserAddress.value = '';
  setModalTitle('Add Contact');

  // Set up event listener for the form submission
  const userForm = document.getElementById('userForm');
  userForm.onsubmit = function (event) {
    event.preventDefault();
    const username = inputUserName.value.trim();
    const phone = inputUserPhone.value.trim();
    const email = inputUserEmail.value.trim();
    const address = inputUserAddress.value.trim();
    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert(`Username '${username}' already exists. Please enter a different username.`);
      return;
    }

    if (username && phone) {
      // Add new user to the array
      users.push({ username, phone, email, phone });
      closeModal(); // Close modal after adding contact
      renderList(); // Re-render the list of users
    } else {
      alert('Please enter both username and phone.');
    }
  };

  // Display the modal for adding a new contact
  modal.style.display = 'flex';


}
function deleteList() {
  const list = document.querySelector(".list");
  if (confirm("Are youo sure you want to delete this list? "))
    list.innerHTML = '';
}
function setModalTitle(title) {
  const modalTitle = document.getElementById('modalTitle');
  modalTitle.textContent = title;
}
