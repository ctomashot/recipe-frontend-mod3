// recipeUrl = "http://localhost:3000/recipes"
// commentUrl = "http://localhost:3000/comments"

// document.addEventListener("DOMContentLoaded", function(){
//     fetchRecipes()
//   })

//   function fetchRecipes (){
//     fetch(recipeUrl)
//     .then(response => response.json())
//     .then(recipecs => {
//       recipecs.forEach((recipe) => showRecipe(recipe))
//     })
//   }

//   function showRecipe(recipe){
//     const outerDiv = document.createElement('div')
//     outerDiv.setAttribute("class", "card")
//     outerDiv.setAttribute('id', recipe.id)
//     const img = document.createElement('img')
//     img.setAttribute("src", recipe.image)
//     const innerDiv = document.createElement('div')
//     innerDiv.setAttribute("class", "container")
//     const recipeName = document.createElement('h3')
//     recipeName.innerText = recipe.title
//     const ingredientsList = document.createElement('h4')
//     ingredientsList.innerText = recipe.ingredients
//     const content = document.createElement('h4')
//     content.innerText = recipe.content

//     outerDiv.append(img, innerDiv, recipeName, ingredientsList, content)
//     if (recipe.vegan === true){
//         const vegan = document.createElement('h4')
//         vegan.innerText = "Vegan"
//         outerDiv.append(vegan)
//     }

//     if (recipe.vegetarian === true){
//         const vegetarian = document.createElement('h4')
//         vegetarian.innerText = "Vegetarian"
//         outerDiv.append(vegetarian)
//     }

//     recipeId = recipe.id
//     fetchComments(outerDiv, recipeId)

//     const container = document.querySelector('body')
//     container.append(outerDiv)
//   }

//   function fetchComments(outerDiv, recipeId) {
//       fetch(commentUrl)
//       .then(response => response.json())
//       .then(comments => {
//           comments.forEach((comment) => showComment(comment, outerDiv, recipeId))
//       })
//   }

//   function showComment(comment, outerDiv, recipeId) {
//     const commentH5 = document.createElement('h5')
//     if(comment.recipe_id === recipeId){
//         commentH5.textContent = comment.content
//         commentH5.dataset.id = comment.id
//         const deleteComment = document.createElement('button')
//         deleteComment.textContent = 'Delete'
//         commentH5.append(deleteComment)
//         deleteComment.addEventListener('click', deleteTheComment)
//     }

//     outerDiv.append(commentH5)
//   }

//   function deleteTheComment(event){
//     const commentId = event.target.parentElement.dataset.id
//     const parent = event.target.parentElement
//     console.log(commentId)
//     fetch(`${commentUrl}/${commentId}`,{
//         method: 'DELETE'
//     })
//     parent.remove()
//   }

document.addEventListener("DOMContentLoaded", function () {
  fetchUser();
});

function fetchUser() {
  fetch("http://localhost:3000/users")
    .then((resp) => resp.json())
    .then((users) => {
      users.forEach(postUser);
    });
}


let x = document.getElementById("login");
let y = document.getElementById("register");
let z = document.getElementById("btn");

function register() {
  x.style.left = "400px";
  y.style.left = "50px";
  z.style.left = "110px";
}

function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0px";
}
