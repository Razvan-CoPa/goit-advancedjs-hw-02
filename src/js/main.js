
import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#home").innerHTML = `
    
    `;

    // Attach event listener to the button with id "timerBt"
    const timerButton = document.getElementById("timerBt");
    timerButton.addEventListener("click", () => {
      window.location.href = "1-timer.html"});
  
    // Attach event listener to the button with id "snackBt"
    const snackButton = document.getElementById("snackBt");
    snackButton.addEventListener("click", () => {
      window.location.href = "2-snackbar.html"});
});