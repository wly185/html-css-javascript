const main = document.querySelector('main');
const chooseVoice = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: 'I am Thirsty'
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

function createBox(i) {
  const box = document.createElement('div');

  const { image, text } = i;
  box.classList.add('box');
  box.innerHTML = `<img src=${image} alt=${text} /><p class="info">${text}</p>`;
  box.addEventListener('click', () => {
    speakText(text);
    box.classList.add('active');
    setTimeout(() => {
      box.classList.remove('active');
    }, 800);
  });
  main.appendChild(box);
}

toggleBtn.addEventListener('click', showTextBox);
function showTextBox() {
  document.getElementById('text-box').classList.toggle('show');
}

closeBtn.addEventListener('click', showTextBox);

async function voiceOptions() {
  await speechSynthesis.getVoices().forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    chooseVoice.appendChild(option);
  });
}

speechSynthesis.addEventListener('voiceschanged', voiceOptions);
const message = new SpeechSynthesisUtterance();

function speakText(text) {
  message.text = text;
  speechSynthesis.speak(message);
}
readBtn.addEventListener('click', () => speakText(textarea.value));

chooseVoice.addEventListener('change', chosenVoice);

async function chosenVoice(e) {
  message.voice = await speechSynthesis
    .getVoices()
    .find((voice) => voice.name === e.target.value);
}
