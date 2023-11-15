import { deleteCookie as deleteCookieUtil } from "./utilities/cookie.js";

const logout = () => {
    let konfirmasi = confirm('anda yakin akan logout?')
    if (konfirmasi) {
      deleteCookieUtil("token");
      window.location.href = "login.html";
      // document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

  }

window.logout = logout;