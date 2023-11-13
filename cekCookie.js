import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
const cookieName = "token";

// Periksa apakah cookie ada dengan menggunakan fungsi dari file cookieUtil.js
if (getCookie(cookieName)) {
    // Jika cookie tidak ada, arahkan kembali ke halaman login
    window.location.href = "dashboard.html";
} else {
    console.log("Cookie tidak ada");
}
