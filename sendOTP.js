import { post } from "./utilities/api.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import {showLoadingModal, hideLoadingModal} from "./utilities/loading.js"

const SendOTP = () => {
    showLoadingModal()
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/sendOtp";
    const datainjson = {
        email: getValue("email")
    };

    post(target_url, datainjson, responseData);
};

const responseData = (result) => {
    // console.log(result);
    if (result.status === true) {
        setCookie("email", getValue("email"));
        hideLoadingModal()
        alert(`Berhasil Mengirim OTP`);
        window.location.href = "verifyOTP.html";
    } else {
        hideLoadingModal()
        alert(`Gagal Mengirim OTP password atau email salah`);
    }
};

const setCookie = (cname, cvalue) => {
    document.cookie = `${cname}=${cvalue};path=/`;
};



window.SendOTP = SendOTP;
