const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');
const sortBtn = document.getElementById('sort');

// https://randomuser.me/api/

let data = [];

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();
  // console.log(data);
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  // console.log(newUser);

  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>person</strong>wealth</h2>`;
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name} </strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(num);

  // return '$'+num.toFixed(2).replace(/\d?=(\d{3})+\.)/g,'$&,'
}

addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', doubleMoney);
function doubleMoney() {
  const doubled = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });

  data = doubled;
  updateDOM();
}

sortBtn.addEventListener('click', sortMoney);

function sortMoney() {
  const sorted = data.sort((a, b) => {
    return b.money - a.money;
  });
  // data = sorted;
  updateDOM(sorted);
}

showMillionairesBtn.addEventListener('click', filterMillionaires);

function filterMillionaires() {
  const filtered = data.filter((i) => i.money > 1000000);
  updateDOM(filtered);
}

calculateWealthBtn.addEventListener('click', getTotalWealth);
function getTotalWealth() {
  const total = data.reduce((total, item) => total + item.money, 0);
  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3>total wealth: <strong>${formatMoney(
    total
  )}</strong> </h3>`;
  main.appendChild(totalEl);
}
