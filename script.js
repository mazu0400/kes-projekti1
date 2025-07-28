let mortgageType = "repayment";

function setType(type) {
  mortgageType = type;
  document
    .getElementById("repaymentBtn")
    .classList.toggle("active", type === "repayment");
  document
    .getElementById("interestBtn")
    .classList.toggle("active", type === "interest");
}

function calculate() {
  const amount = parseFloat(document.getElementById("amount").value);
  const term = parseFloat(document.getElementById("term").value);
  const rate = parseFloat(document.getElementById("rate").value);

  if (amount <= 0 || term <= 0 || rate <= 0) {
    alert("Please enter positive values only.");
    return;
  }

  const monthlyRate = rate / 100 / 12;
  const totalPayments = term * 12;

  let monthly, total;

  if (mortgageType === "repayment") {
    monthly =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
    total = monthly * totalPayments;
  } else {
    monthly = amount * monthlyRate;
    total = monthly * totalPayments;
  }
  document.getElementById("placeholder-result").classList.add("hidden");
  document.getElementById("result-info").classList.remove("hidden");
  document.getElementById("calculated-result").classList.remove("hidden");

  document.getElementById("placeholder-result").classList.add("hidden");
  document.getElementById("calculated-result").classList.remove("hidden");

  document.getElementById("monthlyRepayment").textContent =
    "£" + monthly.toFixed(2).toLocaleString();
  document.getElementById("totalRepayment").textContent =
    "£" + total.toFixed(2).toLocaleString();
}

document.getElementById("clearBtn").addEventListener("click", function (e) {
  e.preventDefault();

  document.getElementById("amount").value = "";
  document.getElementById("term").value = "";
  document.getElementById("rate").value = "";

  document.getElementById("placeholder-result").classList.remove("hidden");
  document.getElementById("result-info").classList.add("hidden");
  document.getElementById("calculated-result").classList.add("hidden");

  document.getElementById("monthlyRepayment").textContent = "£0.00";
  document.getElementById("totalRepayment").textContent = "£0.00";

  document.querySelector('input[value="repayment"]').checked = true;
});
