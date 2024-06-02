function formvalid() {
    var validuser = document.getElementById("user").value;
    var validpass = document.getElementById("pass").value;
    var confirmPass = document.getElementById("confirm-pass").value;

    // Email validation
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(validuser)) {
        document.getElementById("valid-user").innerHTML = "Invalid email address";
        return false;
    } else {
        document.getElementById("valid-user").innerHTML = "";
    }


    // Password validation
    if (validpass.length < 8) {
        document.getElementById("valid-pass").innerHTML = "Minimum 8 characters";
        return false;
    } else if (validpass.length > 128) {
        document.getElementById("valid-pass").innerHTML = "Maximum 128 characters";
        return false;
    } else if (!/[A-Z]/.test(validpass)) {
        document.getElementById("valid-pass").innerHTML = "Must contain at least one uppercase letter";
        return false;
    } else if (!/[a-z]/.test(validpass)) {
        document.getElementById("valid-pass").innerHTML = "Must contain at least one lowercase letter";
        return false;
    } else if (!/[0-9]/.test(validpass)) {
        document.getElementById("valid-pass").innerHTML = "Must contain at least one number";
        return false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(validpass)) {
        document.getElementById("valid-pass").innerHTML = "Must contain at least one special character";
        return false;
    } else {
        document.getElementById("valid-pass").innerHTML = "";
    }

    // Confirm password validation
    if (validpass !== confirmPass) {
        document.getElementById("valid-confirm-pass").innerHTML = "Passwords do not match";
        return false;
    } else {
        document.getElementById("valid-confirm-pass").innerHTML = "";
    }

    return true;
}

function show(pass) {
    var x = document.getElementById(pass);
    var img = pass === "pass" ? "showing" : "showing-confirm-pass";
    if (x.type === "password") {
        x.type = "text";
        document.getElementById(img).src =
            "https://static.thenounproject.com/png/777494-200.png";
    } else {
        x.type = "password";
        document.getElementById(img).src =
            "https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png";
    }
}


function redirectToLogin() {
    // window.location.href = '../views/login.ejs';
    window.location.href = '/login';
}