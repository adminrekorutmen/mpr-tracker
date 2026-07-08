document.addEventListener("DOMContentLoaded", function () {
  // 1. Ambil Sesi Login Pengguna
  const userData = JSON.parse(localStorage.getItem("session_rekosistem_user"));

  // Proteksi Halaman: Jika belum login, tendang balik ke login
  if (!userData) {
    window.location.href = "index.html";
    return;
  }

  const container = document.getElementById("sidebar-container");
  if (!container) return;

  // 2. Render Sidebar secara otomatis ke semua halaman
  container.innerHTML = `
    <aside class="w-72 bg-[#0B1E43] text-white flex flex-col justify-between min-h-screen sticky top-0 shadow-2xl">
      <div>
        <div class="p-8 flex items-center gap-3 border-b border-slate-700/50">
          <div class="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">R</div>
          <div>
            <h1 class="font-bold text-lg tracking-wider">REKOSISTEM</h1>
            <p class="text-[10px] text-emerald-500 tracking-widest font-semibold uppercase">Internal Portal</p>
          </div>
        </div>
        <nav class="mt-8 px-4 space-y-2">
          
          <button id="btn-dashboard" class="menu-tab w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#112E62] text-white border-l-4 border-emerald-500 shadow-md">
            <i class="fa-solid fa-chart-simple w-5 text-lg text-emerald-500"></i> Dashboard Analitik
          </button>
          
          <button id="btn-submit" class="menu-tab w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800/20">
            <i class="fa-solid fa-file-pen w-5 text-lg"></i> Submit Pengajuan
          </button>
          
          <button id="btn-tracker" class="menu-tab w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800/20">
            <i class="fa-solid fa-route w-5 text-lg"></i> Tracker & Status
          </button>
          
        </nav>
      </div>
      <div class="p-6 border-t border-slate-700/50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center font-bold">
            ${userData.nama.slice(0,2).toUpperCase()}
          </div>
          <div>
            <h4 class="font-semibold text-sm">${userData.nama}</h4>
            <p class="text-xs text-slate-400">${userData.divisi}</p>
          </div>
        </div>
        <button id="logoutBtn" class="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2 rounded-lg transition-all text-xs font-semibold">
          <i class="fa-solid fa-right-from-bracket"></i> Keluar
        </button>
      </div>
    </aside>
  `;

  // 3. LOGIKA BERPINDAH HALAMAN (SPA) TANPA REFRESH/KEDIP
  const btnDashboard = document.getElementById("btn-dashboard");
  const btnSubmit = document.getElementById("btn-submit");
  const btnTracker = document.getElementById("btn-tracker");

  const secDashboard = document.getElementById("section-dashboard");
  const secSubmit = document.getElementById("section-submit");
  const secTracker = document.getElementById("section-tracker");

  const topbarTitle = document.getElementById("topbar-title");
  const topbarSubtitle = document.getElementById("topbar-subtitle");

  function resetActiveMenu() {
    // Reset warna semua tombol menu
    [btnDashboard, btnSubmit, btnTracker].forEach(btn => {
      btn.className = "menu-tab w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800/20";
      const icon = btn.querySelector("i");
      icon.className = icon.className.replace("text-emerald-500", "");
    });
    // Sembunyikan semua konten seksi
    [secDashboard, secSubmit, secTracker].forEach(sec => sec.classList.add("hidden"));
  }

  function activateMenu(button, section, title, subtitle) {
    resetActiveMenu();
    // Beri gaya aktif ke tombol yang diklik
    button.className = "menu-tab w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#112E62] text-white border-l-4 border-emerald-500 shadow-md";
    button.querySelector("i").classList.add("text-emerald-500");
    // Munculkan seksi konten
    section.classList.remove("hidden");
    // Ubah Judul Topbar
    topbarTitle.textContent = title;
    topbarSubtitle.textContent = subtitle;
  }

  // Event Listener Klik Tab Menu
  btnDashboard.addEventListener("click", () => {
    activateMenu(btnDashboard, secDashboard, "Dashboard Analitik", "Ringkasan portal internal Rekosistem");
  });

  btnSubmit.addEventListener("click", () => {
    activateMenu(btnSubmit, secSubmit, "Submit Pengajuan Manpower", "Kirim permintaan tenaga kerja baru");
  });

  btnTracker.addEventListener("click", () => {
    activateMenu(btnTracker, secTracker, "Tracker & Status Pengajuan", "Pantau progres pemenuhan manpower Anda");
    loadTrackerData(); // Panggil fungsi memuat data rekrutmen saat halaman diklik
  });

  // Logika Keluar Aplikasi (Logout)
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("session_rekosistem_user");
    window.location.href = "index.html";
  });
});
