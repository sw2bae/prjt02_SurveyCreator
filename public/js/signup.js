$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $(".inputs-form");
    const emailInput = $("#signUp-email");
    const passwordInput = $("#signUp-password");
    //post to the signup route. If successful, we are redirected to the members page
    function signUpUser(data) {
        $.post("/api/signup", data)
            .then(() => {
                window.location.replace("/");
            });
    };
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.email || !userData.password) {
            window.alert("Please Input the User Information!");
            return;
        }
        signUpUser(userData);
    });
});
