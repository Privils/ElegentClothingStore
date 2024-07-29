const displayImages = async () => {
  const url = "shop.json";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const renderImages = async () => {
  const imageData = await displayImages();
  let html = "";

  if (Array.isArray(imageData) && imageData.length > 0) {
    imageData.forEach((value) => {
      let htmlSegment = `
                <div class="card col-sm-2 carddiv">
                    <img src="${value.image}" alt="" class="img-fluid loco" id="img">
                    <h6 class="card-title">${value.name}</h6>
                    <p class="content-price">${value.price}  ${value.currency}</p>
                    <div class="btncontainer">
                         <button class="btn button" type="button">add to cart</button>
                    </div>
                    <div class="star-rating">
                        <span class="star" data-value="5">&#9733;</span>
                        <span class="star" data-value="4">&#9733;</span>
                        <span class="star" data-value="3">&#9733;</span>
                        <span class="star" data-value="2">&#9733;</span>
                        <span class="star" data-value="1">&#9733;</span>
                    </div>
                </div>
            `;
      html += htmlSegment;
    });
  } else {
    console.log("ImageData is not an array or is empty");
  }

  let container = document.querySelector("#displayedProducts");
  if (container) {
    container.innerHTML = html;
    initializeAddToCartButtons();
  } else {
    console.log("Container not found");
  }
};

renderImages();

// Function for event listeners
function eventListeners() {
  // For removing contents from the cart
  const removeButtons = document.getElementsByClassName("removebtn");
  for (let i = 0; i < removeButtons.length; i++) {
    const button = removeButtons[i];
    button.addEventListener("click", removeCartContent);
  }
  initializeAddToCartButtons();
}
function initializeAddToCartButtons() {
  const addToCartButtons = document.getElementsByClassName("button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addToCartContent);
  }
}

function addToCartContent(event) {
  const button = event.target;
  const container = button.parentElement.parentElement;
  const title = container.getElementsByClassName("card-title")[0].innerText;
  const imgSrc = container.getElementsByClassName("loco")[0].src;
  const price = container.getElementsByClassName("content-price")[0].innerText;
  console.log(title, imgSrc, price);
  addingContentToCarts(title, imgSrc, price);
}

function addingContentToCarts(title, imgSrc, price) {
  let newContainer = document.createElement("div");
  newContainer.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let itemName = cartItems.getElementsByClassName("name");
  for (let i = 0; i < itemName.length; i++) {
    if (itemName[i].innerText === title) {
      alert(
        "You have already selected this item if you want more of the same item please increase its quantity in the cart section"
      );
      return;
    }
  }
  const newContainerElement = `
        <div class="cart-item cart-column">
            <img src=${imgSrc} alt="cart image" class="cart-item-image">
            <span class="name">${title}</span>
        </div>
        <span class="cart-price cart-column cart-item-price">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" class="cart-quantity-input" value="1">
            <button class="btn btn-danger removebtn" type="button">remove</button>
        </div>
    `;
  newContainer.innerHTML = newContainerElement;
  cartItems.append(newContainer);
  newContainer
    .getElementsByClassName("removebtn")[0]
    .addEventListener("click", removeCartContent);
  newContainer
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityIncrease);
  increaseCartQuantity();
  increaseTrolly();
}

function quantityIncrease(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  increaseCartQuantity();
}

function increaseCartQuantity() {
  const cartItemContainer = document.getElementsByClassName("cart-items")[0];
  if (!cartItemContainer) {
    console.error("Cart item container not found");
    return;
  }

  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let cartPrice = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const cartPriceElement =
      cartRow.getElementsByClassName("cart-item-price")[0];
    const cartInput = cartRow.getElementsByClassName("cart-quantity-input")[0];
    console.log(cartPriceElement);
    if (!cartPriceElement || !cartInput) {
      console.error("Cart row elements not found");
      continue; 
    }
    const price = parseFloat(
      cartPriceElement.innerText.replace("R", "").trim()
    );
    if (isNaN(price)) {
      console.error("Invalid price value");
      continue; 
    }
    const quantity = parseInt(cartInput.value, 10);
    if (isNaN(quantity)) {
      console.error("Invalid quantity value");
      continue;
    }

    cartPrice += price * quantity;
  }
  const total = Math.round(cartPrice * 100) / 100;
  const cartTotalPriceElement =
    document.getElementsByClassName("cart-total-price")[0];
  if (cartTotalPriceElement) {
    cartTotalPriceElement.innerText = "R" + total.toFixed(2);
  } else {
    console.error("Cart total price element not found");
  }
}

//function to update the trolly
const trollyUpdate = document.querySelector(".fa-cart-shopping");
console.log(trollyUpdate);
let count = 0;
function increaseTrolly() {
  count += 1;
  trollyUpdate.innerText = count;
  if (count > 0) {
    trollyUpdate.style.color = "orange";
  }
}
// Function to remove item from cart
function removeCartContent(event) {
  const button = event.target;
  if (button.parentElement && button.parentElement.parentElement) {
    button.parentElement.parentElement.remove();
  } else {
    console.warn("Remove button is not correctly nested.");
  }
}

//function for star rating
function starRating() {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      stars.forEach((s) => {
        stars.classList.remove("selected");
        console.log("Removed selected from:", s);
      });
      star.classList.add("selected");
      console.log("Added selected to:", star);
      let previousSibling = star.previousElementSibling;
      while (previousSibling) {
        previousSibling.classList.add("selected");
        console.log("Added selected to previous sibling:", previousSibling);
        previousSibling = previousSibling.previousElementSibling;
      }
    });
  });
}

starRating();

//for purchase button
function thankUser() {
  const purchaseBtn = document.querySelector(".btn-purchase");

  purchaseBtn.addEventListener("click", () => {
    alert("Thank You For Ordering From Our Store. We Hope To See You Again.");
  });
}
thankUser();

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
