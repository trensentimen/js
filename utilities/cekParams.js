
const cekParams = (id,url) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(id)) {
        console.log('Parameter "id" ada.');
        if (urlParams.get(id) == '') {
            console.log('Parameter "id" kosong.');
        } else {
            window.location.href = url;
        }
    } else {
        window.location.href = url;
    }
}

export default cekParams;
