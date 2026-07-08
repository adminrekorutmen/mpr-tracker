document.addEventListener("DOMContentLoaded", function () {
  // 1. Ambil Sesi Login Pengguna
  const userData = JSON.parse(localStorage.getItem("session_rekosistem_user"));

  // 2. Dapatkan path saat ini (Wajib didefinisikan di awal!)
  const currentPath = window.location.pathname;

  // 3. Deteksi Halaman Login
  const isLoginPage = currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "";

  // 4. Proteksi Halaman: Jika belum login, tendang balik ke halaman login
  if (!userData && !isLoginPage && !currentPath.includes("approval.html")) {
    window.location.href = "index.html";
    return;
  }

  const container = document.getElementById("sidebar-container");
  if (!container) return;

  // 5. Render Sidebar secara otomatis ke semua halaman
  container.innerHTML = `
    <aside class="w-72 bg-[#0B1E43] text-white flex flex-col justify-between min-h-screen sticky top-0">
      <div>
        <div class="p-8 flex items-center gap-3 border-b border-slate-700/50">
          <div class="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">R</div>
          <div>
            <h1 class="font-bold text-lg tracking-wider">REKOSISTEM</h1>
            <p class="text-[10px] text-emerald-500 tracking-widest font-semibold uppercase">Internal Portal</p>
          </div>
        </div>
        <nav class="mt-8 px-4 space-y-2">
          <a href="dashboard.html" class="menu-item flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentPath.includes('dashboard') ? 'bg-[#112E62] text-white border-l-4 border-emerald-500 shadow-lg' : 'text-slate-400 hover:text-white'}">
            <i class="fa-solid fa-chart-simple w-5 text-lg"></i> Dashboard Analitik
          </a>
          <a href="submit-mpr.html" class="menu-item flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentPath.includes('submit') ? 'bg-[#112E62] text-white border-l-4 border-emerald-500 shadow-lg' : 'text-slate-400 hover:text-white'}">
            <i class="fa-solid fa-file-pen w-5 text-lg"></i> Submit Pengajuan
          </a>
          <a href="tracker.html" class="menu-item flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentPath.includes('tracker') ? 'bg-[#112E62] text-white border-l-4 border-emerald-500 shadow-lg' : 'text-slate-400 hover:text-white'}">
            <i class="fa-solid fa-route w-5 text-lg"></i> Tracker & Status
          </a>
        </nav>
      </div>
      <div class="p-6 border-t border-slate-700/50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center font-bold">
            ${userData ? userData.nama.slice(0,2).toUpperCase() : 'US'}
          </div>
          <div>
            <h4 class="font-semibold text-sm">${userData ? userData.nama : 'User'}</h4>
            <p class="text-xs text-slate-400">${userData ? userData.divisi : 'Division'}</p>
          </div>
        </div>
        <button id="logoutBtn" class="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2 rounded-lg transition-all text-xs font-semibold">
          <i class="fa-solid fa-right-from-bracket"></i> Keluar
        </button>
      </div>
    </aside>
  `;

  // Logika Keluar Aplikasi (Logout)
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("session_rekosistem_user");
    window.location.href = "index.html";
  });
});
