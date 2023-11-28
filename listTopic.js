import { postWithBearer } from "./utilities/api.js";
// import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import getCookie from "./getCookie.js";
import { addInner } from "./utilities/element.js"
import { card } from "./temp/table.js";
import {showLoadingModal, hideLoadingModal} from "./utilities/loading.js"

const Postdata = () => {
    showLoadingModal()
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/getAllTopics";
    const datainjson = {};

    const token = getCookie("token")
    if (token) {
        postWithBearer(target_url, token, datainjson, responseData)
    } else {
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
        hideLoadingModal()
    }
    // post(target_url, datainjson, responseData);
};

const responseData = (result) => {
    if (result.status === true) {
        let isiRow = (value) => {
            let content =
                card.replace("#JUDUL#", value.topicname)
                    .replace("#SOURCE#", value.source.source)
                    .replace("#LOVE#", value.love ? value.love : "0")
                    .replace("#VIEW#", value.view ? value.view : "0")
                    .replace("#ID#", value._id)
            addInner("listTopic", content);
        }

        result.data.forEach(isiRow)
        hideLoadingModal()
    } else {
        hideLoadingModal()
        alert(`sesi anda sudah habis, silahkan logout dan login ulang`);
    }
};

Postdata();
