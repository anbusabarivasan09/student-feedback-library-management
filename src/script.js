const form = document.getElementById("feedbackForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let registerNumber = document.getElementById("registerNumber").value.trim();
    let email = document.getElementById("email").value.trim();
    let department = document.getElementById("department").value;
    let year = document.getElementById("year").value;
    let rating = document.getElementById("rating").value;
    let feedback = document.getElementById("feedback").value.trim();

    let message = document.getElementById("message");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        name === "" ||
        registerNumber === "" ||
        email === "" ||
        department === "" ||
        year === "" ||
        rating === "" ||
        feedback === ""
    ) {
        message.innerHTML = "Please fill all the fields.";
        message.style.color = "red";
        return;
    }

    if (!emailPattern.test(email)) {
        message.innerHTML = "Please enter a valid email address.";
        message.style.color = "red";
        return;
    }

    if (feedback.length < 10) {
        message.innerHTML = "Feedback must contain at least 10 characters.";
        message.style.color = "red";
        return;
    }

    message.innerHTML = "Feedback submitted successfully!";
    message.style.color = "green";
});

form.addEventListener("reset", function() {
    document.getElementById("message").innerHTML = "";
});