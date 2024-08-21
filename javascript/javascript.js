/**
 * represantion is:
 * Nikita sigalov: 321953390
 * Razi Kabiya: 211756630
 */ 
'use strict'; // Enforces strict mode for better error checking

// Sample user data
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

// Initial rendering of the user list
renderList();

/**
 * Sorts the `users` array by the `username` property in a case-insensitive manner.
 */
function sortArray() {
  users.sort((a, b) => {
    const usernameA = a.username.toLowerCase();
    const usernameB = b.username.toLowerCase();

    if (usernameA < usernameB) return -1;
    if (usernameA > usernameB) return 1;
    return 0;
  });
}

/**
 * Renders the list of users on the webpage.
 */
function renderList() {
  const list = document.querySelector(".list");
  sortArray();
  list.innerHTML = ''; // Clears existing list content
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

    item.addEventListener('click', () => showDetails(index));

    // Add event listeners for mouseover and mouseout
    item.addEventListener('mouseover', () => {
      item.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
    });
  });
}

/**
 * Displays the details of a user in a modal.
 * @param {number} index - The index of the user in the `users` array.
 */
function showDetails(index) {
  const user = users[index];

  setModalTitle('detailsModalTitle', `Details of ${user.username}`);

  document.getElementById('detailsUsername').textContent = user.username;
  document.getElementById('detailsPhone').textContent = user.phone;
  document.getElementById('detailsEmail').textContent = user.email;
  document.getElementById('detailsAddress').textContent = user.address;

  document.getElementById('detailsModal').style.display = 'flex';
  window.addEventListener('click', outsideClickListener);
}

/**
 * Closes the details modal when clicking outside the modal.
 * @param {Event} event - The click event.
 */
function closeDetailsModal(event) {
  event.stopPropagation();
  document.getElementById('detailsModal').style.display = 'none';
  window.removeEventListener('click', outsideClickListener);
}

/**
 * Closes the details modal if the user clicks outside of it.
 * @param {Event} event - The click event.
 */
function outsideClickListener(event) {
  const detailsModal = document.getElementById('detailsModal');
  if (event.target === detailsModal) {
    closeDetailsModal(event);
  }
}

/**
 * Deletes a user from the `users` array by index and re-renders the list.
 * @param {number} index - The index of the user to be deleted.
 */
function deleteUser(index) {
  users.splice(index, 1);
  renderList();
}

/**
 * Renders a filtered list of users based on a search query.
 * @param {Array} filteredUsers - The array of filtered user objects.
 */
function renderListFilter(filteredUsers) {
  const list = document.querySelector(".list");
  list.innerHTML = ''; // Clears existing list content
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

    item.addEventListener('mouseover', () => {
      item.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
    });
  });
}

/**
 * Filters users based on the input in the search field and renders the filtered list.
 */
function searchUsers() {
  const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();

  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchValue));

  renderListFilter(filteredUsers);
}

// Attach search function to the input event
document.getElementById('searchInput').addEventListener('input', searchUsers);

/**
 * Opens the edit modal for a specific user.
 * @param {number} index - The index of the user to be edited.
 */
function editUser(index) {
  const user = users[index];

  const detailsModal = document.getElementById('detailsModal');
  if (detailsModal.style.display === 'flex') {
    closeDetailsModal(new Event('click'));
  }

  const modal = document.getElementById('myModal');
  const saveUserBtn = document.getElementById('saveUserBtn');
  const inputUserName = document.getElementById('inputUserName');
  const inputUserPhone = document.getElementById('inputUserPhone');
  const inputUserEmail = document.getElementById('inputUserEmail');
  const inputUserAddress = document.getElementById('inputUserAddress');

  inputUserName.value = user.username;
  inputUserPhone.value = user.phone;
  inputUserEmail.value = user.email;
  inputUserAddress.value = user.address;
  setModalTitle('modalTitle', 'Edit Contact');

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

  // Close the modal when clicking outside the modal content
  document.addEventListener('click', function (event) {
    const modal = document.getElementById('myModal');
    const modalContent = modal.querySelector('.modal-content');
    if (modal.style.display === 'flex' && !modalContent.contains(event.target) && !event.target.classList.contains('btn')) {
      closeModal();
    }
  });
}

/**
 * Opens the add contact modal and sets up the form for adding a new contact.
 */
function addContact() {
  const modal = document.getElementById('myModal');
  const inputUserName = document.getElementById('inputUserName');
  const inputUserPhone = document.getElementById('inputUserPhone');
  const inputUserEmail = document.getElementById('inputUserEmail');
  const inputUserAddress = document.getElementById('inputUserAddress');

  // Clear previous input values
  inputUserName.value = '';
  inputUserPhone.value = '';
  inputUserEmail.value = '';
  inputUserAddress.value = '';

  setModalTitle('modalTitle', 'Add Contact');

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

/**
 * Deletes all items from the list after user confirmation.
 */
function deleteList() {
  const list = document.querySelector(".list");
  if (confirm("Are you sure you want to delete this list?")) {
    list.innerHTML = '';
  }
}

/**
 * Sets the title of a modal.
 * @param {string} modalTitleId - The ID of the modal title element.
 * @param {string} title - The title text to be set.
 */
function setModalTitle(modalTitleId, title) {
  const modalTitle = document.getElementById(modalTitleId);
  modalTitle.textContent = title;
}