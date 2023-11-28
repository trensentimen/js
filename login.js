import { post } from "./utilities/api.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import {showLoadingModal, hideLoadingModal} from "./utilities/loading.js"

const PostSignIn = () => {
    showLoadingModal()
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/login";
    const datainjson = {
        email: getValue("email"),
        password: getValue("password")
    };

    post(target_url, datainjson, responseData);
};

const responseData = (result) => {
    // console.log(result);
    if (result.status === true) {
        setCookieWithExpireHour("token", result.token, 2);
        hideLoadingModal()
        alert(`Berhasil Masuk ${result.message}`);
        window.location.href = "dashboard.html";
    } else {
        hideLoadingModal()
        alert(`Gagal Masuk password atau email salah`);
    }
};

const setCookieWithExpireHour = (cname, cvalue, exhour) => {
    const d = new Date();
    d.setTime(d.getTime() + exhour * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

window.PostSignIn = PostSignIn;
