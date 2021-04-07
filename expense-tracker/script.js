//elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//DATA
// const dummyTransactions = [
//   { id: 1, text: 'flower', amount: -20 },
//   { id: 2, text: 'salary', amount: 300 },
//   { id: 3, text: 'book', amount: -10 },
//   { id: 4, text: 'camera', amount: 150 }
// ];

//LOCAL STORAGE
const retrieveLocalStorage = JSON.parse(localStorage.getItem('transactions'));

// let transactions = dummyTransactions;
let transactions =
  localStorage.getItem('transactions') !== null ? retrieveLocalStorage : [];

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//CRUD
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('please add text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: Number(amount.value)
    };

    // console.log(transaction);

    transactions.push(transaction);
    // console.log(transactions);
    addTransactionDOM(transaction);
    updateValues();
    text.value = '';
    amount.value = '';
    updateLocalStorage();
  }
}

function removeTransactionBYIdDOM(id) {
  transactions = transactions.filter((i) => i.id !== id);
  updateLocalStorage();
  init();
}

//HELPERS
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransactionBYIdDOM(${
    transaction.id
  })">x</button>`;
  // console.log(item);
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  // console.log(amounts);

  const total = amounts.reduce((total, item) => (total += item), 0).toFixed(2);
  // console.log(total);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((total, item) => (total += item), 0)
    .toFixed(2);
  // console.log(income);

  const expense = (
    amounts
      .filter((item) => item < 0)
      .reduce((total, item) => (total += item), 0) * -1
  ).toFixed(2);

  // console.log(expense);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//DOM
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

//listeners
form.addEventListener('submit', addTransaction);
