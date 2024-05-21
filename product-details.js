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
<<<<<<< HEAD
  deleteDoc,
=======
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
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
<<<<<<< HEAD

onAuthStateChanged(auth, (user) => {
  if (user) {
    displayProductDetails(productId);
=======
onAuthStateChanged(auth, (user) => {
  if (user) {
    displayProductDetails();
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
  } else {
    window.location.href = "log-in.html"; // Redirect to sign-in page if not authenticated
  }
});

async function displayProductDetails(productId) {
<<<<<<< HEAD
  const productDetailsContainer = document.getElementById("product-container");
  productDetailsContainer.innerHTML = "";
  const productRef = doc(db, "products", productId);
  try {
    const docSnap = await getDoc(productRef);
    if (docSnap.exists()) {
      const product = docSnap.data();
      const productImg = Array.isArray(product.productImage)
        ? product.productImage
            .map(
              (imgUrl) =>
                `<img src="${imgUrl}" alt="Product Image" style="max-width: 100px; max-height: 100px; cursor: pointer;">`
            )
            .join("")
        : `<img src="${product.productImage}" alt="Product Image" style="max-width: 100px; max-height: 100px; cursor: pointer;">`;

      const productDetailsHtml = `
          <strong>Name:</strong> ${product.productName}<br>
          <strong>Description:</strong> ${product.productDesc}<br>
          <strong>Category:</strong> ${product.productCat}<br>
          <strong>Price:</strong> ${product.productPrice}<br>
          <strong>Images:</strong><br>${productImg}
        `;
      productDetailsContainer.innerHTML = productDetailsHtml;
    } else {
      productDetailsContainer.innerText = "No such product found.";
    }
=======
  const productDetailsContainer = document.getElementById(
    "product-details-container"
  );
  productDetailsContainer.innerHTML = "";

  const productRef = doc(db, "products", productId);
  try {
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    productDetailsContainer.innerText = "Error fetching product details.";
  }
}

displayProductDetails(productId);

<<<<<<< HEAD
async function deleteProduct(productId) {
  console.log("Deleting product with ID:", productId);
  try {
    await deleteDoc(doc(db, "products", productId));
    console.log("Product deleted successfully.");
    alert(`Product has been deleted. Moving you back to main-dashboard.`);
    window.location.href = "main-dashboard.html";
=======
async function deteleProduct(productId) {
  try {
    await deleteDoc(doc(db, "products", productId));
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
  } catch (error) {
    console.error("Error deleting product: ", error.message);
  }
}

document
  .getElementById("delete-product-btn")
<<<<<<< HEAD
  .addEventListener("click", () => deleteProduct(productId));

function redirectToUpdateProd() {
  let url = `update-product.html?id=${productId}`;
  window.location.href = url;
=======
  .addEventListener("click", deteleProduct);

function redirectToUpdateProd() {
  window.location.href = "update-product.html";
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
}
// Attach the named function to the click event of the create-account button
document
  .getElementById("update-product-btn")
  .addEventListener("click", redirectToUpdateProd);