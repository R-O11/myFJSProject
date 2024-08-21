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
    const usernameA = a.username.toLowerCase();
    const usernameB = b.username.toLowerCase();

    if (usernameA < usernameB) return -1;
    if (usernameA > usernameB) return 1;
    return 0;
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
        <button class="btn" onclick="showUserDetails(${index})">Details</button>
      </div>
    `;
    list.appendChild(item);

    item.addEventListener('mouseover', () => {
      item.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
    });
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
        <button class="btn" onclick="showUserDetails(${index})">Details</button>
      </div>
    `;
    list.appendChild(item);

    item.addEventListener('mouseover', () => {
      item.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
    });
  });
}

function searchUsers() {
  const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchValue));
  renderListFilter(filteredUsers);
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

  const userForm = document.getElementById('userForm');
  userForm.onsubmit = function (event) {
    event.preventDefault();
    const username = inputUserName.value.trim();
    const phone = inputUserPhone.value.trim();
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
  const inputUserName = document.getElementById('inputUserName');
  const inputUserPhone = document.getElementById('inputUserPhone');
  const inputUserEmail = document.getElementById('inputUserEmail');
  const inputUserAddress = document.getElementById('inputUserAddress');

  inputUserName.value = '';
  inputUserPhone.value = '';
  inputUserEmail.value = '';
  inputUserAddress.value = '';
  setModalTitle('Add Contact');

  const userForm = document.getElementById('userForm');
  userForm.onsubmit = function (event) {
    event.preventDefault();
    const username = inputUserName.value.trim();
    const phone = inputUserPhone.value.trim();
    const email = inputUserEmail.value.trim();
    const address = inputUserAddress.value.trim();
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert(`Username '${username}' already exists. Please enter a different username.`);
      return;
    }

    if (username && phone) {
      users.push({ username, phone, email, address });
      closeModal();
      renderList();
    } else {
      alert('Please enter both username and phone.');
    }
  };

  modal.style.display = 'flex';
}

function deleteList() {
  const list = document.querySelector(".list");
  if (confirm("Are you sure you want to delete this list? ")) {
    list.innerHTML = '';
  }
}

function setModalTitle(title) {
  const modalTitle = document.getElementById('modalTitle');
  modalTitle.textContent = title;
}

function showUserDetails(index) {
  const detailsModal = document.getElementById('detailsModal');
  const detailsUsername = document.getElementById('detailsUsername');
  const detailsPhone = document.getElementById('detailsPhone');
  const detailsEmail = document.getElementById('detailsEmail');
  const detailsAddress = document.getElementById('detailsAddress');
  const detailsText = document.getElementById('detailsText');

  detailsUsername.textContent = users[index].username;
  detailsPhone.textContent = users[index].phone;
  detailsEmail.textContent = users[index].email;
  detailsAddress.textContent = users[index].address;
  detailsText.textContent = users[index].text;

  detailsModal.style.display = 'flex';
}

function closeDetailsModal() {
  const detailsModal = document.getElementById('detailsModal');
  detailsModal.style.display = 'none';
}

// Close modal if clicked outside of it
function outsideClickListener(event) {
  const modal = document.getElementById('myModal');
  if (event.target === modal) {
    closeModal();
  }
}
