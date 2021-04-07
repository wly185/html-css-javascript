//elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const meals = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMeal = document.getElementById('single-meal');

//handler
function searchMeal(e) {
  e.preventDefault();

  singleMeal.innerHTML = '';
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>search results for '${term}':<h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>there are no search results. try again</p>`;
        } else {
          meals.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal"><img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                  <div class="meal-info" data-mealId=${meal.idMeal}>
                    <h3>${meal.strMeal}</h3>
                  </div>
                </div>`
            )
            .join('');
        }
      });

    search.value = '';
  } else {
    alert('please enter a search term');
  }
}

function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data, 'data');
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  // console.log(meal, 'meal', meal['strIngredient1']);
  const ingredients = [];
  for (let i = 1; i <= 20, i++; ) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  // console.log(ingredients, 'ingredients');
  singleMeal.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ``}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ``}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((i) => `<li>${i}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

function getRandomMeal() {
  meals.innerHTML = '';
  resultHeading.innerHTML = '';
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

//listeners
submit.addEventListener('submit', searchMeal);
meals.addEventListener('click', (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealId');
    getMealById(mealId);
  }
});
random.addEventListener('click', getRandomMeal);
