const btnStr = document.querySelector("[data-start]");
const btnStp = document.querySelector("[data-stop]");

let intervalId = null;

btnStr.addEventListener('click', () => {
    btnDisabled();
    intervalId = setInterval(() => {
      const color = getRandomHexColor();
      document.body.style.backgroundColor = `${color}`;
    }, 1000);
  });
  btnStp.addEventListener('click', () => {
    clearInterval(intervalId);
      btnDisabled();
  });
  
  function btnDisabled() {
    if (!btnStr.disabled) {
      btnStr.disabled = true;
      btnStp.disabled = false;
    } else {
      btnStr.disabled = false;
      btnStp.disabled = true;
    }
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;

};
