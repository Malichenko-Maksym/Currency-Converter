var request = new XMLHttpRequest();
var ex1;
var ex2;

let firstCurSelection = document.getElementById('firstCur');
let secondCurSelection = document.getElementById('secondCur');

let firstCurInput = document.getElementById('firstCurInp');
let secondCurInput  = document.getElementById('secondCurInp');

firstCurInput.addEventListener('input', calculateSecondCur);
secondCurInput.addEventListener('input', calculateFirstCur);

firstCurInput.hidden  = true;
secondCurInput.hidden  = true;

function regExCheckKeydown(event,elemId) {
    let currentElem = document.getElementById(elemId);
    const regex = /(^[1-9][0-9]*([\.,][0-9]*)?$)|(^0([\.,][0-9]*)?$)/;
    let keyPressed = event.key;
    //write for phones
    if (keyPressed === null || keyPressed === "Backspace" || regex.test(currentElem.value + keyPressed)) {
        if(keyPressed===','){
            event.preventDefault();
            currentElem.value= currentElem.value + ".";
        }
    } else {
        event.preventDefault();
    }
}

function getExchangeRate(chosenSelector) {
    let answer;
    request.open("POST","/submitFirstCur",false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status===200){
            answer = request.response;
        }
    };
    request.send(JSON.stringify({chosenFirstCur : chosenSelector.value}));
    return answer;
}

function showNotation(){
    if (firstCurSelection.value!="none" && secondCurSelection.value!="none"){
        let firstText = firstCurSelection.options[firstCurSelection.selectedIndex].text;
        let secondText= secondCurSelection.options[secondCurSelection.selectedIndex].text;
        let firstPart = "1 "+firstText.slice(firstText.length-4,firstText.length-1);
        let secondPart = (ex1/ex2).toFixed(4) + " "+secondText.slice(secondText.length-4,secondText.length-1);
        document.getElementById("rate").innerHTML = firstPart +" = " + secondPart;
        document.getElementById("fee").style.visibility = "visible";
        firstCurInput.hidden  = false;
        secondCurInput.hidden  = false;
    }
}

function calculateFirstCur() {
    firstCurInput.value =String( (parseFloat(secondCurInput.value)*(ex2/ex1)).toFixed(2) );
    if(firstCurInput.value=="NaN"){
        firstCurInput.value='';
    }
}

function calculateSecondCur() {
    secondCurInput.value =String( (parseFloat(firstCurInput.value)*(ex1/ex2)).toFixed(2) );
    if(secondCurInput.value=="NaN"){
        secondCurInput.value='';
    }
}

function firstSelected(){
    ex1=getExchangeRate(firstCurSelection);
    showNotation();
    if(secondCurInput.value.length>0){
        calculateSecondCur();
    }
}
function secondSelected(){
    ex2=getExchangeRate(secondCurSelection);
    showNotation();
    if(firstCurInput.value.length>0){
        calculateSecondCur();
    }
}
