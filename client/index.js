document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    const form = document.querySelector('#addUserForm');
    form.addEventListener('submit', addUserFormSubmitted);
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";

    const response = await axios.get(`http://localhost:3000/users/all`);
    const users = response.data.payload;
    users.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.first_name} ${user.last_name}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();
    const first_name = document.querySelector('#firstNameInput').value;
    const last_name = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { first_name, last_name, age });
    loadUsers();
}