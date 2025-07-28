const FORMSPREE_URL = "https://formspree.io/f/myzpjjvy";

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");
  const checkoutForm = document.getElementById("checkoutForm");

  container.innerHTML = "";
  summary.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p class='empty'>Giỏ hàng của bạn đang trống.</p>";
    checkoutForm.style.display = "none"; // Ẩn form nếu không có sản phẩm
    updateCartCount();
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemHTML = `
      <div class="product">
        <h3>${item.name}</h3>
        <p>Số lượng: ${item.quantity}</p>
        <p>Giá: ${item.price.toLocaleString()} đ</p>
        <p><strong>Thành tiền: ${(
          item.price * item.quantity
        ).toLocaleString()} đ</strong></p>
        <button onclick="removeItem(${index})">Xoá</button>
      </div>
    `;
    container.innerHTML += itemHTML;
    total += item.price * item.quantity;
  });

  summary.innerHTML = `<p><strong>Tổng cộng: ${total.toLocaleString()} đ</strong></p>`;
  checkoutForm.style.display = "block"; // Hiện form thanh toán
  updateCartCount();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.getElementById("cartCount");
  if (cartCountElem) {
    cartCountElem.innerText = total;
  }
}

async function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !email || !phone || !address) {
    alert("Vui lòng điền đầy đủ thông tin thanh toán.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống, không thể thanh toán.");
    return;
  }

  // Chuẩn bị nội dung đơn hàng gửi lên Formspree
  const orderDetails = cart
    .map(
      (item) =>
        `${item.name} - Số lượng: ${
          item.quantity
        } - Giá: ${item.price.toLocaleString()} đ`
    )
    .join("\n");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("order", orderDetails);

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      alert(`Cảm ơn ${name} đã đặt hàng!\nChúng tôi sẽ liên hệ lại sớm nhất.`);
      localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi gửi
      loadCart();
      // Reset form
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("address").value = "";
    } else {
      alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.");
    }
  } catch (error) {
    alert("Không thể kết nối tới máy chủ. Vui lòng thử lại.");
  }
}
