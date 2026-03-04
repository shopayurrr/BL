
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form submission

    const email = document.getElementById("exampleInputEmail1").value.trim();
    const password = document.getElementById("exampleInputPassword1").value.trim();

    if (!email || !password) {
        alert("Both username and password are required.");
        return;
    }

    // If both fields are valid, open modal
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
});

// Redirect on Proceed button click if checkbox is checked
document.getElementById("proceedBtn").addEventListener("click", function () {
    const accepted = document.getElementById("modalAcceptCheck").checked;
    const warning = document.getElementById("acceptWarning");

    if (!accepted) {
        warning.style.display = "block";
        return;
    }

    window.location.href = "profile.html";
});


// Function to determine the greeting
function getGreetingBasedOnTime() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
}

// Set the greeting on page load
document.getElementById("greetingText").textContent = getGreetingBasedOnTime();


// show login time

window.addEventListener("DOMContentLoaded", () => {
  const loginTime = sessionStorage.getItem("loginTime") || "Not available";
    const userIp = sessionStorage.getItem("userIp") || "Not available";

    const detailsDiv = document.querySelector(".clnt-details");
    if (detailsDiv) {
        detailsDiv.innerHTML = `
      <strong>Login time:</strong> ${loginTime}<br>
      <strong>Your IP Address:</strong> ${userIp}
    `;
  }
});


// Attach this to modal Proceed button on login page
const proceedButton = document.querySelector(".proceeed-butoon");
if (proceedButton) {
    proceedButton.addEventListener("click", () => {
        const checkbox = document.getElementById("modalAcceptCheck");
        const warning = document.getElementById("acceptWarning");

        if (!checkbox.checked) {
            warning.style.display = "block";
            return; // Stop here if checkbox is not checked
        } else {
            warning.style.display = "none";
        }

        const loginTime = new Date().toLocaleString();
        sessionStorage.setItem("loginTime", loginTime);

        fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem("userIp", data.ip);
                window.location.href = "profile.html";
            })
            .catch(() => {
                sessionStorage.setItem("userIp", "Unable to fetch IP");
                window.location.href = "profile.html";
            });
    });
}



// date time and ip on sign off page

// const signOffLink = document.getElementById("signOffLink");
// if (signOffLink) {
//     signOffLink.addEventListener("click", () => {
//         const signOffTime = new Date().toLocaleString();
//         sessionStorage.setItem("signOffTime", signOffTime);
//         window.location.href = "signout.html";
//     });
// }

window.addEventListener("DOMContentLoaded", () => {
    const signOffTime = sessionStorage.getItem("signOffTime") || "Not available";
    const userIp = sessionStorage.getItem("userIp") || "Not available";

    const detailsDiv = document.querySelector(".clnt-details");
    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <strong>Sign off time:</strong> ${signOffTime}<br>
            <strong>Your IP Address:</strong> ${userIp}
        `;
    }
});
