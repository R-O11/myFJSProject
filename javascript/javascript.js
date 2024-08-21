/**
 * represantion is:
 * Nikita sigalov: 321953390
 * Razi Kabiya: 211756630
 */ 
'use strict';
/**
 * Array of user objects, each representing a user with various attributes.
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
  // Select the HTML element with the class 'list'
  const list = document.querySelector(".list");
  // Sort the users array
  sortArray();
  // Clear existing content in the list element
  list.innerHTML = '';
  // Iterate over the sorted users array
  users.forEach((elem, index) => {
    // Create a new list item element
    const item = document.createElement('li');
    item.className = "item";
    // Set the inner HTML of the list item
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
    // Append the list item to the list element
    list.appendChild(item);

    //  Adds a click event listener to a list item (`<li>`) that triggers the `showDetails` function.
    item.addEventListener('click', () => showDetails(index));

    // Add event listeners for mouseover and mouseout
    item.addEventListener('mouseover', () => {
      item.classList.add('active');
    });

    // Add event listener for mouseout event to remove highlight
    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
    });
  });
}


function showDetails(index) {
  // Retrieve the user object from the users array based on the index
  const user = users[index];
  
  // Set the title of the modal to include the username of the user
  setModalTitle('detailsModalTitle', `Details of ${user.username}`);

  // Populate the modal with user details
  document.getElementById('detailsUsername').textContent = user.username;
  document.getElementById('detailsPhone').textContent = user.phone;
  document.getElementById('detailsEmail').textContent = user.email;
  document.getElementById('detailsAddress').textContent = user.address;

  // Display the modal by setting its display style to 'flex'
  document.getElementById('detailsModal').style.display = 'flex';
  // Add event listener to the window to handle clicks outside the modal
  window.addEventListener('click', outsideClickListener);

}

function closeDetailsModal(event) {
  // Stop the event from propagating to prevent other handlers from being triggered
  event.stopPropagation();
  // Hide the modal by setting its display style to 'none'
  document.getElementById('detailsModal').style.display = 'none';
  // Remove the event listener that handles clicks outside the modal
  window.removeEventListener('click', outsideClickListener);

}

function outsideClickListener(event) {
  // Retrieve the modal element
  const detailsModal = document.getElementById('detailsModal');
  // Check if the click target is the modal itself
  if (event.target === detailsModal) {
    // Close the modal if the click occurred on the modal
    closeDetailsModal(event);
  }
}

function deleteUser(index) {
  // Remove the user at the specified index from the users array
  users.splice(index, 1);
  // Re-render the list of users to reflect the removal
  renderList();
}

function renderListFilter(filteredUsers) {
  // Retrieve the list container element from the DOM
  const list = document.querySelector(".list");
  // Clear the existing content in the list container
  list.innerHTML = '';
  // Iterate over the filtered users array
  filteredUsers.forEach((elem, index) => {
    // Create a new list item element
    const item = document.createElement('li');
    item.className = "item";
    // Set the inner HTML of the list item
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
    // Append the new list item to the list container
    list.appendChild(item);

    // Add event listeners for mouseover and mouseout
    item.addEventListener('mouseover', () => {
      item.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      // Remove the 'active' class from the list item when the mouse leaves
      item.classList.remove('active');
    });
  });
}

// Searches and filters the list of users based on the search input value.
function searchUsers() {
  // Retrieve and process the search input value
  const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();

  // Filter the users array based on the search input
  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchValue));

  // Render the list with filtered users
  renderListFilter(filteredUsers);
}

// Attaches an event listener to the search input field to trigger the `searchUsers` function on input events.
document.getElementById('searchInput').addEventListener('input', searchUsers);

function editUser(index) {

  // Retrieve the user object from the array

  const user = users[index];

  // Check if the details modal is open and close it if necessary

  const detailsModal = document.getElementById('detailsModal');
  if (detailsModal.style.display === 'flex') {
    closeDetailsModal(new Event('click'));
  }

  // Get references to the modal elements and input fields

  const modal = document.getElementById('myModal');
  const saveUserBtn = document.getElementById('saveUserBtn');
  const inputUserName = document.getElementById('inputUserName');
  const inputUserPhone = document.getElementById('inputUserPhone');
  const inputUserEmail = document.getElementById('inputUserEmail');
  const inputUserAddress = document.getElementById('inputUserAddress');

  // Populate the input fields with the current user details

  inputUserName.value = users[index].username;
  inputUserPhone.value = users[index].phone;
  inputUserEmail.value = users[index].email;
  inputUserAddress.value = users[index].address;

  // Set the title of the modal
  setModalTitle('modalTitle', 'Edit Contact');

  // Set up event listener for the form submission
  const userForm = document.getElementById('userForm');
  userForm.onsubmit = function (event) {
    event.preventDefault(); // Prevent default form submission
    const username = inputUserName.value.trim();
    const phone = inputUserPhone.value.trim();
    const email = inputUserEmail.value.trim();
    const address = inputUserAddress.value.trim();
    // Validate input fields
    if (username && phone) {
      // Update user details in the array
      users[index].username = username;
      users[index].phone = phone;
      users[index].email = email;
      users[index].address = address;
      closeModal(); // Close the modal
      renderList(); // Refresh the user list
    } else {
      alert('Please enter both username and phone.'); // Show an alert if validation fails
    }
  };

  // Display the modal
  modal.style.display = 'flex';

  function closeDetailsModal(event) {
    event.stopPropagation();
    // const modalContent = document.querySelector('.modal-content');
    // if (!modalContent.contains(event.target)) {
    //   document.getElementById('detailsModal').style.display = 'none';
    // }
    document.getElementById('detailsModal').style.display = 'none';
    window.removeEventListener('click', outsideClickListener);
  }
  
  document.addEventListener('click', function (event) {
    const modal = document.getElementById('myModal');
    const modalContent = modal.querySelector('.modal-content');
    if (modal.style.display === 'flex' && !modalContent.contains(event.target) && !event.target.classList.contains('btn')) {
      closeModal();
    }
  });
}

// Hides the modal with `id="myModal"` by setting its display style to `'none'`.
function openModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

// Hides the modal with `id="myModal"` by setting its display style to `'none'`.
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
  // Clear previous input values
  inputUserName.value = '';
  inputUserPhone.value = '';
  inputUserEmail.value = '';
  inputUserAddress.value = '';
  
  // Set the modal title to "Add Contact"
  setModalTitle('modalTitle', 'Add Contact');

  // Set up event listener for the form submission
  const userForm = document.getElementById('userForm');
  userForm.onsubmit = function (event) {
    event.preventDefault();
    // Retrieve and trim input values
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

    // Add new user if validation is successful

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

// Prompts the user to confirm the deletion of the entire user list and clears the list if confirmed.
function deleteList() {
  const list = document.querySelector(".list");
  // Prompt the user for confirmation
  if (confirm("Are you sure you want to delete this list? ")) {
    // Clear the list by setting its innerHTML to an empty string
    list.innerHTML = '';
  }
}

function setModalTitle(modalTitleId, title) {
  // Retrieve the HTML element using the provided ID
  const modalTitle = document.getElementById(modalTitleId);
  // Update the text content of the title element with the new title
  modalTitle.textContent = title;
}