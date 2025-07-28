function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.name === name);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " đã được thêm vào giỏ hàng!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.getElementById("cartCount");
  if (cartCountElem) {
    cartCountElem.innerText = total;
  }
}

window.onload = function () {
  updateCartCount();

  const products = [
    { name: "Iphone 11", price: 7000000 },
    { name: "Oppo A56 5G", price: 2650000 },
    { name: "Xiaomi 14", price: 5000000 },
  ];

  const buttons = document.querySelectorAll(".product button");
  buttons.forEach((btn, idx) => {
    btn.onclick = () => {
      const product = products[idx];
      addToCart(product.name, product.price);
    };
  });
};
