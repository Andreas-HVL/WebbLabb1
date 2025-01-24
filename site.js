import menu from "./menu.js"

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function populateMenu() {
    const menuContainer = document.getElementById("menuContainer");
    if (!menuContainer) {
        console.error("Menu container not found");
        return;
    }

    menu.forEach((item) => {
        const menuItemDiv = document.createElement("div");
        menuItemDiv.classList.add("menu-item");

        menuItemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="menu-item-img" />
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="menu-item-price">${item.price}:- SEK</p>
            <button class="add-to-cart-btn">Add to Cart</button>`;

        menuItemDiv.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            addToCart(item);
        });

        menuContainer.appendChild(menuItemDiv);
    });

}

function addToCart(item) {
    cart.push(item);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<li class="list-group-item text-center">Your cart is empty</li>`;
        cartTotalElement.textContent = "0.00";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement("li");
        cartItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price}:- </span>
        <button class="btn btn-danger btn-sm remove-from-cart-btn" data-index="${index}">Remove</button>`;

        cartItem.querySelector(".remove-from-cart-btn").addEventListener("click", (e) => {
            const itemIndex = parseInt(e.target.dataset.index, 10);
            removeFromCart(itemIndex);
        });

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = total.toFixed(2);
}


function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


document.addEventListener("DOMContentLoaded", () => {
    populateMenu();
    updateCartUI();
});