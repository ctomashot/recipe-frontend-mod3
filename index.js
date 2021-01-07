recipeUrl = "http://localhost:3000/recipes"
commentUrl = "http://localhost:3000/comments"


document.addEventListener("DOMContentLoaded", function(){
    fetchRecipes()
    newRecipeForm()
  })
  
  function fetchRecipes (){
    fetch(recipeUrl)
    .then(response => response.json())
    .then(recipes => {
      recipes.forEach((recipe) => showRecipe(recipe))
    })
  }

    const body = document.querySelector('body')
    const form = document.querySelector('.firstForm')

  function newRecipeForm(){
    
    const nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('placeholder', 'New Recipe Name...')
    const contentInput = document.createElement('input')
    contentInput.setAttribute('type', 'text')
    contentInput.setAttribute('placeholder', 'New Recipe Instructions...')
    const ingredientsInput = document.createElement('input')
    ingredientsInput.setAttribute('type', 'text')
    ingredientsInput.setAttribute('placeholder', 'New Recipe Ingredients...')
    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'text')
    imageInput.setAttribute('placeholder', 'New Recipe Image URL...')
    const veganInput = document.createElement('select')
    const veganTrue = document.createElement('option')
    const veganFalse = document.createElement('option')
    veganTrue.setAttribute("value", "true")
    veganFalse.setAttribute("value", "false")
    veganText1 = document.createTextNode('Vegan: True')
    veganText2 = document.createTextNode('Vegan: False')
    veganTrue.append(veganText1)
    veganFalse.append(veganText2)
    veganInput.append(veganTrue, veganFalse)
    const veggieInput = document.createElement('select')
    const veggieTrue = document.createElement('option')
    const veggieFalse = document.createElement('option')
    veggieTrue.setAttribute("value", "true")
    veggieFalse.setAttribute("value", "false")
    veggieText1 = document.createTextNode('Vegetarian: True')
    veggieText2 = document.createTextNode('Vegetarian: False')
    veggieTrue.append(veggieText1)
    veggieFalse.append(veggieText2)
    veggieInput.append(veggieTrue, veggieFalse)
    const submitButton = document.createElement('button')
    submitButton.setAttribute("type", "submit")
    submitButton.innerText = 'Post'
    form.append(nameInput, contentInput, ingredientsInput, imageInput, veganInput, veggieInput, submitButton)
    //body.append(form)
    form.addEventListener('submit', postRecipe)
  }
 


  function postRecipe(event){
    event.preventDefault()
    recipeTitle = event.target[0].value
    recipeInstructions = event.target[1].value
    recipeIngredients = event.target[2].value
    recipeImage = event.target[3].value
    recipeVegan = event.target[4].value
    recipeVeggie = event.target[5].value
    event.target[0].value = ''
    event.target[1].value = ''
    event.target[2].value = ''
    event.target[3].value = ''
    event.target[4].value = ''
    event.target[5].value = ''    
    
    fetch(`${recipeUrl}`,{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: recipeTitle,
            content: recipeInstructions,
            image: recipeImage,
            ingredients: recipeIngredients,
            user_id: 20,
            vegetarian: recipeVeggie,
            vegan: recipeVegan
        })
    })

    location.reload()
  }

  const row = document.querySelector('.row')
  const section= document.querySelector('section')
  section.append(form)

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

    row.append(outerDiv)  

    const frontDiv = document.createElement('div')
    frontDiv.setAttribute("class", "card-front text-white bg-dark")
    const backDiv = document.createElement('div')
    backDiv.setAttribute("class", "card-back bg-white")

    const cardFlip = document.createElement("div")
    cardFlip.setAttribute("class", "card card-flip h-25")

    frontDiv.append(recipeName, img) // will need comments attached here

    backDiv.append(ingredientsList, content)



  
    cardFlip.append(frontDiv, backDiv)
    if (recipe.vegan === true){
        const vegan = document.createElement('h4')
        vegan.innerText = "Vegan"
        backDiv.append(vegan)
    }

    if (recipe.vegetarian === true){
        const vegetarian = document.createElement('h4')
        vegetarian.innerText = "Vegetarian"
        backDiv.append(vegetarian)
    }

    const container = document.querySelector(".container")

    
    // const column = document.createElement("div")
    //column.setAttribute("class", "col-sm-4")
    
    // container.append(row)

    // container.append(column)
    
    outerDiv.append(cardFlip)



 
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.dataset.id = recipe.id
    deleteButton.addEventListener('click', deleteTheRecipe)
    outerDiv.append(deleteButton)

    const form = document.createElement('form')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Add a comment...')
    const submitButton = document.createElement('button')
    submitButton.setAttribute("type", "submit")
    submitButton.innerText = 'Post'
    form.append(input, submitButton)
    outerDiv.append(form)
    form.addEventListener('submit', postComment)
    const recipeId = recipe.id
    fetchComments(outerDiv, recipeId)
 
    // const body = document.querySelector('body')
    // body.append(outerDiv)

    
  

  }

  function deleteTheRecipe(event){
    const recipeId = event.target.parentElement.id
    console.log(recipeId)
    const parent = event.target.parentElement
    fetch(`${recipeUrl}/${recipeId}`,{
        method: 'DELETE'
    })     
    parent.remove()
  }

  function fetchComments(outerDiv, recipeId) {
      fetch(commentUrl)
      .then(response => response.json())
      .then(comments => {
          comments.forEach((comment) => showComment(comment, outerDiv, recipeId))
      })
  }

  function showComment(comment, outerDiv, recipeId) {
    const commentH5 = document.createElement('h5')
    if(comment.recipe_id === recipeId){
        commentH5.textContent = `${comment.user.username}: ${comment.content}`
        commentH5.dataset.id = comment.id
        const deleteComment = document.createElement('button')
        deleteComment.textContent = 'Delete'
        commentH5.append(deleteComment)
        deleteComment.addEventListener('click', deleteTheComment)
    }

    outerDiv.append(commentH5) 
  }

  function deleteTheComment(event){
    const commentId = event.target.parentElement.dataset.id
    const parent = event.target.parentElement
    fetch(`${commentUrl}/${commentId}`,{
        method: 'DELETE'
    })     
    parent.remove()
  }

  function postComment(event){
    const outerDiv = event.target.parentElement
    recipeId = outerDiv.id  
    event.preventDefault()
    const userInput = event.target[0].value
    const commentH5 = document.createElement('h5')
    commentH5.innerText = userInput
    const deleteComment = document.createElement('button')
    deleteComment.innerText = 'Delete'
    commentH5.append(deleteComment)
    deleteComment.addEventListener('click', deleteTheComment)
    outerDiv.append(commentH5)
    event.target[0].value = ''

    fetch(`${commentUrl}`,{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            content: userInput,
            user_id: 20,
            recipe_id: recipeId
        })
    })
}
