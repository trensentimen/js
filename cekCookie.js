import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
const getFileName = () => {
    const pathArray = window.location.pathname.split('/');
    return pathArray[pathArray.length - 1];
}
const cekCookie = () => {
    const cookieName = "token";
    // Periksa apakah cookie ada dengan menggunakan fungsi dari file cookieUtil.js
    if (getCookie(cookieName)) {
        if (getFileName() === "login.html" || getFileName() === "register.html") {
            window.location.href = 'dashboard.html';
        }
    } else {
        if (getFileName() !== "login.html" && getFileName() !== "register.html") {
            window.location.href = 'login.html';
        }
    }
}

window.onload = cekCookie;