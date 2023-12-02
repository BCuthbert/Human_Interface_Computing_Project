
const isLoggedIn = async() => {
    const webaddress = "http://localhost:5000/isLoggedIn";
    const response = await fetch(webaddress);
    const json = await response.json();
    if (json.username != null){
      return json.username;
    }else {
      return null;
    }
  }


// Checks if user exists in the database, if so, logs them in
// if not, displays error message
const checkLogin = async() => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const webAddress = "http://localhost:5000/auth?username=" + username + "&password=" + password;
    const response = await fetch(webAddress);
    const json = await response.json();

    if (json.found) {
        window.location.href = "logout.html";
    } else {
        document.getElementById("userMess1").textContent = "Incorrect username or password.";
        console.log("Here");
    }
}

// If user changes tabs to profile icon, user is taken to logout screen.
// Not to be confused with checkLogin(), which logs the user in.
const checkLoggedIn = async() => {
    const webAddress = "http://localhost:5000/isLoggedIn";
    const response = await fetch(webAddress);
    const json = await response.json();
    if (json.username != null) {
      window.location.href = "/logout.html";
    } else {
      window.location.href = "/login.html";
    }
  }


const createAcc = async() => {
    const username = document.getElementById("newUser").value;
    const password = document.getElementById("newPass").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password != confirm){
        document.getElementById("userMess").textContent = "Passwords do not match.";
        return;
    } else if(password.length < 7){
        document.getElementById("userMess").textContent = "Password must be at least 6 characters.";
        return;
    }
    const webAddress = "http://localhost:5000/new?username=" + username + "&password=" + password;
    const response = await fetch(webAddress);
    const json = await response.json();

    if (json.special == false){ // There is no special character
        document.getElementById("userMess").textContent = "Must include a special character.";
        return;
    }
    if (json.success == false){
        document.getElementById("userMess").textContent = "User already exists.";
        return;
    }
     if (json.success){
        document.getElementById("userMess").textContent = "Logged In!";
        return;
    }

    
}