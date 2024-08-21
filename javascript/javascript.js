
'use strict';
/**
 * represantion is:
 * Nikita sigalov: 321953390
 * Razi Kabiya: 211756630
 */ 

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
let editingIndex = null; // To track the index of the user being edited


renderList();
function sortArray() {
  // Function to sort the array of users by their username
  users.sort((a, b) => {
    // Convert usernames to lowercase for case-insensitive comparison
    const usernameA = a.username.toLowerCase();
    const usernameB = b.username.toLowerCase();

    // Compare the usernames
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
      <button class="btn" onclick="editUser(${index}, event)">Edit</button>
        <button class="btn" onclick="deleteUser(${index})">Delete</button>
      </div>
    `;
    list.appendChild(item);

    item.addEventListener('click', (event) => {
      if (!event.target.classList.contains('btn')) {
        showDetails(index);
      }
    });
    // Add event listeners for mouseover and mouseout
    item.addEventListener('mouseover', () => {
      item.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
    });
  });
}


function showDetails(index) {
  const user = users[index];

  setModalTitle('detailsModalTitle', `Details of ${user.username}`);

  document.getElementById('detailsUsername').textContent = user.username;
  document.getElementById('detailsPhone').textContent = user.phone;
  document.getElementById('detailsEmail').textContent = user.email;
  document.getElementById('detailsAddress').textContent = user.address;

  // Display the details modal
  document.getElementById('detailsModal').style.display = 'flex';
  window.addEventListener('click', outsideClickListener);

}

function closeDetailsModal(event) {
  event.stopPropagation();
  document.getElementById('detailsModal').style.display = 'none';
  window.removeEventListener('click', outsideClickListener);

}

function outsideClickListener(event) {
  const detailsModal = document.getElementById('detailsModal');
  if (event.target === detailsModal) {
    closeDetailsModal(event);
  }
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
        <button class="btn edit-btn" onclick="editUser(${index}, event))">Edit</button>
        <button class="btn" onclick="deleteUser(${index})">Delete</button>
      </div>
    `;
    list.appendChild(item);

    item.addEventListener('click', (event) => {
      if (!event.target.classList.contains('btn')) {
        showDetails(index);
      }
    });
    // Add event listeners for mouseover and mouseout
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

  // Filter users based on search input
  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchValue));

  // Render filtered users
  renderListFilter(filteredUsers);
}

document.getElementById('searchInput').addEventListener('input', searchUsers);

function editUser(index , event) {

  event.stopPropagation();
  let editingIndex = null;

  const user = users[index];

  openModal();

  document.getElementById('inputUserName').value = user.username;
  document.getElementById('inputUserPhone').value = user.phone;
  document.getElementById('inputUserEmail').value = user.email;
  document.getElementById('inputUserAddress').value = user.address;

  
  setModalTitle('modalTitle', 'Edit Contact');

  // Set up event listener for the form submission

  function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';
    document.getElementById('userForm').onsubmit = handleFormSubmit;
  }
  
  function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  const userForm = document.getElementById('userForm');


  function handleFormSubmit(event) {
    event.preventDefault();
  
    const username = document.getElementById('inputUserName').value.trim();
    const phone = document.getElementById('inputUserPhone').value.trim();
    const email = document.getElementById('inputUserEmail').value.trim();
    const address = document.getElementById('inputUserAddress').value.trim();
  
    if (username && phone) {
      const existingUser = users.find(user => user.username === username);
      if (existingUser && editingIndex === null) {
        alert(`Username '${username}' already exists. Please enter a different username.`);
        return;
      }
  
      if (editingIndex !== null) {
        // Edit existing user
        users[editingIndex] = { username, phone, email, address };
      } else {
        // Add new user
        users.push({ username, phone, email, address });
      }
  
      closeModal();
      renderList();
    } else {
      alert('Please enter both username and phone.');
    }
  }
  modal.style.display = 'flex';

  
  document.addEventListener('click', function (event) {
    const modal = document.getElementById('myModal');
    const modalContent = modal.querySelector('.modal-content');
    if (modal.style.display === 'flex' && !modalContent.contains(event.target) && !event.target.classList.contains('btn')) {
      closeModal();
    }
  });
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
  openModal();

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
      users.push({ username, phone, email, address }); // Fixed phone and address duplication
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
  if (confirm("Are you sure you want to delete this list? ")) {
    list.innerHTML = '';
  }
}

function setModalTitle(modalTitleId, title) {
  const modalTitle = document.getElementById(modalTitleId);
  modalTitle.textContent = title;
}
