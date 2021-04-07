const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
//5 instead of 3 so you have to scroll
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}

async function showPosts() {
  const posts = await getPosts();
  // console.log(posts);

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">
    ${post.title}
    </h2>
    <p class="post-body">${post.body}</p>
    </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

function showLoader() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

showPosts();

window.addEventListener('wheel', scrollBottom);

function scrollBottom(e) {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = window.document.documentElement;
  //html.scrollTop etc
  // console.log(scrollTop, scrollHeight, clientHeight);
  //all content - visible content >= scrollable height - height from the bottom
  if (scrollTop + clientHeight >= scrollHeight - 5 && e.deltaY > 0) {
    showLoader();
  }
}

filter.addEventListener('input', filterPosts);

function filterPosts(e) {
  // console.log(e.target.value);

  const term = e.target.value;
  const posts = document.querySelectorAll('.post');
  // console.log(document.querySelectorAll('.post'));
  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText;
    const body = post.querySelector('.post-body').innerText;

    // console.log(post);=> html
    // console.log(post.querySelector('.post-title'));

    //-1 means no result
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}
