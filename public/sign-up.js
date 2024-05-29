import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDy7TY2Em_UnNabdaT9ZG_O7EXBeo-N0OE",
  authDomain: "myfirstproject-2c117.firebaseapp.com",
  projectId: "myfirstproject-2c117",
  storageBucket: "myfirstproject-2c117.appspot.com",
  messagingSenderId: "168639021537",
  appId: "1:168639021537:web:938d1f7d41d174360912a0",
  measurementId: "G-RJXXNSWYK0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function registerUser() {
  const email = document.getElementById("emailField").value;
  const password = document.getElementById("passwordField").value;
  const passwordRepeat = document.getElementById("passwordFieldCheck").value;
  if (password !== passwordRepeat) {
    document.getElementById("errorContainer").textContent =
      "Passwords do not match.";
    alert(`Dear ${email}, your passwords do not match.`);
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created:", userCredential.user);
    alert("Account created successfully!");
    window.location.href = "main-dashboard.html"; // Redirect to main dashboard page on succesful sign up
  } catch (error) {
    console.error("Error signing up:", error.message);
    document.getElementById("errorContainer").textContent = error.message;
  }
}
// Attach the registerUser function to the click event of the sign-up button
document.getElementById("signUpBtn").addEventListener("click", registerUser);
