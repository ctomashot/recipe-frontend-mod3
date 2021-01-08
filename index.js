

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

const userUrl = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", function () {
  fetchUsers();
});

function fetchUsers() {
   fetch(userUrl)
     .then((response) => response.json())
     .then((users) => {
       users.forEach((user) => showRecipe(user));
     });
}
