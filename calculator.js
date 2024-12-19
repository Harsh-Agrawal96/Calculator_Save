
function appendToDisplay(value) {

  const display = document.getElementById("display");
  if (display.innerText === "0") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }

}


function clearDisplay() {
  document.getElementById("display").innerText = "0";
}

function deleteLast() {
  const display = document.getElementById("display");
  display.innerText = display.innerText.slice(0, display.innerText.length - 1) || "0";
}


function squareExpression() {

  const display = document.getElementById("display");
  if( display.innerText === "Error" || display.innerText === "Infinity" ){
    display.innerText = "Error";
    return;
  }
  try {
    const value = eval(display.innerText);
    const result = value ** 2;
    const expression = `${display.innerText} = ${result}`;
    display.innerText = result;
    updateHistory(expression);
  } catch {
    display.innerText = "Error";
  }

}

function calculate() {

  const display = document.getElementById("display");
  if( display.innerText === "Error" || display.innerText === "Infinity" ){
    display.innerText = "Error";
    return;
  }
  try {
    const result = eval(display.innerText);
    const expression = `${display.innerText} = ${result}`;
    display.innerText = result;
    updateHistory(expression);
  } catch {
    display.innerText = "Error";
  }

}


function updateHistory(expression) {

  const historyList = document.getElementById("historyList");
  const li = document.createElement("li");
  li.textContent = expression;
  historyList.appendChild(li);

}

function toggleHistory() {
  const sidebar = document.getElementById("historySidebar");
  sidebar.classList.toggle("active");
}
