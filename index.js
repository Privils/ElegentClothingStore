const displayImages = async () => {
    const url = 'shop.json';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

const renderImages = async () => {
    const imageData = await displayImages();
    let html = '';

    if (Array.isArray(imageData) && imageData.length > 0) {
        imageData.forEach((value) => {
            let htmlSegment = `
                <div class="card col-sm-2">
                    <img src="${value.image}" alt="" class="img-fluid loco" id="img">
                    <h6 class="card-title">${value.name}</h6>
                    <p class="content-price">Price: ${value.price} ${value.currency}</p>
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
        console.log('ImageData is not an array or is empty');
    }

    let container = document.querySelector('#displayedProducts');
    if (container) {
        container.innerHTML = html;
        // Initialize event listeners for newly added buttons
        initializeAddToCartButtons();
    } else {
        console.log('Container not found');
    }
}

renderImages();


// Function for event listeners
function eventListeners() {
    // For removing contents from the cart
    const removeButtons = document.getElementsByClassName('removebtn');
    for (let i = 0; i < removeButtons.length; i++) {
        const button = removeButtons[i];
        button.addEventListener('click', removeCartContent);
    }

    // Initialize event listeners for add to cart buttons
    initializeAddToCartButtons();
}

// Initialize event listeners for add to cart buttons
function initializeAddToCartButtons() {
    const addToCartButtons = document.getElementsByClassName('button');
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addToCartContent);
    }
}

// Function to change background color of the clicked button
function addToCartContent(event) {
    const button = event.target;
  const container = button.parentElement.parentElement;
  const title = container.getElementsByClassName('card-title')[0].innerText;
  const imgSrc = container.getElementsByClassName('loco')[0].src;
  const price = container.getElementsByClassName('content-price')[0].innerText;
  console.log(title, imgSrc, price)
  addingContentToCarts(title, imgSrc, price)
}
function addingContentToCarts(title, imgSrc, price){
 let newContainer = document.createElement('div');
newContainer.classList.add('cart-row');
let cartItems = document.getElementsByClassName('cart-items')[0];
let itemName = cartItems.getElementsByClassName('name');
for (let i= 0; i < itemName.length; i++) {
    if(itemName[i].innerText === title){
        alert("You have already selected this item if you wannt more of the same item please increase its quantity in the cart section");
        return;
    }
}
const newContainerElement =  `<div class="cart-item cart-column">
<img src=${imgSrc} alt="cart image" class="cart-item-image">
<span class="name">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>

<div class="cart-quantity cart-column">
<input type="number" class="cart-quantity-input" value="1">
<button class="btn btn-danger removebtn" type="button">remove</button>
</div?
`
newContainer.innerHTML = newContainerElement
cartItems.append(newContainer);
newContainer.getElementsByClassName('removebtn')[0].addEventListener('click', removeCartContent);
newContainer.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityIncrease)
}

function quantityIncrease(event){
const input = event.target;
if (isNaN(input.value)|| input.value<= 0) {
    input.value = 1;
}
}

addToCartContent()
// Function to remove item from cart
function removeCartContent(event) {
    const button = event.target;
    if (button.parentElement && button.parentElement.parentElement) {
        button.parentElement.parentElement.remove();
    } else {
        console.warn('Remove button is not correctly nested.');
    }
}

// Ensure DOM is fully loaded before initializing event listeners
document.addEventListener("DOMContentLoaded", function() {
    eventListeners();
});
