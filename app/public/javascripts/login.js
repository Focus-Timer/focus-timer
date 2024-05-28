function formvalid() {
    var validuser = document.getElementById("user").value;
    var validpass = document.getElementById("pass").value;

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

    return true;
}

function show() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("showing").src =
            "https://static.thenounproject.com/png/777494-200.png";
    } else {
        x.type = "password";
        document.getElementById("showing").src =
            "https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png";
    }
}

function redirectToSignup() {
    window.location.href = '/signup';
}
