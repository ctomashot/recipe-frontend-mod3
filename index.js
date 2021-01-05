document.addEventListener("DOMContentLoaded", function(){
    fetchBallers()
  })
  
  function fetchBallers (){
    fetch('http://localhost:3000/recipes')
    .then(response => response.json())
    .then(recipecs => {
      recipecs.forEach((recipe) => showRecipe(recipe))
    })
  }

  function showRecipe(recipe){
    const outerDiv = document.createElement('div')
    outerDiv.setAttribute("class", "card")
    outerDiv.setAttribute('id', recipe.id)
    const img = document.createElement('img')
    img.setAttribute("src", recipe.image)
    const innerDiv = document.createElement('div')
    innerDiv.setAttribute("class", "container")
    const recipeName = document.createElement('h3')
    recipeName.innerText = recipe.title
    const ingredientsList = document.createElement('h4')
    ingredientsList.innerText = recipe.ingredients
    const content = document.createElement('h4')
    content.innerText = recipe.content

  
    outerDiv.append(img, innerDiv, recipeName, ingredientsList, content)
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
    const container = document.querySelector('body')
    container.append(outerDiv)
  }