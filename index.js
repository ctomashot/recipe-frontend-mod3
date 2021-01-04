const recipeUrl = "http://localhost:3000/recipes";
const commentUrl = "http://localhost:3000/comments";
const ratingUrl = "http://localhost:3000/ratings";
const userUrl = "http://localhost:3000/users";
const recipeBody = document.getElementsByTagName("body")[0]

function main() {
    fetchRecipes()
}

function fetchRecipes() {
    fetch(recipeUrl)
        .then(resp => resp.json())
        .then(recipes => {
        recipes.forEach(showRecipe)
    })
}

function showRecipe(recipeData){
    const recipeLi = document.createElement("li")
    recipeLi.innerText = recipeData.title
    
    recipeBody.append(recipeLi)
    
}





main() 































