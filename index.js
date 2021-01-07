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
  const container = document.createElement('div')
    container.setAttribute("class", "row")

  function showRecipe(recipe){
    const outerDiv = document.createElement('div')
    outerDiv.setAttribute("class", "card col-3" )
    outerDiv.setAttribute('id', recipe.id)
    
    
    const img = document.createElement('img')
    img.setAttribute("src", recipe.image)
    img.setAttribute("class", "photo")
    
    const recipeName = document.createElement('h3')
    recipeName.setAttribute("class", "card-title")
    recipeName.innerText = recipe.title
    const ingredientsList = document.createElement('h4')
    ingredientsList.innerText = recipe.ingredients
    const content = document.createElement('h4')
    content.innerText = recipe.content
    
    const frontDiv = document.createElement('div')
    frontDiv.setAttribute("class", "card-front text-white bg-dark")
    const backDiv = document.createElement('div')
    backDiv.setAttribute("class", "card-back bg-white")



    const cardFlip = document.createElement("div")
    cardFlip.setAttribute("class", "card card-flip h-100")

    //const cardBody = document.createElement("div")
    //cardBody.setAttribute("class", "card-body")

   

    frontDiv.append(recipeName, img) // will need comments attached here

    backDiv.append(ingredientsList, content)

    cardFlip.append(frontDiv, backDiv)
    if (recipe.vegan === true){
        const vegan = document.createElement('h4')
        vegan.innerText = "Vegan: True"
       backDiv.append(vegan)
    }

    if (recipe.vegetarian === true){
        const vegetarian = document.createElement('h4')
        vegetarian.innerText = "Vegetarian: True"
        backDiv.append(vegetarian)
    }

    // cardFlip.append(cardBody)

    const cardContainer = document.querySelector('.container')
    
    const column = document.createElement("div")
    column.setAttribute("class", "col-sm-4")
    
    cardContainer.append(container)

    container.append(column)
    
    column.append(cardFlip)
    

    
    //const floatingI = document.createElement("i")
    //floatingI.setAttribute("class", "fa fa-search fa-5x float-right")
  }