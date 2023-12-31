let box = document.querySelector(".box");
let frontBtn = document.querySelector("#frontBtn");
let backBtn = document.querySelector("#backBtn");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let signBtn = document.querySelector("#signBtn");
let logBtn = document.querySelector("#logBtn");
let eEmail = document.querySelector("#eEmail");
let pPass = document.querySelector("#pPass");

let userList = [];

// ===== START SIGNIN =====

if (frontBtn) {
  frontBtn.addEventListener("click", function () {
    box.style.transform = "rotateY(-180deg)";
  });
}
if (backBtn) {
  backBtn.addEventListener("click", function () {
    box.style.transform = "rotateY(0)";
  });
}

if (signBtn) {
  signBtn.addEventListener("click", function () {
    if (validateUser() && validateEmail() && validatePassword()) {
      userList = JSON.parse(localStorage.getItem("users")) || [];
      let user = {
        name: username.value,
        mail: email.value,
        pass: pass.value,
      };

      let searchUser = userList.some(
        (user) => user.name === username.value || user.mail === email.value
      );

      if (searchUser) {
        username.classList.remove("is-valid");
        username.classList.add("is-invalid");
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
        pass.classList.remove("is=valid");
        pass.classList.add("invalid");
      } else {
        userList.push(user);
        localStorage.setItem("users", JSON.stringify(userList));
        clearInput();
        username.classList.remove("is-valid");
        email.classList.remove("is-valid");
        pass.classList.remove("is-valid");
      }
    } else {
      username.classList.add("is-invalid");
      email.classList.add("is-invalid");
      pass.classList.add("is-invalid");
    }
  });
}

function clearInput() {
  username.value = "";
  email.value = "";
  pass.value = "";
}

function validateUser() {
  let regex = /^[a-zA-Z0-9_-]{3,16}$/;
  if (regex.test(username.value)) {
    username.classList.remove("is-invalid");
    username.classList.add("is-valid");
    return true;
  } else {
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");
    return false;
  }
}

function validateEmail() {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(email.value)) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    return true;
  } else {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    return false;
  }
}

function validatePassword() {
  let regex = /\w{8,20}/gi;
  if (regex.test(pass.value)) {
    pass.classList.remove("is-invalid");
    pass.classList.add("is-valid");
    return true;
  } else {
    pass.classList.add("is-invalid");
    pass.classList.remove("is-valid");
    return false;
  }
}

if (username && email && pass) {
  username.addEventListener("input", validateUser);
  email.addEventListener("input", validateEmail);
  pass.addEventListener("input", validatePassword);
}

// ===== START LOGIN =====

if (localStorage.getItem("users") == null) {
  userList = [];
} else {
  userList = JSON.parse(localStorage.getItem("users"));
}

if (logBtn) {
  
  logBtn.addEventListener("click", () => {
    let cartona = ``;
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].mail == eEmail.value && userList[i].pass == pPass.value) {
        cartona = `
          <h2 id="welcome" class="text-light">Welcome ${userList[i].name}</h2>
        `;
        sessionStorage.setItem("username", JSON.stringify(cartona));
        location.href = "welcome.html";
      }
    }
  });
}
if (document.querySelector("#sayWelcome")) {
  document.querySelector("#sayWelcome").innerHTML = JSON.parse(
    sessionStorage.getItem("username")
  );
}
