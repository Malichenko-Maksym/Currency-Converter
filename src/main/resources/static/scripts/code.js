var request = new XMLHttpRequest();
var ex1;
var ex2;

let firstCurSelection = document.getElementById('firstCur');
let secondCurSelection = document.getElementById('secondCur');

let firstCurInput = document.getElementById('firstCurInp');
let secondCurInput  = document.getElementById('secondCurInp');

firstCurInput.addEventListener('input', calculateSecondCur);
secondCurInput.addEventListener('input', calculateFirstCur);

firstCurInput.disabled = true;
secondCurInput.disabled = true;

function firstSelected(){
    getFirstExRate();
    checkIfBothSelected();
    if(secondCurInput.value.length>0){
        calculateSecondCur();
    }

}

function  secondSelected(){
    getSecondExRate();
    checkIfBothSelected();
    if(firstCurInput.value.length>0){
        calculateSecondCur();
    }

}


function checkIfBothSelected(){
    if (firstCurSelection.value!="none" && secondCurSelection.value!="none"){
        document.getElementById("rate").innerHTML = "1 "+firstCurSelection.value+" = " + (ex1/ex2).toFixed(4) + " "+secondCurSelection.value;
        document.getElementById("fee").style.visibility = "visible";
        firstCurInput.disabled = false;
        secondCurInput.disabled = false;
    }
}
function calculateFirstCur() {
    firstCurInput.value = (secondCurInput.value*(ex2/ex1)).toFixed(4);
}

function calculateSecondCur() {
    secondCurInput.value = (firstCurInput.value*(ex1/ex2)).toFixed(4);
}

//My try
function getFirstExRate() {
    request.open("POST","/submitFirstCur",false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status===200){
            ex1 = request.response;
        }
    };
    request.send(JSON.stringify({chosenFirstCur : firstCurSelection.value}));
}

function getSecondExRate() {
    request.open("POST","/submitSecondCur",false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status===200){
            ex2 = request.response;
        }
    };
    request.send(JSON.stringify({chosenSecondCur : secondCurSelection.value}));
}