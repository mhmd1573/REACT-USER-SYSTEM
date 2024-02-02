

export const emailExists = (email, currentIndex, users) => {
    if (!users || !Array.isArray(users)) {
        return false; // Users array is not defined or not an array
    }


    for (var i = 0; i < users.length; i++) {
        // Skip the current user when checking for email existence during an update
        if (i === parseInt(currentIndex)) {
            continue;
        }

        if (users[i].email === email) {
            return true;
        }
    }
    return false;
};

export const isEmailUnique = (email, currentIndex,users) => {
    return users.every(function (user, index) {
        return index === currentIndex || user.email.toLowerCase() !== email.toLowerCase();
    });
};

 export const isValidEmail = (email) => {

        // Regular expression for a simple email format validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
};


export const getUsersFromLocalStorage = () => {
    try {
        // Retrieve the usersString from local storage
        var usersString = localStorage.getItem("users");
        // Check if the usersString is undefined or not a valid JSON string
        if (usersString == null  || usersString.trim() === '' || usersString === 'undefined') {
            return [];
        }

        // Attempt to parse the JSON string
        var users = usersString ? JSON.parse(usersString) : null;

        // Check if the parsed value is an array
        if (Array.isArray(users)) {
            return users;
        } else {
            return [];
        }
    } catch (error) {
        // Handle parsing errors, return an empty array
        return [];
    }
};


export const saveUsersToLocalStorage = (users) => {

    try {
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
    }

};


export const togglePassForm = () => {
    var passContainer = document.getElementById("forgetPassForm");
    var overlay = document.querySelector(".overlay");

    if (passContainer.style.display === "none") {
        passContainer.style.display = "block";
        overlay.style.display = "block";
    } else {
        passContainer.style.display = "none";
        overlay.style.display = "none";
        
    }


};

export const cancelAction = () => {
  
   togglePassForm();
    

};

export const toggleCardForm = () => {
    var formContainer = document.getElementById("userFormCart");
    var overlay = document.querySelector(".overlay");

    if (formContainer.style.display === "none") {
        formContainer.style.display = "block";
        overlay.style.display = "block";
    } else {
        formContainer.style.display = "none";
        overlay.style.display = "none";
      
    }

};