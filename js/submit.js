document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("session_rekosistem_user"));
  const divisiInput = document.getElementById("divisiInput");
  const form = document.getElementById("mprForm");

  // Isi otomatis divisi sesuai user yang sedang login
  if (userData && divisiInput) {
    divisiInput.value = userData.divisi;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.innerHTML = "Mengirim...";

    const payload = {
      action: "submitPengajuan",
      namaPengaju: userData.nama,
      emailPengaju: userData.email,
      divisi: userData.divisi,
      jabatan: document.getElementById("jabatanInput").value,
      jenisTenagaKerja: document.getElementById("jenisInput").value,
      tanggalDibutuhkan: document.getElementById("tanggalInput").value,
      jumlahManpower: parseInt(document.getElementById("jumlahInput").value),
      lokasiPenempatan: document.getElementById("lokasiInput").value,
      deskripsiPekerjaan: document.getElementById("alasanInput").value,
      kualifikasi: document.getElementById("kualifikasiInput").value,
      emailDirektur: "director@rekosistem.com" // Gantilah dengan email asli Direktur Rekosistem
    };

    try {
      const res = await callGAS(payload);
      if (res.status === "success") {
        alert("Sukses! Pengajuan berhasil disimpan. ID Anda: " + res.id);
        form.reset();
        divisiInput.value = userData.divisi; // kembalikan nilai divisi
      } else {
        alert("Error: " + res.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi internet.");
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<span>Kirim Pengajuan</span><i class="fa-solid fa-paper-plane text-xs"></i>`;
    }
  });
});