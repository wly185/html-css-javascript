const check = document.getElementById('check');
const draggableList = document.getElementById('draggable-list');

const richestPeople = [
  'jeff bezos',
  'bill gates',
  'warren buffet',
  'bernard arnault',
  'carlos slim helu',
  'amancio ortega',
  'larry ellison',
  'mark zuckerberg',
  'michael bloomberg',
  'larry page'
];

// const richestPeople = ['apple', 'orange', 'mango', 'papaya', 'honeydew'];

let listItems = [];

// let dragStartIndex;

function randomise(list) {
  const random = [...list]
    .map((a) => ({ value: a, index: Math.random() }))
    .sort((a, b) => {
      return a.index - b.index;
    })
    .map((a) => a.value);
  return random;
}

function init() {
  const random = randomise(richestPeople);
  createListDOM(random);
  listItems = [...random];
  // console.log('init');
}

window.addEventListener('load', init);

function createListDOM(list) {
  const listItemsDOM = [];

  list.forEach((person, index) => {
    const listItem = `<li data-index="${index}"><span class="number">${
      index + 1
    }</span><div class="draggable" draggable="true" data-index="${index}" ><p class="person-name">${person}</p><i class="fas fa-grip-lines"></i></div></li>`;

    listItemsDOM.push(listItem);
  });

  draggableList.innerHTML = listItemsDOM.join('');
  addEventListeners();
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragleave', dragLeave);
  });
}

// Necessary. Allows us to drop.
function dragOver(e) {
  e.preventDefault();
  document.querySelector(`li[data-index="${fromIndex}"]`).classList.add('over');
}

//styling only
function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

let fromIndex;

//drag and drop functionality
function dragStart(e) {
  const from = this.closest('li').getAttribute('data-index');
  fromIndex = from;
}

function dragDrop(e) {
  const to = this.closest('li').getAttribute('data-index');
  document
    .querySelector(`li[data-index="${fromIndex}"]`)
    .classList.remove('over');
  this.classList.remove('over');
  // console.log(listItems);
  rearrangeItems(fromIndex, to);
  // swapItems(fromIndex, to);
}

//helper

// this swap mutates an array and renders it instead of usng appendchild
function swapItems(from, to) {
  console.log('swap!');
  const fromItem = listItems[from];
  const toItem = listItems[to];

  listItems[from] = toItem;
  listItems[to] = fromItem;
  createListDOM(listItems);
  console.log(listItems);
}

//added in a reorder instead that displaces the other elements instead of swapping
function rearrangeItems(from, to) {
  const reorderedList = [...listItems];
  from = +from;
  to = +to;

  // console.log(from, to, typeof from, typeof to);
  // console.log(to < from, from < to);

  if (to < from) {
    // console.log('move up', to < from);
    for (i = 0; i < listItems.length; i++) {
      if (i === to) {
        reorderedList[i] = listItems[from];
        // console.log(i, 'from');
      } else if (i > to && i <= from) {
        reorderedList[i] = listItems[i - 1];
        // console.log(i, '-1');
      } else {
        reorderedList[i] = listItems[i];
        // console.log(i, '=');
      }
    }
  } else if (from < to) {
    // console.log('move down', from < to);
    for (i = 0; i < listItems.length; i++) {
      if (i === to) {
        reorderedList[i] = listItems[from];
        // console.log(i, 'from');
      } else if (i >= from && i < to) {
        reorderedList[i] = listItems[i + 1];
        // console.log(i, '+1');
      } else {
        reorderedList[i] = listItems[i];
        // console.log(i, '=');
      }
    }
  }
  listItems = [...reorderedList];
  createListDOM(listItems);
}

check.addEventListener('click', checkOrder);
function checkOrder() {
  // console.log(document.querySelector(`#draggable-list li:nth-child(2)`));
  listItems.forEach((listItem, index) => {
    const listItemEl = document.querySelector(
      `#draggable-list li:nth-child(${index + 1})`
    );
    // console.log(listItemEl);
    // console.log(listItem !== richestPeople[index]);
    if (listItem !== richestPeople[index]) {
      listItemEl.classList.add('wrong');
    } else {
      listItemEl.classList.remove('wrong');
      listItemEl.classList.add('right');
    }
  });
}
