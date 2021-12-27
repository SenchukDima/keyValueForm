"use strict";

let input = document.getElementById("add_name-value-input"); //or this.parentNode
let textarea = document.getElementById("show_result-area");

let splitedArray = [];
let keyValueObj = {};

function addNameValue() {
  if (/^([A-Za-zА-Яа-яЁё\d\s]+=[A-Za-zА-Яа-яЁё\d\s]+)$/.test(input.value)) {
    let keyValueArray = [];
    let keyValueRepace;
    keyValueRepace = input.value.replace(/\s/g, "");
    textarea.value += keyValueRepace + "\n";

    document.getElementById("error_inform-block").textContent = "";
    keyValueArray = keyValueRepace.split("=");
    splitedArray.push(keyValueArray);
  }
}

function sortTextareaByName() {
  if (splitedArray.length != 1) {
    textarea.value = "";
    splitedArray.sort((a, b) => a[0].localeCompare(b[0]));
    for (let i = 0; i < splitedArray.length; i++) {
      let joinedArray = [];

      joinedArray = splitedArray[i].join("=");
      textarea.value += joinedArray + "\n";
    }
  } else return false;
}

function sortTextareaByValue() {
  if (splitedArray.length != 1) {
    textarea.value = "";
    splitedArray.sort((a, b) => a[1].localeCompare(b[1]));
    for (let i = 0; i < splitedArray.length; i++) {
      let joinedArray = [];

      joinedArray = splitedArray[i].join("=");
      textarea.value += joinedArray + "\n";
    }
  }
}

function clearLastInTextarea() {
  if (splitedArray.length != 0) {
    textarea.value = "";

    for (let i = 0; i < splitedArray.length - 1; i++) {
      let joinedArray = [];

      joinedArray = splitedArray[i].join("=");
      textarea.value += joinedArray + "\n";
    }
    splitedArray.pop();
  }
  console.log(document.getElementById("show_result-XML").textContent);
  if (document.getElementById("show_result-XML").textContent !== "") {
    document.getElementById("show_result-XML").innerHTML = "";
    showXML();
  }
}

function clearTextarea() {
  if (splitedArray.length != 0) {
    textarea.value = "";
    document.getElementById("show_result-XML").innerHTML = "";
    splitedArray = [];
  }
}

function showXML() {
  if (splitedArray.length != 0) {
    let text = "";
    let parser, xmlDoc;

    let titleText = "";
    for (let i = 0; i < splitedArray.length; i++) {
      titleText +=
        "<bookstore><book>" +
        `<title>${splitedArray[i][0]}=${splitedArray[i][1]}</title>` +
        "</book></bookstore>";
    }
    text = `<Parent>${titleText}</Parent>`;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");

    let x;
    let txt = "";
    x = xmlDoc.getElementsByTagName("title");

    for (let i = 0; i < x.length; i++) {
      txt += x[i].childNodes[0].nodeValue + "<br>";
    }
    document.getElementById("show_result-XML").innerHTML = txt;
  }
}

document.getElementById("add_name-value-input").addEventListener(
  "keyup",
  function (e) {
    if (/^([A-Za-zА-Яа-яЁё\d\s]+=[A-Za-zА-Яа-яЁё\d\s]+)$/.test(input.value)) {
      document.getElementById("error_inform-block").textContent = "";
    }
  },
  false
);

document.getElementById("add_name-value-input").addEventListener(
  "blur",
  function (e) {
    if (!/^([A-Za-zА-Яа-яЁё\d\s]+=[A-Za-zА-Яа-яЁё\d\s]+)$/.test(input.value)) {
      document.getElementById("error_inform-block").textContent =
        "Please write text as KEY=VALUE";
    }
  },
  false
);

document.getElementById("add_name-value-submit").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    addNameValue();
  },
  false
);

document.getElementById("sort_result_by-name").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    sortTextareaByName();
  },
  false
);

document.getElementById("sort_result_by-value").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    sortTextareaByValue();
  },
  false
);

document.getElementById("delete_result-one").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    clearLastInTextarea();
  },
  false
);

document.getElementById("delete_result").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    clearTextarea();
  },
  false
);

document.getElementById("show_result-xml").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    showXML();
  },
  false
);
