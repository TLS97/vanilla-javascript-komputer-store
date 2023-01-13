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

// Variables
let bankBalance = 200;
let loan = 0;
let computers = [];

// Fetching computer data
fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => (computers = data))
  .then((computers) => addComputersToList(computers));

// Functions
const addComputersToList = (computers) => {
  computers.forEach((c) => addComputerToList(c));
};

const addComputerToList = (computer) => {
  const computerEl = document.createElement("option");
  computerEl.value = computer.id;
  computerEl.appendChild(document.createTextNode(computer.title));
  computerSelectionEl.appendChild(computerEl);
};

const handleComputerSelectionChange = (e) => {
  const selectedComputer = computers[e.target.selectedIndex];
  computerFeaturesEl.innerText = selectedComputer.description;
  // renderComputerDisplayInfo(selectedComputer);
};

const renderBankSection = (bankBalance, loan) => {
  loanDivEl.innerHTML = "";
  bankBalanceEl.innerText = "";

  console.log(`balance: ${bankBalance}\nloan: ${loan}`);
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

const handleLoanButtonClick = (e) => {
  let desiredLoanValue = parseInt(prompt("Enter the desired loan amount"));
  loan === 0 ? getLoan(desiredLoanValue) : alert("You already have a loan!");
};

const getLoan = (desiredLoan) => {
  let maxLoanValue = bankBalance * 2;

  if (desiredLoan <= maxLoanValue) {
    loan = desiredLoan;
    bankBalance += loan;

    renderBankSection(bankBalance, loan);
  } else {
    alert(
      `You cannot get a loan greater than double you bank balance.\nYou have a bank balance of ${bankBalance}.\nMaximum loan amount is ${maxLoanValue}`
    );
  }
};

// Event Listeners
computerSelectionEl.addEventListener("change", handleComputerSelectionChange);
getLoanBtnEl.addEventListener("click", handleLoanButtonClick);

renderBankSection(bankBalance, loan);
