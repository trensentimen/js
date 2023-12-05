import { postWithBearer } from "./utilities/api.js";
// import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import getCookie from "./getCookie.js";
import { addInner } from "./utilities/element.js"
import { showLoadingModal, hideLoadingModal } from "./utilities/loading.js"
import { tabelTopic } from "./temp/table.js";

let docs = [];

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
        console.log("token tidak ada " + result.message);
        alert("sesi anda sudah habis, silahkan logout dan login ulang")
        hideLoadingModal()
        window.location.href = "sentimen.html";

    }
    // post(target_url, datainjson, responseData);
};

const responseData = (result) => {
    // console.log(result);
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

            document.getElementById("actionButton").innerHTML = "Analyze Data";
            document.getElementById("actionButton").setAttribute("onclick", "analyzeData()");
            document.getElementById("actionButton").setAttribute("class", "button is-primary");
            if (result.datatopics.length > 0) {
                docs = result.datatopics;
                let index = 0;
                let isiRow = (value) => {
                    // console.log(value)
                    let content =
                        tabelTopic.replace("#NO#", index += 1)
                            .replace("#TEXT#", value.text)
                            .replace("#SENTIMEN#", value.sentimen != "" ? value.sentimen : "Belum di analisa")
                    addInner("isiTabel", content);
                }

                result.datatopics.forEach(isiRow)

                document.getElementById("textNoData").style.display = "none";
            }

        } else if (result.data[0].status == "analyzing") {
            if (result.datatopics.length > 0) {
                docs = result.datatopics;
                let index = 0;
                let isiRow = (value) => {
                    // console.log(value)
                    let content =
                        tabelTopic.replace("#NO#", index += 1)
                            .replace("#TEXT#", value.text)
                            .replace("#SENTIMEN#", value.sentimen != "" ? value.sentimen : "Belum di analisa")
                    addInner("isiTabel", content);
                }

                result.datatopics.forEach(isiRow)

                document.getElementById("textNoData").style.display = "none";
            }

            document.getElementById("actionButton").innerHTML = "Analyze Data";
            document.getElementById("actionButton").removeAttribute("onclick");
            document.getElementById("actionButton").setAttribute("class", "button is-primary");
            document.getElementById("actionButton").setAttribute("disabled", true);

            let positif = 0;
            let negatif = 0;
            let netral = 0;
            
            result.datatopics.forEach(value => {
                const sentimen = value.sentimen;
                if (sentimen == "positif" ||sentimen == "positive") {
                    positif += 1;
                } else if (sentimen == "negatif"||sentimen == "negative") {
                    negatif += 1;
                } else if (sentimen == "netral"||sentimen == "neutral") {
                    netral += 1;
                }
            });

            console.log(positif, negatif, netral)

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                // Set Data
                const data = google.visualization.arrayToDataTable([
                    ['Sentimen', 'Count'],
                    ['Positif', positif],
                    ['Netral', netral],
                    ['Negatif', negatif],
                ]);

                // Set Options
                const options = {
                    title: 'Sentimen Analisis'
                };

                // Draw
                const chart = new google.visualization.PieChart(document.getElementById('myChart'));
                chart.draw(data, options);

            }
        }

        hideLoadingModal()
        // window.location.href = "sentimen.html";
    } else {
        console.log(result.message);
        alert(`parameter bermasalah atau sesi anda sudah habis, silahkan ulangi atau logout dan login ulang`);
        hideLoadingModal()
        window.location.href = "sentimen.html";

    }
};


Postdata();

export { docs };