// Đăng ký
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.username === username)) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Mời đăng nhập.");
    window.location.href = "login.html";
  });
}

// Đăng nhập
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", username);
      alert("Đăng nhập thành công!");
      window.location.href = "index.html";
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  });
}

// Kiểm tra đăng nhập ở trang index.html
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/"
) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("Vui lòng đăng nhập để truy cập trang này.");
    window.location.href = "login.html";
  } else {
    // Hiển thị tên người dùng lên trang chủ
    const userDisplay = document.getElementById("usernameDisplay");
    if (userDisplay) userDisplay.textContent = loggedInUser;

    // Hiển thị nút đăng xuất
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.style.display = "inline";
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        alert("Bạn đã đăng xuất.");
        window.location.href = "login.html";
      });
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!loggedInUser) {
    // Nếu chưa đăng nhập, chuyển sang trang login
    if (
      !window.location.pathname.endsWith("login.html") &&
      !window.location.pathname.endsWith("register.html")
    ) {
      alert("Vui lòng đăng nhập để truy cập trang này.");
      window.location.href = "login.html";
    }
  } else {
    if (usernameDisplay)
      usernameDisplay.textContent = `Xin chào, ${loggedInUser}`;
    if (logoutBtn) {
      logoutBtn.style.display = "inline";
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        alert("Bạn đã đăng xuất.");
        window.location.href = "login.html";
      });
    }
  }
});
