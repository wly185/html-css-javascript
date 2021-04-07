const btn = document.getElementById('btn');
const result = document.getElementById('result');
const num = document.getElementById('num');

btn.addEventListener('click', getPrimes);

function getPrimes() {
  const arrOdd = Array(+num.value)
    .fill(0)
    .map((i, index) => index + 1)
    .filter((i) => i % 2 > 0 && i % 5 > 0 && i !== 1)
    .reverse();

  const primes = [];
  for (const i of arrOdd) {
    const divisibles = [];
    for (const j of arrOdd) {
      if (j < i && i % j === 0) {
        divisibles.push(j);
        break;
      }
    }

    if (divisibles.length === 0) {
      primes.push(i);
    }
  }

  createListDOM(primes);
}

function createListDOM(list) {
  const ulDOM = list.map((i) => `<li>${i}</li>`);
  result.innerHTML = ulDOM.join('');
}
