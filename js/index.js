"use strict";

let input = document.getElementById("add_name-value-input"); //or this.parentNode

let splitedArray = [];

function addNameValue() {
  if (/^([A-Za-zА-Яа-яЁё\d\s]+=[A-Za-zА-Яа-яЁё\d\s]+)$/.test(input.value)) {
    let keyValueArray = [];
    let keyValueReplace;
    keyValueReplace = input.value.replace(/\s/g, "");
    $("#select").append(`<option value="" ">${keyValueReplace}</option>`);
    document.getElementById("error_inform-block").textContent = "";
    keyValueArray = keyValueReplace.split("=");
    splitedArray.push(keyValueArray);
    console.log(splitedArray);
  }
}

function sortTextareaByName() {
  if (splitedArray.length != 1) {
    $("#select").empty();
    splitedArray.sort((a, b) => a[0].localeCompare(b[0]));
    for (let i = 0; i < splitedArray.length; i++) {
      let joinedArray = [];

      joinedArray = splitedArray[i].join("=");

      $("#select").append(`<option value="" ">${joinedArray}</option>`);
    }
  }
  if (document.getElementById("show_result-XML").textContent !== "") {
    document.getElementById("show_result-XML").innerHTML = "";
    showXML();
  }
}

function sortTextareaByValue() {
  if (splitedArray.length != 1) {
    $("#select").empty();
    splitedArray.sort((a, b) => a[1].localeCompare(b[1]));
    for (let i = 0; i < splitedArray.length; i++) {
      let joinedArray = [];

      joinedArray = splitedArray[i].join("=");
      $("#select").append(`<option value="" ">${joinedArray}</option>`);
    }
  }
  if (document.getElementById("show_result-XML").textContent !== "") {
    document.getElementById("show_result-XML").innerHTML = "";
    showXML();
  }
}

function clearLastInTextarea() {
  if (splitedArray.length != 0) {
    $("#select option:selected").remove();
    const value = $("#select")[0].length;
    splitedArray = [];
    for (let i = 0; i < value; i++) {
      let splitArray = [];

      splitArray = $("#select")[0][i].text.split("=");

      splitedArray.push(splitArray);
    }
  }
  if (document.getElementById("show_result-XML").textContent !== "") {
    document.getElementById("show_result-XML").innerHTML = "";
    showXML();
  }
}

function showXML() {
  if (splitedArray.length != 0) {
    const value = $("#select")[0].length;
    let text = "";
    let parser, xmlDoc;

    let titleText = "";
    for (let i = 0; i < value; i++) {
      titleText +=
        "<bookstore><book>" +
        `<title>${$("#select")[0][i].text}</title>` +
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

document.getElementById("show_result-xml").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    showXML();
  },
  false
);

