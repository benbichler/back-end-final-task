import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
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

onAuthStateChanged(auth, (user) => {
  if (user) {
    displayProducts();
  } else {
    window.location.href = "log-in.html"; // Redirect to sign-in page if not authenticated
  }
});

async function displayProducts() {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  const productsRef = collection(db, "products");
  try {
    const querySnapshot = await getDocs(productsRef);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productDiv = document.createElement("div");
      const productImg = Array.isArray(product.productImage)
        ? product.productImage
            .map(
              (imgUrl) =>
                `<img src="${imgUrl}" alt="Product Image" style="max-width: 100px; max-height: 100px; cursor: pointer;">`
            )
            .join("")
        : `<img src="${product.productImage}" alt="Product Image" style="max-width: 100px; max-height: 100px; cursor: pointer;">`;

      productDiv.innerHTML = `<strong>Name:</strong> <a href="product-details.html?id=${doc.id}">${product.productName}</a> <br><strong>Description:</strong> ${product.productDesc}<br><strong>Category:</strong> ${product.productCat}<br><strong>Price:</strong> ${product.productPrice}<br><strong>Images:</strong><br>${productImg}`;
      productsContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    productsContainer.innerText = "Error fetching products.";
  }
}

function redirectToAddProductForm() {
  window.location.href = "add-product.html";
}
// Attach the named function to the click event of the create-account button
document
  .getElementById("add-product-btn")
  .addEventListener("click", redirectToAddProductForm);

async function addRandomProduct() {
  const requestOptions = { method: "GET", redirect: "follow" };
  try {
    const response = await fetch(
      "https://dummyjson.com/products",
      requestOptions
    );
    const responseData = await response.json();
    const products = responseData.products; // Access the 'products' array
    const randomIndex = Math.floor(Math.random() * products.length); // Randomize a number between 0-100 - used ChatGPT and with the prompt 'write a method that picks a random product from 100, do the example with 5.'
    const randomProduct = products[randomIndex]; // Choose a random cell within the 100 products array

    const productName = randomProduct.title;
    const productDesc = randomProduct.description;
    const productCat = randomProduct.category;
    const productPrice = randomProduct.price;
    const productImage = randomProduct.images;

    const productData = {
      productName,
      productDesc,
      productCat,
      productPrice,
      productImage,
    };

    await addDoc(collection(db, "products"), productData);
    alert(
      `${productName} has been randomly chosen and added to the list successfully.`
    );
    displayProducts();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

document
  .getElementById("add-random-product-btn")
  .addEventListener("click", addRandomProduct);
