const btnStr = document.querySelector("[data-start]");
const btnStp = document.querySelector("[data-stop]");

let intervalId = null;

btnStp.addEventListener('click', () => {


});




function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
