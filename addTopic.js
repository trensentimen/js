import { postWithBearer } from "./utilities/api.js";
import getCookie from "./getCookie.js";
import { getValue } from "./utilities/element.js"

const PostAddTopic = () => {
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

    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/addTopic";
    const datainjson = {
        topicname: getValue("judulInput"),
        source: {
            source: selectedValue,
            value: getValue("topikInput")
        }
    };
    const token = getCookie("token")
    if (token) {
        postWithBearer(target_url, token, datainjson, responseData)
        alert("Berhasil menambahkan topik")
    } else {
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
    }
};

const responseData = (result) => {
    if (result.status === true) {
        window.location.href = "sentimen.html";
    } else {
        alert(`sesi anda sudah habis, silahkan logout dan login ulang`);
    }
};


export default PostAddTopic;
