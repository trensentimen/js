import { post } from "./utilities/api.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { showLoadingModal, hideLoadingModal } from "./utilities/loading.js"
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const resetPassword = () => {
    showLoadingModal()
    const email = getCookie("email")
    const otp = getCookie("otp")

    if(!email || !otp){
        alert("belum mengirim OTP")
        hideLoadingModal()
        window.location.href = "sendOTP.html"
        return
    }

    if( getValue("password") !== getValue("confirmPassword")){
        alert("password tidak sama")
        hideLoadingModal()
        return
    }

    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/resetPassword";
    const datainjson = {
        email: email,
        otp: otp,
        password: getValue("password")
    };

    post(target_url, datainjson, responseData);
};

const responseData = (result) => {
    // console.log(result);
    if (result.status === true) {
        hideLoadingModal()
        alert(`Berhasil mereset password, silahkan login`);
        window.location.href = "login.html";
    } else {
        hideLoadingModal()
        alert(`Gagal mereset password`);
    }
};

window.resetPassword = resetPassword;
