import { postWithBearer, post } from "./utilities/api.js";
import getCookie from "./getCookie.js";
import { showLoadingModal, hideLoadingModal } from "./utilities/loading.js"

import { docs } from "./getTopic.js";

const analyzeData = () => {
    if (!confirm("Apakah anda yakin ingin menganalisis data?")) {
        return;
    }

    showLoadingModal()
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/function-2"

    const datainjson = {
        "sentiments": docs.map((doc) => doc.text),
    };

    const token = getCookie("token")

    if (token) {
        post(target_url, datainjson, responseData)
    } else {
        console.log("token tidak ada " + result.message);
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
        hideLoadingModal()
        window.location.href = "sentimen.html";
    }
}

const responseData = (result) => {

    if (result.message === true) {

        const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/updateSentimen"

        const datainjson = docs.map((doc) => {
            return {
                ...doc,
                "sentimen": result.data[docs.indexOf(doc)]
            }
        });

        const token = getCookie("token")

        if (token) {
            postWithBearer(target_url, token, datainjson, responseData2)
        } else {
            console.log("token tidak ada " + result.message);
            alert("sesi anda sudah habis, silahkan logout dan login ulang")
            hideLoadingModal()
            window.location.href = "sentimen.html";
        }

    } else {
        console.log("token tidak ada " + result.message);
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
        hideLoadingModal()
        window.location.href = "sentimen.html";
    }
}

const responseData2 = (result) => {
    if (result.status === true) {
        alert("Berhasil menganalisis data")
        window.location.reload()
        hideLoadingModal()
    } else {
        console.log("token tidak ada " + result.message);
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
        hideLoadingModal()
        window.location.href = "sentimen.html";
    }
}

window.analyzeData = analyzeData;