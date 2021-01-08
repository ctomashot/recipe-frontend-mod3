let cardInner = document.querySelector(".card__inner");

cardInner.addEventListener("click", function (e) {
  cardInner.classList.toggle("is-flipped");
});

const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");

btn.addEventListener("click", function (e) {
  e.preventDefault;
  widget.style.display = "block";
  post.style.display = "block";
  btn.style.display = "none";
  editBtn.onclick = () => {
    widget.style.display = "block";
    post.style.display = "none";
    btn.style.display = "block";
  };
  return false;
});

recipeUrl = "http://localhost:3000/recipes";
commentUrl = "http://localhost:3000/comments";
const allCards = document.getElementsByClassName("cards")[0];

function main() {
  fetchRecipes();
}

function fetchRecipes() {
  fetch(recipeUrl)
    .then((response) => response.json())
    .then((recipes) => {
      recipes.forEach((recipe) => showRecipe(recipe));
    });
}

function showRecipe(recipe) {
  const initialCard = document.createElement("div")[1];
  initialCard.setAttribute("class", "card");
  const frontTitle = document.getElementsByTagName("h2")[0];
  const recipeImgFront = document.getElementsByTagName("img")[1];
  const cardHeaderFront = document.getElementsByClassName(
    "card__header--front"
  )[0];
  const cardFaceFront = document.getElementsByClassName(
    "card__face card__face--front"
  )[0];
  const cardInner = document.getElementsByClassName("card__inner")[0];

  const cardFaceBack = document.getElementsByClassName(
    "card__face card__face--back"
  )[0];
  const cardContent = document.getElementsByClassName("card__content");
  const cardHeader = document.getElementsByClassName("card__header");
  const recipeImgBack = document.getElementsByTagName("img")[2];
  const backTitle = document.getElementsByTagName("h2")[1];
  const ifVeganVegetarian = document.getElementsByTagName("h4")[0];
  const recipeIngredients = document.getElementsByTagName("p")[0];

  const outerDiv = document.createElement("div");
  outerDiv.setAttribute("class", "card-container");

  // FRONT OF THE CARD
  recipeImgFront.src = recipe.image;
  frontTitle.innerText = recipe.title;

  cardHeaderFront.append(recipeImgFront, frontTitle);
  cardFaceFront.append(cardHeaderFront);
  cardInner.append(cardFaceFront, cardFaceBack);
  initialCard.append(cardInner);
  outerDiv.append(initialCard);

  // BACK OF THE CARD
  recipeImgBack.src = recipe.image;
  backTitle.innerText = recipe.title;
  recipeIngredients.innerText = recipe.content;

  if (recipe.vegan === true) {
    ifVeganVegetarian.innerText = "Vegan";
  } else if (recipe.vegetarian === true) {
    ifVeganVegetarian.innerText = "Vegetarian";
  } else {
    ifVeganVegetarian.innerText = "Contains Meat";
  }
  allCards.append(outerDiv);
}

main();

console.log(allCards);
