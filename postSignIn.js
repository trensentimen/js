import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";

const PostSignIn = () => {
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/post-login";
    const tokenkey = "token";
    const tokenvalue = "f48bd58cb3b3972d05bb9303b15ce9b83f4fcb9c871d1b05906f2fec20620ea0";
    const datainjson = {
        username: getValue("username"),
        password: getValue("password")
    };

    postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData);
};

const responseData = (result) => {
    if (result.message === "Selamat Datang") {
        setCookieWithExpireHour("token", result.token, 2);
        alert(`Berhasil Masuk ${result.message}`);
        window.location.href = "dashboard.html";
    } else {
        alert(`Gagal Masuk password atau username salah`);
        console.log(result.message);
    }
};

const setCookieWithExpireHour = (cname, cvalue, exhour) => {
    const d = new Date();
    d.setTime(d.getTime() + exhour * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

window.PostSignIn = PostSignIn;
