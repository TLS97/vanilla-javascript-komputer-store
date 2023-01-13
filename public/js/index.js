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

// Variables
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
  // console.log(selectedComputer);
  computerFeaturesEl.innerText = selectedComputer.description;
  // renderComputerDisplayInfo(selectedComputer);
};

// Event Listeners
computerSelectionEl.addEventListener("change", handleComputerSelectionChange);
