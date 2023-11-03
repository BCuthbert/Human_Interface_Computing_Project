




const checkLogin = async() => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const webAddress = "http://localhost:5000/auth?username=" + username + "&password=" + password;
    const response = await fetch(webAddress);
    const json = await response.json();

    if(json.found == true) {
        handleCorrect(username);
    } else {
        handleIncorrect(json.username);
    }
    
}

const handleCorrect = (username) => {
    var rest = username.slice(1);
    const para = document.createTextNode("You're all logged in, " + (username[0]).toUpperCase() + rest);
    if (!document.getElementById("incorrectMessage") && !document.getElementById("correctMessage")){
        const afterLogin = document.getElementById("loginform");
        const divInsert = document.createElement("div");
        divInsert.setAttribute("id", "correctMessage");
        divInsert.appendChild(para);
        afterLogin.appendChild(divInsert);
    } else {
        para.nodeValue = "You're all logged in, " + (username[0]).toUpperCase() + rest;
    }

    
}


const handleIncorrect = (username) => {
    const para = document.createTextNode("Incorrect username or password, " + username);

    if (!document.getElementById("incorrectMessage") && !document.getElementById("correctMessage")){
        const afterLogin = document.getElementById("loginform");
        const divInsert = document.createElement("div");
        divInsert.setAttribute("id", "incorrectMessage");
        divInsert.appendChild(para);
        afterLogin.appendChild(divInsert);
    } else {
        para.nodeValue = "Incorrect username or password, " + username;

    }
    

}