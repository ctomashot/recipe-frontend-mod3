recipeUrl = "http://localhost:3000/recipes"
commentUrl = "http://localhost:3000/comments"


document.addEventListener("DOMContentLoaded", function(){
    fetchRecipes()
    newRecipeForm()
  })
  
  function fetchRecipes (){
    fetch(recipeUrl)
    .then(response => response.json())
    .then(recipecs => {
      recipecs.forEach((recipe) => showRecipe(recipe))
    })
  }

  function newRecipeForm(){
    const body = document.querySelector('body')
    const form = document.createElement('form')
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
    const veganInput = document.createElement('input')
    veganInput.setAttribute('type', 'text')
    veganInput.setAttribute('placeholder', 'Vegan true or false?')
    const veggieInput = document.createElement('input')
    veggieInput.setAttribute('type', 'text')
    veggieInput.setAttribute('placeholder', 'Vegetarian true or false?')
    const submitButton = document.createElement('button')
    submitButton.setAttribute("type", "submit")
    submitButton.innerText = 'Post'
    form.append(nameInput, contentInput, ingredientsInput, imageInput, veganInput, veggieInput, submitButton)
    body.append(form)
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
        vegan.innerText = "Vegan"
        outerDiv.append(vegan)
    }

    if (recipe.vegetarian === true){
        const vegetarian = document.createElement('h4')
        vegetarian.innerText = "Vegetarian"
        outerDiv.append(vegetarian)
    }
 
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
 
    const body = document.querySelector('body')
    body.append(outerDiv)
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