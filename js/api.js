// ==========================================
// KONEKSI UTAMA KE DATABASE GOOGLE SHEETS
// ==========================================
// MASUKKAN URL WEB APP GOOGLE APPS SCRIPT ANDA DI SINI
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxmGLaxYnOjwP-qCZ1_F09G1QeDc0nQ2z0t83BtYUpnS04LE6PHhcU0tK5A2sds4UY3/exec"; 
const API_KEY = "KUNCI_RAHASIA_REKOSISTEM_123";

// Fungsi pembantu agar pengiriman data ke Google Sheets stabil dan terhindar dari error CORS
async function callGAS(payload) {
  payload.apiKey = API_KEY;
  
  const response = await fetch(GAS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain" // Ini akan mencegah error CORS preflight di browser
    },
    body: JSON.stringify(payload)
  });
  
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { status: "error", message: "Gagal membaca format data server: " + text };
  }
}
