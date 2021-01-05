document.addEventListener("DOMContentLoaded", function(){
    fetchRecipes()
  })
  
  function fetchRecipes (){
    fetch('http://localhost:3000/recipes')
    .then(response => response.json())
    .then(recipes => {
      recipes.forEach((recipe) => showRecipe(recipe))
    })
  }

  function showRecipe(recipe){
    const outerDiv = document.createElement('div')
    outerDiv.setAttribute("class", "card")
    outerDiv.setAttribute('id', recipe.id)
    const img = document.createElement('img')
    img.setAttribute("src", recipe.image)
    
    const recipeName = document.createElement('h3')
    recipeName.innerText = recipe.title
    const ingredientsList = document.createElement('h4')
    ingredientsList.innerText = recipe.ingredients
    const content = document.createElement('h4')
    content.innerText = recipe.content

  
    outerDiv.append(img, recipeName, ingredientsList, content)
    if (recipe.vegan === true){
        const vegan = document.createElement('h4')
        vegan.innerText = "Vegan: True"
        outerDiv.append(vegan)
    }

    if (recipe.vegetarian === true){
        const vegetarian = document.createElement('h4')
        vegetarian.innerText = "Vegetarian: True"
        outerDiv.append(vegetarian)
    }
    const body = document.querySelector('body')
    
    const section = document.querySelector('section')
    section.append(outerDiv)
  }