import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

async function handleSignIn() {
  const email = document.getElementById("emailField").value;
  const password = document.getElementById("passwordField").value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
    alert(`Welcome ${user.email}! Moving you to main dashboard!`);
    window.location.href = "main-dashboard.html"; // Redirecting user to main-dashboard page upon logging in.
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === "auth/invalid-credential") {
      document.getElementById("errorMessage").textContent =
        "User doesn't exist in our system. Please try again.";
    } else {
      document.getElementById("errorMessage").textContent = errorMessage;
    }
    console.error("Error signing in:", errorMessage);
  }
}
// Attach the named function to the click event of the sign-in button
document.getElementById("signInBtn").addEventListener("click", handleSignIn);

function redirectToSignUp() {
  window.location.href = "sign-up.html";
}
// Attach the named function to the click event of the create-account button
document
  .getElementById("createAccountBtn")
  .addEventListener("click", redirectToSignUp);
