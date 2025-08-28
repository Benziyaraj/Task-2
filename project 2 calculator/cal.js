const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let expression = "";

// Update display
const updateDisplay = () => display.value = expression;

// Safe evaluate
const calculate = () => {
  try {
    if (!expression) return;
    // Allow only digits, operators, decimal, spaces
    if (!/^[0-9+\-*/. ]+$/.test(expression)) {
      display.value = "Error";
      expression = "";
      return;
    }
    const result = Function("return " + expression)();
    if (result === Infinity || result === -Infinity) {
      display.value = "Error: ÷0";
      expression = "";
    } else {
      expression = result.toString();
      updateDisplay();
    }
  } catch {
    display.value = "Error";
    expression = "";
  }
};

// Handle button clicks
buttons.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const { value, action } = e.target.dataset;

  if (action === "clear") {
    expression = "";
    updateDisplay();
  } else if (action === "backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (action === "equals") {
    calculate();
  } else if (value) {
    expression += value;
    updateDisplay();
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (/[\d+\-*/.]/.test(e.key)) {
    expression += e.key;
    updateDisplay();
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (e.key.toLowerCase() === "c") {
    expression = "";
    updateDisplay();
  }
});
