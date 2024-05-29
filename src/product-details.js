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
  deleteDoc,
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
const productId = urlParams.get("productId");
const userId = urlParams.get("userId");

onAuthStateChanged(auth, (user) => {
  if (user) {
    displayProductDetails(productId, user.uid); // Pass user.uid instead of user
  } else {
    window.location.href = "log-in.html";
  }
});

async function displayProductDetails(productId, userId) {
  const productDetailsContainer = document.getElementById("product-container");
  productDetailsContainer.innerHTML = "";
  const productRef = doc(db, "products", productId);
  try {
    const docSnap = await getDoc(productRef);
    if (docSnap.exists()) {
      const product = docSnap.data();
      console.log("userId:", typeof userId, userId); // Log userId type and value
      console.log("product.userId:", typeof product.userId, product.userId); // Log product.userId type and value
      if (userId === product.userId) {
        document.getElementById("delete-product-btn").style.display = "inline";
        document.getElementById("update-product-btn").style.display = "inline";
      } else {
        console.log("You do not have permission to delete this product.");
        document.getElementById("delete-product-btn").style.display = "none";
        document.getElementById("update-product-btn").style.display = "none";
      }
      if (product.productImage && product.productImage.length > 0) {
        let imagesHtml = "";
        product.productImage.forEach((imageUrl) => {
          imagesHtml += `<img src="${imageUrl}" alt="${product.productName} image" style="max-width: 100px; max-height: 100px;">`;
        });
        const productDetailsHtml = `
          <strong>Name:</strong> ${product.productName}<br>
          <strong>Description:</strong> ${product.productDesc}<br>
          <strong>Category:</strong> ${product.productCat}<br>
          <strong>Price:</strong> ${product.productPrice}<br>
          <strong>Images:</strong>${imagesHtml}<br>
          <strong>SKU:</strong> ${productId}<br>
        `;
        productDetailsContainer.innerHTML = productDetailsHtml;
      }
    }
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    productDetailsContainer.innerText = "Error fetching product details.";
  }
}

displayProductDetails(productId, userId);

async function deleteProduct(productId, userId) {
  const productRef = doc(db, "products", productId);
  const docSnap = await getDoc(productRef);

  if (docSnap.exists() && userId && userId === docSnap.data().userId) {
    console.log("Deleting product with ID:", productId);
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully.");
      alert(`Product has been deleted. Moving you back to main-dashboard.`);
      window.location.href = "main-dashboard.html";
    } catch (error) {
      console.error("Error deleting product: ", error.message);
    }
  } else {
    console.log("You do not have permission to delete this product.");
    document.getElementById("delete-product-btn").style.display = "none";
    document.getElementById("update-product-btn").style.display = "none";
  }
}

document
  .getElementById("delete-product-btn")
  .addEventListener("click", () => deleteProduct(productId, userId));

function redirectToUpdateProd() {
  let url = `update-product.html?id=${productId}`;
  window.location.href = url;
}
// Attach the named function to the click event of the create-account button
document
  .getElementById("update-product-btn")
  .addEventListener("click", redirectToUpdateProd);
