const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// anything with class of seat, puts into array. queryselector will only select one

populateUI();

// update 'total' and 'count'
function updateSelectedCount() {
  //returns a nodelist, must add space to indicate nesting
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // console.log('selected', ...selectedSeats);
  // console.log('seats', ...seats);

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  // selectedindex is a native JS DOM method
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// logs number as type. or use parse
let ticketPrice = +movieSelect.value;
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// movie select event
movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// seat click event
container.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    //add toggle remove
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
