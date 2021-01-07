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
    // outerDiv.setAttribute('class', "col-3")
    
    const img = document.createElement('img')
    img.setAttribute("src", recipe.image)
    
    const recipeName = document.createElement('h3')
    recipeName.innerText = recipe.title
    const ingredientsList = document.createElement('h4')
    ingredientsList.innerText = recipe.ingredients
    const content = document.createElement('h4')
    content.innerText = recipe.content
    
    const frontDiv = document.createElement('div')
    frontDiv.setAttribute("class", "front-card")
    const backDiv = document.createElement('div')
    backDiv.setAttribute("class", "back-card")


    frontDiv.append(img, recipeName) // will need comments attached here

    backDiv.append(ingredientsList, content)

  
    outerDiv.append(frontDiv, backDiv)
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
    // const body = document.querySelector('body')

    
  const row = document.querySelector('.container')
    
    container.append(outerDiv)
    row.append(container)


      // const row1 = document.querySelector('#row1')
      // const row2 = document.querySelector('#row2')
      // const row3 = document.querySelector('#row3')


  
    // console.log(row.childElementCount)

    // if (row3.childElementCount < row2.childElementCount)
    //     row3.append(outerDiv)
    // // if (row2.childElementCount < row1.childElementCount)
    //     row2.append(outerDiv)
    // if (row1.childElementCount < row2.childElementCount)
    //     row1.append(outerDiv)
        
  }