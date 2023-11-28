import { postWithBearer } from "./utilities/api.js";
// import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import getCookie from "./getCookie.js";
import { addInner } from "./utilities/element.js"
import { showLoadingModal, hideLoadingModal } from "./utilities/loading.js"
import { tabelTopic } from "./temp/table.js";

const Postdata = () => {
    showLoadingModal()
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/getTopic";

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
        hideLoadingModal()
        window.location.href = "sentimen.html";

    }
    // post(target_url, datainjson, responseData);
};

const responseData = (result) => {
    if (result.status === true) {

        addInner("judul", result.data[0].topicname)
        addInner("topic", result.data[0].source.value)
        addInner("source", result.data[0].source.source)

        document.getElementById("judulInput").value = result.data[0].topicname;
        document.getElementById("topikInput").value = result.data[0].source.value;

        const defaultValue = result.data[0].source.source; // Change this value as needed
        document.querySelector(`input[type="radio"][value="${defaultValue}"]`).checked = true;

        //isi tabel
        if (result.data[0].status == "inputting") {
            if (result.datatopics.length > 0) {
                let index = 0;
                let isiRow = (value) => {
                    console.log(value)
                    let content =
                        tabelTopic.replace("#NO#", index + 1)
                            .replace("#TEXT#", value.text)
                            .replace("#SENTIMEN#", value.sentimen !="" ? value.sentimen : "Belum di analisa")
                    addInner("isiTabel", content);
                }

                result.datatopics.forEach(isiRow)

                document.getElementById("textNoData").style.display = "none";
            }
        }

        hideLoadingModal()
        // window.location.href = "sentimen.html";
    } else {
        alert(`parameter bermasalah atau sesi anda sudah habis, silahkan ulangi atau logout dan login ulang`);
        hideLoadingModal()
        window.location.href = "sentimen.html";

    }
};

Postdata();
