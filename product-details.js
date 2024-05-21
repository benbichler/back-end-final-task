import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDy7TY2Em_UnNabdaT9ZG_O7EXBeo-N0OE",
  authDomain: "myfirstproject-2c117.firebaseapp.com",
  projectId: "myfirstproject-2c117",
  storageBucket: "myfirstproject-2c117.appspot.com",
  messagingSenderId: "168639021537",
  appId: "1:168639021537:web:938d1f7d41d174360912a0",
  measurementId: "G-RJXXNSWYK0",
};

const app = initializeApp(firebaseConfig); // Reuse the same config as above
const auth = getAuth(app);
const db = getFirestore(app);
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
onAuthStateChanged(auth, (user) => {
  if (user) {
    displayProductDetails();
  } else {
    window.location.href = "log-in.html"; // Redirect to sign-in page if not authenticated
  }
});

async function displayProductDetails(productId) {
  const productDetailsContainer = document.getElementById(
    "product-details-container"
  );
  productDetailsContainer.innerHTML = "";

  const productRef = doc(db, "products", productId);
  try {
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    productDetailsContainer.innerText = "Error fetching product details.";
  }
}

displayProductDetails(productId);

async function deteleProduct(productId) {
  try {
    await deleteDoc(doc(db, "products", productId));
  } catch (error) {
    console.error("Error deleting product: ", error.message);
  }
}

document
  .getElementById("delete-product-btn")
  .addEventListener("click", deteleProduct);

function redirectToUpdateProd() {
  window.location.href = "update-product.html";
}
// Attach the named function to the click event of the create-account button
document
  .getElementById("update-product-btn")
  .addEventListener("click", redirectToUpdateProd);
