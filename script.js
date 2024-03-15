const navLinks = document.getElementsByClassName("nav-links")[0];
const nav = document.getElementsByClassName("nav")[0];
const toggleNav = document.getElementsByClassName("toggle-nav")[0];
const content = document.getElementsByClassName("content")[0];
const logo = document.getElementsByClassName("logo")[0];
const icons = document.getElementsByClassName("icons")[0];
const noBackgroundImage = document.getElementsByClassName("no-background-image")[0];

const cart = document.querySelector(".cart");
const cartButton = document.querySelector(".cart-button");
const closeCartBtn = document.querySelector(".close-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartContent = document.querySelector(".cart-content")

const cartCheckout = document.getElementById("cart-checkout");
const checkoutSum = document.getElementById("checkout-sum");
const checkoutWindow = document.getElementById("checkout-window");
const closeCheckout = document.getElementById("close-checkout");

const preOrderForm = document.getElementById("pre-order-form");
const customForm = document.getElementById("custom-form");
const cakeForm = document.getElementById("cake-form");
const quesadillaForm = document.getElementById("quesadilla-form");
const selectionForm = document.getElementById("selection-form");
const conclusiveInfo = document.getElementById("conclusive-information");

const selectedForm = document.getElementById("form-type");

const menuContent = document.getElementById("menu-content");
const menuOverlay = document.getElementById("menu-overlay");
const menuSearchBar = document.getElementById("menu-search-bar");

const showcaseContent = document.querySelectorAll(".showcaseContent");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

function smoothScroll(elementName) {
  elementName.scrollIntoView({ behavior: "smooth" });
}

// Currency formatter
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Navbar related Javascript
toggleNav.addEventListener("click", () => {
  icons.classList.toggle("active");
  logo.classList.toggle("active");
  nav.classList.toggle("active");
  navLinks.classList.toggle("active");
  toggleNav.classList.toggle("active");
  content.classList.toggle("active");
  try { menuContent.classList.toggle("active"); } catch { };
  try { menuSearchBar.classList.toggle("active"); } catch { };
  
  try { noBackgroundImage.classList.toggle("hide") } catch { };
})

content.addEventListener("click", () => {
  icons.classList.remove("active");
  logo.classList.remove("active");
  nav.classList.remove("active");
  navLinks.classList.remove("active");
  toggleNav.classList.remove("active");
  content.classList.remove("active");
  try { menuContent.classList.remove("active"); } catch { };
  try { menuSearchBar.classList.remove("active"); } catch { };

  try { noBackgroundImage.classList.remove("hide") } catch { };
});

// toggleNav.addEventListener("click", () => {
//   [icons, logo, nav, navLinks, toggleNav, content, menuContent, menuSearchBar].forEach(variable => {
//     console.log(variable)
//     variable.classList.toggle("hide");
//   });

//   try {noBackgroundImage.classList.toggle("hide")} catch {};
// });

// content.addEventListener("click", () => {
//   [icons, logo, nav, navLinks, toggleNav, content, menuContent, menuSearchBar].forEach(variable => {
//     variable.classList.remove("hide");
//   });

//   try {noBackgroundImage.classList.remove("hide")} catch {};
// });

// Index.html Slide showcase
window.addEventListener('load', () => {
  setInterval(slideRight, 6000);
});

let translationPosition = 0;

if (leftArrow !== null && rightArrow !== null) {
  leftArrow.addEventListener("click", slideLeft);
  rightArrow.addEventListener("click", slideRight);
}

function slideLeft() {
  if (translationPosition == 0) return;
  translationPosition -= 100;
  slide();
}

function slideRight() {
  if (window.innerWidth <= 800) {
    if (translationPosition >= ((showcaseContent.length * 100) - 100)) {
      translationPosition = 0;
      slide()
      return
    }
  } else {
    if (translationPosition >= ((showcaseContent.length * 100) - 200)) {
      translationPosition = 0;
      slide()
      return
    }
  }

  translationPosition += 100;
  slide();
}

function slide() {
  for (let i = 0; i < showcaseContent.length; i++) {
    showcaseContent[i].style.transform = `translateX(-${translationPosition}%)`;
  }
}

// Order.html Search Bar Functionality
function filter() { // filter through snippets & hide anything that doesn't match (search bar)
  let searchFilter = document.getElementById("search-filter").value.toUpperCase();
  let menuItems = document.querySelectorAll(".menu-item");

  for (let i = 0; i < menuItems.length; i++) {
    let theElement = menuItems[i];
    let innerContent = theElement.textContent || theElement.innerText;

    if (innerContent.toUpperCase().indexOf(searchFilter) > -1) {
      theElement.classList.remove("hide");

    } else {
      theElement.classList.add("hide");
    }
  }
}
/* ------------------------- Pre-order functionality ------------------------ */

function displayForm(formType) {
  cakeForm.style.display = "none";
  quesadillaForm.style.display = "none";
  selectionForm.style.display = "none";
  customForm.style.display = "none";
  conclusiveInfo.style.display = "block";

  if (Number.isInteger(formType)) {
    selectedForm.options.selectedIndex = formType;
    formType = selectedForm.options[formType].value
  } else {
    selectedForm.options.innerHTML=formType;
    // selectedForm.options.selectedIndex = formType; // this is an alternative for if the input value is an index rather than a string
  }
  
  if (formType === "Contact Us") { conclusiveInfo.style.display = "none"; }
  if (formType === "Quesadilla") { quesadillaForm.style.display = "block"; }
  if (formType === "Custom Cake") { cakeForm.style.display = "block"; }
  if (formType === "Selection Item") { selectionForm.style.display = "block"; }
  if (formType === "Custom Input") { customForm.style.display = "block"; }

  smoothScroll(preOrderForm);
}

/* --------------------------- Order Functionality -------------------------- */

// Navbar Cart DOM
if (cart !== null) {
  cartButton.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);

  function openCart() {
    cartOverlay.style.visibility="visible";
    cart.style.transform = "translateX(0)";
    clearCart();
    fillCart();
  }
  function closeCart() {
    cartOverlay.style.visibility="hidden";
    cart.style.transform = "translateX(100%)";
  }
  cartOverlay.addEventListener("click", (ev) => {
    if (ev.target.classList[0] == "cart-overlay") {
      cartOverlay.style.visibility="hidden";
      cart.style.transform = "translateX(100%)";
    }
  });
}




// Order Page DOM // 
// if (location.pathname == "/order.html") {
    // Local Storage
    class Storage {
      getLocalStorage() {
        let items = localStorage.getItem("productData");
        return (items)
      }
      saveProduct(productData) {
        localStorage.setItem("productData", JSON.stringify(productData));
      }
    }

  
    // Products Constructor
      class Products {
        async getProductsJSON() {
          let result = await fetch("products.json");
          let productData = await result.json();
          return productData;
        } catch(error) {
          console.log(error);
        }
      }

  
  // Display Products
    class ProductDisplay {
      createProducts(productData) {
        try {
          let result = "";
          
          productData.forEach(productData => {
            result += `<span id="${productData.Token}" class="menu-item">${productData["Item Name"]}</span>`
            menuContent.innerHTML = result;
          });
        } catch (error) { console.log(error) }
      }
      createItemBtns(productData) {
        const menuItems = document.querySelectorAll(".menu-item");
    
        menuItems.forEach(menuItem => {
          menuItem.addEventListener("click", (ev) => {
            let itemId = ev.target.id
            displayItemDetails(itemId, productData);
          });
        });
      }
    }

  
  try {
    menuOverlay.addEventListener("click", (ev) => {
      if (ev.target.id == "menu-overlay") {
        menuOverlay.children[0].remove()
        menuOverlay.style.visibility = "hidden";
      }
    });
  } catch (error) { console.log(error) }


  try {
    document.addEventListener("DOMContentLoaded", () => {
      const ui = new ProductDisplay();
      const productData = new Products();
    
      // Get, Append, and Store Product Data
      productData.getProductsJSON().then(productData => {
        ui.createProducts(productData);
        ui.createItemBtns(productData);
      });
    });
  } catch (error) { console.log(error) }

  
  function displayItemDetails(itemId, productData) {
    let productIndex = productData.findIndex(item => item.Token == itemId);
    let product = productData[productIndex];
    let productPrice = formatter.format(product.Price)
  
    // overlayWrapper.innerHTML += "" // using the "+=" operator to removes the eventlisteners because the entire tag is reparsed, therefore being lost in the process
  
    menuOverlay.style.visibility = "visible";
    menuOverlay.insertAdjacentHTML("beforeend", `
      <div class="item-display">
        <div>
        <h2><i class="fa fa-window-close-o close-item-display"></i></h2>
        </div>
    
        <div class="item-details" item-id=${product.Token}>
            <p><h1>${product["Item Name"]}</h1></p>
            <p>Variation Name: ${product["Variation Name"]}</p>
            <p>Description: ${product.Description}</p>
            <p>Price: ${productPrice}</p>
        </div>
    
        <div class="display-footer">
            <div class="item-button">
                <i class="fa fa-chevron-left"></i>
                <span class="item-amount"> 1 </span>
                <i class="fa fa-chevron-right"></i>
            </div>
            <div class="add-to-cart item-button">
                <span>Add To Cart</span>
            </div>
        </div>
      </div>`);
  
    createPopupBtns(itemId, productData)
  }
  
  function getItemAmount() {
    let itemAmountHTML = document.querySelector(".item-amount");
    let itemAmountStr = itemAmountHTML.innerHTML;
    let itemAmount = parseInt(itemAmountStr);
  
    return itemAmount
  }
  
  function itemSubtraction() {
    let currentItemAmount = getItemAmount()
    if (currentItemAmount <= 1) return;
  
    let newItemAmount = currentItemAmount - 1;
    document.querySelector(".item-amount").innerHTML = newItemAmount;
    return newItemAmount
  }
  
  function itemAddition() {
    let currentItemAmount = getItemAmount()
    if (currentItemAmount >= 99) return;
  
    let newItemAmount = currentItemAmount + 1;
    document.querySelector(".item-amount").innerHTML = newItemAmount;
    return newItemAmount
  }
  
  function createPopupBtns(itemId, productData) {
    const closeButton = document.querySelector(".close-item-display");
    const subtractOperatorBtn = document.querySelector(".fa.fa-chevron-left");
    const addOperatorBtn = document.querySelector(".fa.fa-chevron-right");
    const addToCartBtn = document.querySelector(".add-to-cart");
  
    subtractOperatorBtn.addEventListener("click", itemSubtraction);
    addOperatorBtn.addEventListener("click", itemAddition);
  
    function inspectCurrentCart(myCart, storageArray) {
      let inspectionBoolean = storageArray.some(obj => Object.values(obj).includes(itemId));
  
      if (inspectionBoolean == true) {
        let storageIndex = storageArray.findIndex(item => item.Token == itemId);
        let storageItemAmount = storageArray[storageIndex].Amount
        return [storageIndex, storageItemAmount];
      }
    }
  
    closeButton.addEventListener("click", closeItemPopup);
  
    function closeItemPopup() {
      closeButton.parentElement.parentElement.parentElement.remove();
      menuOverlay.style.visibility = "hidden";
    }
  
    // adding the item(s) into the current storage array
    addToCartBtn.addEventListener("click", () => {

      let productIndex = productData.findIndex(item => item.Token == itemId);
      let myCart = new Storage();
      let storageArray = JSON.parse(myCart.getLocalStorage());
      let itemAmount = getItemAmount()
      let inspectionResults, storageIndex, storageItemAmount, amountObj, productObj;
  
      if (storageArray !== null) {
        storageItemsMatch = inspectCurrentCart(myCart, storageArray);
  
        if (storageItemsMatch !== undefined) {
          // if the item being added is already in local storage this code will add to it
          storageIndex = storageItemsMatch[0];
          storageItemAmount = storageItemsMatch[1];
          storageArray[storageIndex].Amount = storageItemAmount + itemAmount;
  
          myCart.saveProduct(storageArray);
          transitionToCart()
          return
        }
  
      } else {
        storageArray = []; // storageArray = new Array() // Alternative
      }
  
      amountObj = { Amount: itemAmount };
      productObj = productData[productIndex];
      productObj = Object.assign(productObj, amountObj);
      storageArray.push(productObj);
  
      myCart.saveProduct(storageArray);
      transitionToCart()
    });
  
    function transitionToCart() {
      closeItemPopup();
      openCart();
      clearCart(); // We want to empty any cart items that may be currently being displayed to the user
      fillCart(); // Store the items in a cart for the user to access
    }
  }
// }






// newCartObj = Object.assign(...cartArray, amountObj); // in this case the spread operator is used to make cartArray into an object {} and then assign the Amount key:value pair to it.
// localStorage.removeItem("productData")
function removeItem(ev) {
  let productData = JSON.parse(localStorage.getItem("productData"));
  let itemIndex = ev.parentElement.parentElement.id;

  productData.splice(itemIndex, 1);
  localStorage.setItem("productData", JSON.stringify(productData));
  clearCart();
  fillCart();
}

function subtractItem(ev) {
  let productData = JSON.parse(localStorage.getItem("productData"));
  let itemIndex = ev.parentElement.parentElement.id;
  let itemAmount = productData[itemIndex].Amount;

  if(itemAmount <= 1) return;

  productData[itemIndex].Amount = itemAmount - 1;
  localStorage.setItem("productData", JSON.stringify(productData));

  clearCart();
  fillCart()
}

function addItem(ev) {
  let productData = JSON.parse(localStorage.getItem("productData"));
  let itemIndex = ev.parentElement.parentElement.id;
  let itemAmount = productData[itemIndex].Amount;

  if (itemAmount >= 99) return;

  productData[itemIndex].Amount = itemAmount + 1;
  localStorage.setItem("productData", JSON.stringify(productData));

  clearCart();
  fillCart()
}

function clearCart() {
  cartContent.replaceChildren();
}

// Store the items in a cart for the user to access
function fillCart() {
  let cartItems = JSON.parse(localStorage.getItem("productData"));
  let itemIndex = 0;
  let overallPrice = 0;

  cartItems.forEach(() => {
    let item = cartItems[itemIndex];

    let itemAmount = item.Amount;
    let itemName = item["Item Name"];
    let itemPrice = item.Price;

    let itemVariation = item["Variation Name"]

    cartContent.insertAdjacentHTML("beforeend", `
      <div  id="${itemIndex}" class="cart-item">
        <img src="imageContent/coming-soon-image.jpg" alt="Product">
        <div>
          <h4>${itemName}</h4>
          <h5>${formatter.format(itemPrice)}</h5>
          <span class="remove-item" onclick="removeItem(this)">Remove</span>
        </div>
        <div>
          <i class="fa fa-chevron-up" onclick="addItem(this)"></i>
          <p class="cart-item-amount"> ${itemAmount} </p>
          <i class="fa fa-chevron-down" onclick="subtractItem(this)"></i>
        </div>
      </div>`);

      itemIndex += 1;
      overallPrice += (itemPrice * itemAmount);
  });

  checkoutSum.innerHTML = " " + formatter.format(overallPrice);
  cartCheckout.style.display="block";
}

cartCheckout.addEventListener("click", () => {
  closeCart();
  checkoutWindow.classList.toggle("hidden");
})
closeCheckout.addEventListener("click", () => {
  checkoutWindow.classList.toggle("hidden");
})


// Add a message for when the cart is empty & remove the checkout button
let observer = new MutationObserver((callback) => {
  if (cartContent.childElementCount == 0) {
    cartContent.insertAdjacentHTML("beforeend", `
      <div class="cart-item">
        <div style="padding-left: 52px;">
          <h2 style="padding: 12px 0px 36px 0px;"> Ah! It looks like your cart is empty!</h2>
        </div>
      </div>`);

    cartCheckout.style.display="none";
  }
});

observer.observe(cartContent, {childList: true, subtree: true});

/* --------------------------- Order Functionality -------------------------- */

// Location.html Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 41.619470, lng: -70.923340 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: (18),
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
    // label: {color: 'orange', fontWeight: 'bold', fontSize: '14px', text: "Eli's"},
  });
}