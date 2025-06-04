import {temples} from "../scripts/temples.js";
//console.log(temples);
import {url} from "../scripts/temples.js";
//console.log(url);
const openButton1 = document.getElementById("openButton1");
const openButton2 = document.getElementById("openButton2");
const openButton3 = document.getElementById("openButton3");

const closeButton = document.getElementById("closeButton");
const dialogBox = document.getElementById("dialogBox");
const dialogBoxText = dialogBox.querySelector("div");

openButton1.addEventListener("click", () => {
  dialogBoxText.innerHTML = "One Apple contains 95 calories.";
  dialogBox.showModal();
});

openButton2.addEventListener("click", () => {
  dialogBoxText.innerHTML = "One Orange contains 62 calories.";
  dialogBox.showModal();
});

openButton3.addEventListener("click", () => {
  dialogBoxText.innerHTML = "One Banana contains 105 calories.";
  dialogBox.showModal();
});

closeButton.addEventListener("click", () => {
  dialogBox.close();
});

const showHere = document.getElementById("showHere");
const mydialog = document.getElementById("mydialog");
const mytitle = mydialog.querySelector("h2");
const myclose = mydialog.querySelector("button");
const myinfo = mydialog.querySelector("p");
myclose.addEventListener("click", () => mydialog.close());
myinfo.innerHTML = "Click on a photo to see more information.";

function displayItems(data) {
  console.log(data);
  data.forEach(x => {
    console.log(x);
    const photo = document.createElement("img");
    photo.src = url + x.path;
    photo.alt = x.name;
    photo.addEventListener("click", () => showStuff(x));
    showHere.appendChild(photo);
  });
}
displayItems(temples);
function showStuff(x) {
  mytitle.innerHTML = x.name;
  mydialog.showModal();
}