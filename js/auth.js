const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  errorMessage.classList.add("hidden");

  try {
    const res = await callGAS({
      action: "login",
      email: email
    });

    if (res.status === "success") {
      // Simpan data sesi login di browser
      localStorage.setItem("session_rekosistem_user", JSON.stringify(res.user));
      window.location.href = "dashboard.html";
    } else {
      errorMessage.querySelector("span").textContent = "Email salah atau tidak terdaftar.";
      errorMessage.classList.remove("hidden");
    }
  } catch (error) {
    errorMessage.querySelector("span").textContent = "Gagal memverifikasi. Periksa kembali URL API Anda.";
    errorMessage.classList.remove("hidden");
  }
});