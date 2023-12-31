let display = document.querySelector("#display");


let cartona = JSON.parse(sessionStorage.getItem("username"));


display.innerHTML = cartona
