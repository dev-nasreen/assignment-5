const searchBtn = document.getElementById("search-btn");
const getInput = document.getElementById("getInput");
const mealsItems = document.getElementById("meals");
const resultBox = document.getElementById("Result-box");
const singleMeal = document.getElementById("single-meal");

const searchMeal= elements => {
    //get search term
    const mealName = getInput.value;

    //Check for empty search
    if(mealName.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
            resultBox.innerHTML =`<h2> Search result for '${mealName}': </h2>`;
            
            if(data.meals === null){
                resultBox.innerHTML =`<h3>There are no search results. try again </p>`;
            }else{
                mealsItems.innerHTML = data.meals.map( mealInfo).join('');
            }
        
        });
        //clear search text
        getInput.value = '';
    }else{
        alert('Please enter a Meal name.')
    }
    
}

const mealInfo = meal => `
<div class="meal">
<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
<div class="meal-info" data-mealId="${meal.idMeal}" >
    <h3>${meal.strMeal}</h3>
</div>
</div>
`

//fetch meal by id
const getMealById = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data =>{
        const meal = data.meals[0];
        addMealItem(meal);
    })
   
}

// Add meals to dom
const addMealItem = meal =>{
    const ingredients = [];

    for(let i = 1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break
        }
    }

    singleMeal.innerHTML  = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="single-meal-info">
        <p>${meal.strCategory}</p>
        <p>${meal.strArea}</p>
        </div>
        <div class="description">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>
    `
  
}
// Add event Listener
searchBtn.addEventListener('click', searchMeal);

mealsItems.addEventListener('click',elements => {
    const mealInfo = elements.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });
    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealId');
        getMealById(mealID);
    }
})