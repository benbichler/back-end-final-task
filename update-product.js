import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
<<<<<<< HEAD
  getDoc,
  query,
  where,
  doc,
=======
  query,
  where,
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
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
<<<<<<< HEAD
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
=======
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in", user);
  } else {
    window.location.href = "log-in.html"; // Redirect to sign-in page if not authenticated
  }
});

<<<<<<< HEAD
async function fetchProductDetails() {
  const productRef = doc(db, "products", productId);
  try {
    const docSnap = await getDoc(productRef);
    if (docSnap.exists()) {
      const product = docSnap.data();
      console.log(product);
      document.getElementById("productName").placeholder = product.productName;
      document.getElementById("productDesc").placeholder = product.productDesc;
      document.getElementById("productCat").placeholder = product.productCat;
      document.getElementById("productPrice").placeholder =
        product.productPrice;
      document.getElementById("productImage").placeholder =
        product.productImage;
    }
  } catch (error) {
    console.log("ERROR ", error.message);
  }
}

fetchProductDetails();

=======
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
async function updateProduct() {
  const productName = document.getElementById("productName").value;
  const productDesc = document.getElementById("productDesc").value;
  const productCat = document.getElementById("productCat").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImage = document.getElementById("productImage").value;

  if (
    productName == "" ||
    productDesc == "" ||
    productCat == "" ||
    productPrice == "" ||
    productImage == ""
  ) {
    alert("One of the fields is missing, please fill it again.");
    return;
  } else {
    const productData = {
      productName,
      productDesc,
      productCat,
      productPrice,
      productImage,
    };
    console.log(productDesc);
    console.log(productCat);
    try {
<<<<<<< HEAD
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, productData);
=======
      await updateDoc(collection(db, "products"), productData);
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
      alert(
        `${productName} has been updated successfully. Moving you to main-dashboard page.`
      );
      window.location.href = "main-dashboard.html";
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
    document.getElementById("productName").value = "";
    document.getElementById("productDesc").value = "";
    document.getElementById("productCat").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";
  }
<<<<<<< HEAD
}
document.getElementById("updateProd").addEventListener("click", updateProduct);
=======
  document
    .getElementById("updateProd")
    .addEventListener("click", updateProduct);
}
>>>>>>> c34bcf1c9e09fe03c4c927c4e8bb4e7098677fc9
