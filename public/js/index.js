// DOM Elements
const bankBalanceEl = document.getElementById("bank-balance");
const getLoanBtnEl = document.getElementById("get-a-loan-btn");
const payEl = document.getElementById("pay");
const bankBtnEl = document.getElementById("bank-btn");
const workBtnEl = document.getElementById("work-btn");
const computerSelectionEl = document.getElementById("computer-selection");
const computerFeaturesEl = document.getElementById("computer-features");
const computerImageDivEl = document.getElementById("computer-image-div");
const computerModelEl = document.getElementById("computer-model");
const computerDescEl = document.getElementById("computer-desc");
const buyNowBtnEl = document.getElementById("buy-now-btn");
const loanDivEl = document.getElementById("loan-div");
const downpayLoanBtnEl = document.getElementById("downpay-loan-btn");
const priceTagEl = document.getElementById("price");
const computerSelectionColEl = document.getElementById(
  "computer-selection-col"
);
const computerSelectionCardEl = document.getElementById(
  "computer-selection-card"
);
const computerDisplayRowEl = document.getElementById("computer-display-row");
const laptopStockDiv = document.getElementById("stock-div");

downpayLoanBtnEl.style.visibility = "hidden";

// Variables
let bankBalance = 200000;
let loan = 0;
let pay = 0;
let computers = [];
let currentlySelectedComputer;

// Fetching computer data
fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => (computers = data))
  .then((computers) => addComputersToList(computers));

// Functions
const addComputersToList = (computers) => {
  computers.forEach((c) => addComputerToList(c));

  currentlySelectedComputer = computers[0];

  renderComputerDisplayInfo(currentlySelectedComputer);
  renderComputerSelectionSection();
};

const addComputerToList = (computer) => {
  const computerEl = document.createElement("option");
  computerEl.value = computer.id;
  computerEl.appendChild(document.createTextNode(computer.title));
  computerSelectionEl.appendChild(computerEl);
};

const renderBankSection = (bankBalance, loan) => {
  loanDivEl.innerHTML = "";

  bankBalanceEl.innerText = "";
  bankBalanceEl.innerText = bankBalance;

  if (loan > 0) {
    const loanHtml = `<div class="col">
                        <p>Outstanding Loan</p>
                      </div>
                      <div class="col text-end" id="loan">
                        ${loan}
                      </div>`;
    loanDivEl.insertAdjacentHTML("beforeend", loanHtml);
  }
};

const renderWorkSection = (pay) => {
  payEl.innerText = "";
  payEl.innerText = pay;
  loan > 0
    ? (downpayLoanBtnEl.style.visibility = "visible")
    : (downpayLoanBtnEl.style.visibility = "hidden");
};

const renderComputerDisplayInfo = (computer) => {
  computerImageDivEl.innerHTML = "";
  computerImageDivEl.innerHTML = `<img src="https://hickory-quilled-actress.glitch.me/${computer.image}" style="height: 200px" alt="Laptop Image" />`;

  computerModelEl.innerText = "";
  computerModelEl.innerText = computer.title;

  computerSpecsString = computer.specs.join("\n");
  computerDescEl.innerText = "";
  computerDescEl.innerText = computerSpecsString;

  priceTagEl.innerText = "";
  priceTagEl.innerText = computer.price + " NOK";

  if (computer.stock > 0) {
    laptopStockDiv.innerHTML = "";
    stockHtml = `<p>Stock: ${computer.stock}</p>`;
    laptopStockDiv.insertAdjacentHTML("beforeend", stockHtml);
  } else {
    laptopStockDiv.innerHTML = "";
    stockHtml = `<h3>Out of Stock</h3>`;
    laptopStockDiv.insertAdjacentHTML("beforeend", stockHtml);
  }
};

const renderComputerSelectionSection = () => {
  computerFeaturesEl.innerHTML = "";
  let computerFeaturesHtml = `<strong>Features</strong>
                              <p id="computer-features">${currentlySelectedComputer.description}</p>`;
  computerFeaturesEl.insertAdjacentHTML("beforeend", computerFeaturesHtml);
};

const takeOutLoan = (e) => {
  if (loan === 0) {
    let desiredLoan = parseInt(prompt("Enter the desired loan amount"));
    let maxLoanValue = bankBalance * 2;

    if (desiredLoan <= maxLoanValue) {
      loan = desiredLoan;
      bankBalance += loan;
      renderBankSection(bankBalance, loan);
      renderWorkSection(pay);
    } else {
      alert(
        `You cannot get a loan greater than double you bank balance.\nYou have a bank balance of ${bankBalance}.\nMaximum loan amount is ${maxLoanValue}`
      );
    }
  } else {
    alert("You already have a loan!");
  }
};

const increasePay = (e) => {
  pay += 100;
  renderWorkSection(pay);
};

const transferMoneyToBank = (e) => {
  if (pay > 0) {
    if (loan > 0) {
      isConfirmed = confirm(
        "10% of your pay automatically goes to downpaying your loan. Would you like to proceed?"
      );

      if (isConfirmed) {
        const loanDownpayMinPercent = 0.1;
        let downpaymentValue = pay * loanDownpayMinPercent;
        let payToTransfer = pay - downpaymentValue;

        loan -= downpaymentValue;
        bankBalance += payToTransfer;
        pay = 0;

        renderBankSection(bankBalance, loan);
        renderWorkSection(pay);
      }
    } else {
      bankBalance += pay;
      pay = 0;

      renderBankSection(bankBalance, loan);
      renderWorkSection(pay);
    }
  } else {
    alert(
      "You have to earn some money before you can transfer it to the bank!"
    );
  }
};

const downpayLoan = (e) => {
  if (pay >= loan) {
    pay -= loan;
    loan = 0;
    renderWorkSection(pay);
    renderBankSection(bankBalance);
  } else {
    alert(
      "You don't have sufficient pay to downpay your loan.\nYou need to work more!"
    );
  }
};

const handleComputerSelectionChange = (e) => {
  currentlySelectedComputer = computers[e.target.selectedIndex];

  computerFeaturesEl.innerHTML = "";
  let computerFeaturesHtml = `<strong>Features</strong>
                              <p id="computer-features">${currentlySelectedComputer.description}</p>`;

  computerFeaturesEl.insertAdjacentHTML("beforeend", computerFeaturesHtml);
  renderComputerDisplayInfo(currentlySelectedComputer);
};

const purchaseComputer = (e) => {
  if (currentlySelectedComputer.stock > 0) {
    if (bankBalance >= currentlySelectedComputer.price) {
      alert(
        `Congratulation!\nYou've purchased the ${currentlySelectedComputer.title}.`
      );

      bankBalance -= currentlySelectedComputer.price;
      currentlySelectedComputer.stock -= 1;

      renderBankSection(bankBalance, loan);
      renderComputerSelectionSection();
      renderComputerDisplayInfo(currentlySelectedComputer);
    } else {
      alert(`You don't have enough money to purchase this computer!`);
    }
  } else {
    alert(
      `The ${currentlySelectedComputer.title} is out of stock.\nPlease select a different laptop.`
    );
  }
};

// Event Listeners
getLoanBtnEl.addEventListener("click", takeOutLoan);
workBtnEl.addEventListener("click", increasePay);
bankBtnEl.addEventListener("click", transferMoneyToBank);
downpayLoanBtnEl.addEventListener("click", downpayLoan);
buyNowBtnEl.addEventListener("click", purchaseComputer);
computerSelectionEl.addEventListener("change", handleComputerSelectionChange);

// Initial render
renderBankSection(bankBalance, loan);
renderWorkSection(pay);
