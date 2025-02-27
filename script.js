document.addEventListener("DOMContentLoaded", loadUsers);


const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const editIndex = document.getElementById("editIndex");
const userTable = document.getElementById("userTable");

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const index = editIndex.value;

    if (firstName === "" || lastName === "") {
        alert("Please enter both First Name and Last Name.");
        return;
    }

    if (index === "") {
        users.push({ firstName, lastName });
    } else {
        users[index] = { firstName, lastName };
    }
    
    localStorage.setItem("users", JSON.stringify(users));
    this.reset();
    editIndex.value = "";
    loadUsers();
});

function loadUsers() {
    userTable.innerHTML = "";
    (JSON.parse(localStorage.getItem("users")) || []).forEach((user, index) => {
        userTable.innerHTML += `
            <tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td><button class="btn btn-warning" onclick="editUser(${index})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteUser(${index})">Delete</button></td>
            </tr>`;
    });
}

function editUser(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    firstNameInput.value = users[index].firstName;
    lastNameInput.value = users[index].lastName;
    editIndex.value = index;
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}
