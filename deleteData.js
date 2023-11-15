import { postWithBearer } from "./utilities/api.js";
import getCookie from "./getCookie.js";

const deleteData = () => {
    if(!confirm("Apakah anda yakin ingin menghapus topik ini?"))
    {
        return;
    }

    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/deleteTopic";

    let id = false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        if (urlParams.get('id') != '') {
            id = urlParams.get('id');
        }
    }
    const datainjson = {
        "_id": id
    };
    const token = getCookie("token")
    if (token) {
        postWithBearer(target_url, token, datainjson, responseData)
    } else {
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
        window.location.href = "sentimen.html";
    }
    // post(target_url, datainjson, responseData);
};

const responseData = (result) => {
    if (result.status === true) {
        alert("Berhasil menghapus topik")
        window.location.href = "sentimen.html";
    } else {
        alert(`parameter bermasalah atau sesi anda sudah habis, silahkan ulangi atau logout dan login ulang`);
        window.location.href = "sentimen.html";
    }
};

window.deleteData = deleteData;