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
let bankBalance = 0;
let loan = 0;
let pay = 0;
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

  //console.log(`balance: ${bankBalance}\nloan: ${loan}`);
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
  loan === 0 ? getLoan(bankBalance) : alert("You already have a loan!");
};

const getLoan = (bankBalance) => {
  //console.log(`from loan button: ${bankBalance}`);
  let desiredLoan = parseInt(prompt("Enter the desired loan amount"));
  let maxLoanValue = bankBalance * 2;

  if (desiredLoan <= maxLoanValue) {
    loan = desiredLoan;
    //bankBalance += loan;

    renderBankSection(bankBalance, loan);
  } else {
    alert(
      `You cannot get a loan greater than double you bank balance.\nYou have a bank balance of ${bankBalance}.\nMaximum loan amount is ${maxLoanValue}`
    );
  }
};

const renderWorkSection = (pay) => {
  payEl.innerText = "";
  payEl.innerText = pay;
};

const handleWorkButtonClick = (e) => {
  pay += 100;
  renderWorkSection(pay);
};

const handleBankButtonClick = (e) => {
  if (loan > 0) {
    let downpayment = pay * 0.1;
    confirm(
      "10% of your pay will automatically go to downpaying your loan.\nAre you sure you want to transfer the money?"
    )
      ? transferMoneyToBank(downpayment)
      : false;
  } else {
    transferMoneyToBank(0);
  }
};

const transferMoneyToBank = (downpayment) => {
  if (downpayment <= loan) {
    loan -= downpayment;
    bankBalance += pay - downpayment;
  } else {
    pay -= loan;
    bankBalance += pay;
  }
  pay = 0;
  //console.log(`from transfer function: ${bankBalance}`);
  renderBankSection(bankBalance, loan);
  renderWorkSection(pay);
};

// Event Listeners
computerSelectionEl.addEventListener("change", handleComputerSelectionChange);
getLoanBtnEl.addEventListener("click", handleLoanButtonClick);
workBtnEl.addEventListener("click", handleWorkButtonClick);
bankBtnEl.addEventListener("click", handleBankButtonClick);

renderBankSection(bankBalance, loan);
renderWorkSection(pay);
