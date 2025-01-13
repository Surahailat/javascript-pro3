// Get references to elements
const editButton = document.getElementById("editButton");
const inputs = document.querySelectorAll("input, select");
const profileImageInput = document.getElementById("profileImageInput");
const userImage = document.getElementById("userImage");
let isEditing = false;

// On page load, populate profile data if a user is logged in
window.addEventListener("load", () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        // Update profile information display
        document.getElementById("userFullName").textContent = `${loggedInUser.fname} ${loggedInUser.lname}`;
        document.getElementById("userEmail").textContent = loggedInUser.email;
        userImage.src = loggedInUser.profileImage || "../Images/img/user (1).png";

        // Pre-fill form inputs for editing
        document.getElementById("firstName").value = loggedInUser.fname;
        document.getElementById("lastName").value = loggedInUser.lname;
        document.getElementById("email").value = loggedInUser.email;
        document.getElementById("gender").value = loggedInUser.gender || "";
        document.getElementById("birthday").value = loggedInUser.birthday || "";  // Updated field name
    } else {
        alert("No logged-in user found. Redirecting to login page...");
        window.location.href = "login.html"; // Redirect if no user is logged in
    }
});

// Event listener for edit/save button
editButton.addEventListener("click", () => {
    toggleEditing();
});

// Event listener for profile image upload
profileImageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (!file) {
        alert("No file selected. Please select an image.");
        return;
    }

    // Check if the selected file is an image
    if (!file.type.startsWith("image/")) {
        alert("Invalid file type. Please select an image.");
        return;
    }

    // Use FileReader to display the uploaded image
    const reader = new FileReader();
    reader.onload = function () {
        userImage.src = reader.result; // Set the profile image source to the uploaded image
    };
    reader.readAsDataURL(file);
});

// Toggle editing mode
function toggleEditing() {
    isEditing = !isEditing; // Toggle the editing state
    inputs.forEach(input => {
        input.disabled = !isEditing; // Enable or disable input fields
    });

    // Update button text
    editButton.textContent = isEditing ? "Save" : "Edit";

    if (!isEditing) {
        saveUpdatedData(); // Save changes when "Save" is clicked
        alert("Profile updated successfully!");
    }
}

// Save updated profile data to sessionStorage and localStorage
function saveUpdatedData() {
    const updatedUser = {
        ...JSON.parse(sessionStorage.getItem("loggedInUser")),
        fname: document.getElementById("firstName").value,
        lname: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        gender: document.getElementById("gender").value,
        birthday: document.getElementById("birthday").value,  // Updated field name
        profileImage: userImage.src,
    };

    // Update sessionStorage
    sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Update localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.email === updatedUser.email);

    if (userIndex !== -1) {
        users[userIndex] = updatedUser; // Update user in localStorage
    }
    localStorage.setItem("users", JSON.stringify(users));

    // Update profile information display
    document.getElementById("userFullName").textContent = `${updatedUser.fname} ${updatedUser.lname}`;
    document.getElementById("userEmail").textContent = updatedUser.email;
}
