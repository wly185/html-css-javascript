const apiUrl = 'https://api.lyrics.ovh';
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

form.addEventListener('submit', (e) => searchInput(e));
function searchInput(e) {
  e.preventDefault();
  const term = search.value.trim();
  if (!term) {
    alert('please type in a search term');
  } else {
    searchSongs(term);
  }
}

async function searchSongs(term) {
  const res = await fetch(`${apiUrl}/suggest/${term}`);
  const data = await res.json();

  resultsDOM(data);
}

function resultsDOM(data) {
  result.innerHTML = `<ul class="songs">${data.data
    .map(
      (song) =>
        `<li><span><strong>${song.artist.name}</strong> - ${song.title}</span><button  class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">get lyrics</button></li>`
    )
    .join('')}</ul>`;

  if (data.prev || data.next) {
    prevBtn = `${
      data.prev
        ? `<button onclick="getMoreSongs(
            '${data.prev}'
          )" class="btn">prev</button>`
        : ''
    }`;

    nextBtn = `${
      data.next
        ? `<button onclick="getMoreSongs(
            '${data.next}'
          )" class="btn">next</button>`
        : ''
    }`;
    // console.log(nextBtn);

    more.innerHTML = `${data.prev ? prevBtn : ''}${data.next ? nextBtn : ''}`;
  } else {
    more.innerHTML = '';
  }
}

async function getMoreSongs(url) {
  // console.log(`https://cors-anywhere.herokuapp.com/${url}`, 'next');
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  // some server side magic
  const data = await res.json();
  resultsDOM(data);
}

result.addEventListener('click', (e) => clickForLyrics(e));

function clickForLyrics(e) {
  const clickedEl = e.target;
  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const title = clickedEl.getAttribute('data-song-title');

    getLyrics(artist, title);
  }
}

async function getLyrics(artist, title) {
  const res = await fetch(`${apiUrl}/v1/${artist}/${title}`);
  // some server side magic
  const data = await res.json();

  // console.log(data.lyrics);
  const lyrics = data.lyrics.replace(/(\r\n|\n)/g, '<br/>');

  result.innerHTML = `<h2><strong>${artist}</strong> - ${title}</h2><span>${lyrics}</span>`;

  more.innerHTML = '';
}
