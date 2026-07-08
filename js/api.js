// ==========================================
// KONEKSI UTAMA KE DATABASE GOOGLE SHEETS
// ==========================================
// MASUKKAN URL WEB APP GOOGLE APPS SCRIPT ANDA DI SINI
const GAS_API_URL = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4bUdMYXhZbk9qd1AtcUNaMV9GMDlHMVFlRGMwblEyejB0ODNCdFlVcG5TMDRMRTZQSGhjVTB0SzVBMnNkczRVWTMvZXhlYw=="; 
const API_KEY = "S1VOQ0lfUkFIQVNJQV9SRUtPU0lTVEVNXzEyMw==";

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
