export const container = (id) => {
    return document.getElementById(id);
}

export const onClick = (id, actionfunctionname) => {
    document.getElementById(id).onclick = actionfunctionname;
}

export const onChange = (id, actionfunctionname) => {
    document.getElementById(id).onchange = function () { actionfunctionname() };
}

export const textFocus = (id) => {
    document.getElementById(id).focus();
}

export const textBlur = (id) => {
    document.getElementById(id).blur();
}

export const getValue = (id) => {
    return document.getElementById(id).value;
}

export const setValue = (id, valuecontent) => {
    return document.getElementById(id).value = valuecontent;
}

export const setInner = (id, content) => {
    document.getElementById(id).innerHTML = content;
}

export const addInner = (id, content) => {
    document.getElementById(id).innerHTML += content;
}

export const addChild = (id, tag, classvalue, content) => {
    let el = document.createElement(tag);
    let classArray = classvalue.split(" ");
    classArray.forEach(setClassValue.bind(null, el));
    el.innerHTML = content;
    document.getElementById(id).appendChild(el);
}

function setClassValue(el, classvalue) {
    el.classList.add(classvalue.trim());
}

export const show = (id) => {
    document.getElementById(id).style.display = 'block';
}

export const hide = (id) => {
    document.getElementById(id).style.display = 'none';
}