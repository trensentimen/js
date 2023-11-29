import { postWithBearer } from "./utilities/api.js";
import getCookie from "./getCookie.js";
import { showLoadingModal, hideLoadingModal } from "./utilities/loading.js"

const scrapData = () => {
    if(!confirm("Apakah anda yakin ingin mengambil data?"))
    {
        return;
    }
    showLoadingModal()
    
    const target_url = "https://asia-southeast2-trens-project.cloudfunctions.net/scraping";
    
    let id = false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        if (urlParams.get('id') != '') {
            id = urlParams.get('id');
        }else{
            alert("parameter bermasalah, silahkan ulangi");
            hideLoadingModal()
            window.location.href = "sentimen.html";
        }
    }else{
        alert("parameter bermasalah, silahkan ulangi");
        hideLoadingModal()
        window.location.href = "sentimen.html";
    }
    const datainjson = {
        "_id": id
    };
    const token = getCookie("token")
    if (token) {
        postWithBearer(target_url, token, datainjson, responseData)
    } else {
        console.log("token tidak ada " + result.message);
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
        window.location.href = "sentimen.html";
        hideLoadingModal()
    }
}

const responseData = (result) => {
    if (result.status === true) {
    
    alert("Berhasil mengambil data")
    document.getElementById("actionButton").innerHTML = "Analyze Data";
    document.getElementById("actionButton").setAttribute("onclick", "analyzeData()");
    document.getElementById("actionButton").setAttribute("class", "button is-primary");
    
    location.reload();
    hideLoadingModal()
    }else{
        console.log(result.message);
        alert(`parameter bermasalah atau sesi anda sudah habis, silahkan ulangi atau logout dan login ulang`);
        hideLoadingModal()
        window.location.href = "sentimen.html";
    }
}

window.scrapData = scrapData;