// Exchange Rates
var exchangeRate = /*[[${exchangeRate}]]*/ "";
document.getElementById("rate").innerHTML = "1 GBP = " + (exchangeRate).toFixed(2) + " PLN";
let currencyGBP = document.getElementById('gbp');
let currencyPLN = document.getElementById('pln');

currencyGBP.addEventListener('input', calculatePLN);
currencyPLN.addEventListener('input', calculateGBP);

function calculatePLN() {
    currencyPLN.value = (currencyGBP.value * exchangeRate).toFixed(2);
}

function calculateGBP() {
    currencyGBP.value = (currencyPLN.value / exchangeRate).toFixed(2);
}

function turnOnDarkModeAtStart() {
    if (sessionStorage.getItem("isDarkModeOn") == "true") {

    }
}


// Dark Mode
function turnOnDarkMode() {
    sessionStorage.setItem("isDarkModeOn", "true");
    document.getElementsByTagName("body")[0].style.backgroundColor = "#666156";
    document.getElementById("dark-mode-switch").innerHTML = "🌞";
}

function turnOffDarkMode() {
    sessionStorage.setItem("isDarkModeOn", "false");
    document.getElementsByTagName("body")[0].style.backgroundColor = "#f5f5f5";
    document.getElementById("dark-mode-switch").innerHTML = "🌝";
}

function switchDarkMode() {
    if (sessionStorage.getItem("isDarkModeOn") == "true") {
        turnOffDarkMode()
    } else {
        turnOnDarkMode()
    }
}
