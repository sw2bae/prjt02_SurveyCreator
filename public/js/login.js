$(document).ready(function () {
    // Getting references to our form and inputs
    const logInForm = $(".inputs-form");
    const emailInput = $("#login-email");
    const passwordInput = $("#login-password");
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(data) {
        $.post("/api/login", data)
            .then(() => {
                window.location.replace("/surveys");
            });
    };
    // When the form is submitted, we validate there's an email and password entered
    logInForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.email || !userData.password) {
            window.alert("Please Input the User Information!")
            return;
        };
        loginUser(userData);
    });
});
