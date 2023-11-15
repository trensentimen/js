import { postWithBearer } from "./utilities/api.js";
// import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import getCookie from "./getCookie.js";
import { getValue } from "./utilities/element.js"

const PostUpdateTopic = () => {
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/updateTopic";

    const radioButtons = document.querySelectorAll('input[name="radioOption"]');
    let selectedValue;

    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
        }
    });

    //validasi form
    if (getValue("judulInput") === ""|| getValue("judulInput") === null) {
        alert("Topik tidak boleh kosong");
        return;
    }else if (getValue("topikInput") === ""|| getValue("judulInput") === null) {
        alert("Topik tidak boleh kosong");
        return;
    } else if (selectedValue === "" || selectedValue === null) {
        alert("Topik tidak boleh kosong");
        return;
    }

    let id = false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        if (urlParams.get('id') != '') {
            id = urlParams.get('id');
        }
    }
    const datainjson = {
        "_id": id,
        "topicname": getValue("judulInput"),
        "source": {
            "source": selectedValue,
            "value": getValue("topikInput")
        }
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
        window.location.href = "topik.html?id=" + result.data[0]._id;
    } else {
        alert(`parameter bermasalah atau sesi anda sudah habis, silahkan ulangi atau logout dan login ulang`);
        window.location.href = "sentimen.html";
    }
};

export default PostUpdateTopic;
