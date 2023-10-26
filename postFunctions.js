import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
// import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";
export default function PostSignUp() {
    let target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/post-login";
    let tokenkey = "token";
    let tokenvalue = "f48bd58cb3b3972d05bb9303b15ce9b83f4fcb9c871d1b05906f2fec20620ea0";
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }

    postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData);
}





function responseData(result) {

    // setInner("pesan", result.message);
    if (result.message == "Selamat Datang") {
        setCookieWithExpireHour("token", result.token, 2);
        alert("Berhasil Masuk " + result.message)
        window.location.href = "dashboard.html";
    } else {
        alert("Gagal Masuk " + "password atau username salah")
        console.log(result.message);
    }
}

function setCookieWithExpireHour(cname, cvalue, exhour) {
    const d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + "secure; HttpOnly; samesite=Strict";
    // Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; SameSite=Strict
}
