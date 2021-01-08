const userUrl = "//localhost:3000/users";
http: document.addEventListener("DOMContentLoaded", function () {
  createFormListener();
});

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

function createFormListener() {
  const loginForm = document.querySelector(".input-group");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newUser = {
      name: event.target["name"].value,
    };

    const userObj = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
  });
}
