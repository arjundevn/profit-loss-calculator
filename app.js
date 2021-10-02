var buyingPriceInput = document.querySelector("#buying-price");
var quantityInput = document.querySelector("#quantity");
var currentPriceInput = document.querySelector("#current-price");
var checkBtn = document.querySelector(".check-btn")
var allInputs = document.querySelectorAll("input");
var output = document.querySelector(".output");
var display = document.querySelector("main");
var greenColor = "#D1FAE5";
var redColor = "#FEE2E2";
var defaultColor = "#F3F4F6";

allInputs.forEach((input) => {
    input.oninput = ((event) => {
        if (event.target != quantityInput){
        output.style.display = "none";
        display.style.backgroundColor = defaultColor ;
        }
        if (event.target.validity.valid) {
            event.target.previousValidInput = event.target.value
            if (allIinputsEntered()) {
                checkBtn.disabled = false;
            } else {
                checkBtn.disabled = true
            }
        } else {
            event.target.value = event.target.previousValidInput;
            // checkBtn.disabled = true;
        }
    })
})

function allIinputsEntered() {
    var entries = []
    allInputs.forEach((input) => entries.push(Number(input.value)))
    return (entries.includes(0) ? false : true)
}

function calcProfitOrLoss(currentPrice, buyingPrice, quantity) {
    if (currentPrice > buyingPrice) {
        var profit = currentPrice - buyingPrice
        var absProfit = profit*quantity;
        var profitPercentage = profit / buyingPrice * 100
        return {
            status: "profit",
            absolute: absProfit.toFixed(2),
            percentage: profitPercentage.toFixed(2)
        }
    } else if (currentPrice < buyingPrice) {
        var loss = buyingPrice - currentPrice;
        var absLoss = (loss)*quantity;
        var lossPercentage = loss/buyingPrice*100;
        return {
            status: "loss",
            absolute: absLoss.toFixed(2),
            percentage: lossPercentage.toFixed(2)
        }
    } else {
        output.style.display = "block"; 
        output.innerText = "Your Stock has not moved";
    }
}

function displayOutput(result){
    if (result.status==="profit"){
        display.style.backgroundColor = greenColor;
        output.style.display = "block"; 
        output.innerText = `The profit is ${result.absolute} and the percentage is ${result.percentage}%`;
    } else  {
        display.style.backgroundColor = redColor;
        output.style.display = "block";
        output.innerText = `The loss is ${result.absolute} and the percentage is ${result.percentage}%`;
    }
}

function submitHandler(){
    var currentPrice = Number(currentPriceInput.value);
    var buyingPrice = Number(buyingPriceInput.value);
    var quantity = Number(quantityInput.value);
    console.log(currentPrice, buyingPrice, quantity)
    var result = calcProfitOrLoss(currentPrice, buyingPrice, quantity);

    displayOutput(result)

}

checkBtn.addEventListener("click", submitHandler);