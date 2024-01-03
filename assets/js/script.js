function modeEdit() {
  if (localStorage.getItem("token")) {
    document.querySelector(".category").style.display = "none";
    const loginOut = document.querySelector(".loginout");
    loginOut.innerHTML = "";
    loginOut.textContent = "logout";
    loginOut.addEventListener("click", () => {
      localStorage.removeItem("token");
      document.location.href = "./login.html";
    });
    document.querySelector(".modif p").style.display = "block";
    document.querySelector(".edit").style.display = "flex";
    document.querySelector("header").style.marginTop = "100px";
  }
}

const modif = document.querySelector(".modifier");

modif.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".backgroud_modal").style.display = "block";
  document.querySelector(".gallery_modal").style.display = "flex";
});

document
  .querySelector(".gallery_modal .fa-xmark")
  .addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".backgroud_modal").style.display = "none";
    document.querySelector(".gallery_modal").style.display = "none";
  });

document
  .querySelector(".add_modal .fa-xmark")
  .addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".backgroud_modal").style.display = "none";
    document.querySelector(".add_modal").style.display = "none";
  });

document.querySelector(".add").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".backgroud_modal").style.display = "block";
  document.querySelector(".add_modal").style.display = "flex";
  document.querySelector(".gallery_modal").style.display = "none";
});

document.querySelector(".fa-arrow-left").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".backgroud_modal").style.display = "block";
  document.querySelector(".add_modal").style.display = "none";
  document.querySelector(".gallery_modal").style.display = "flex";
});

function showWorks(works) {
  const galerie = document.querySelector(".gallery");
  galerie.innerHTML = "";
  for (let work of works) {
    const figure = document.createElement("figure");
    figure.dataset.category = work.category.name;
    const image = document.createElement("img");
    image.alt = work.title;
    image.src = work.imageUrl;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(image);
    figure.appendChild(figcaption);
    galerie.appendChild(figure);
  }
}

function showWorksModal(works) {
  const galerie = document.querySelector(".photo_modal");
  galerie.innerHTML = "";
  for (let work of works) {
    const figure = document.createElement("figure");
    figure.dataset.category = work.category.name;
    const image = document.createElement("img");
    image.alt = work.title;
    image.src = work.imageUrl;
    const i = document.createElement("i");
    i.className = "fa-solid fa-trash-can";
    figure.appendChild(image);
    figure.appendChild(i);
    galerie.appendChild(figure);
  }
}

async function showCategory() {
  const allCategory = document.querySelector(".category");
  const selectCat = document.getElementById("category");
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      for (let category of categories) {
        const Li = document.createElement("li");
        Li.className = "category-btn";
        Li.dataset.id = category.name;
        Li.textContent = category.name;
        allCategory.appendChild(Li);
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectCat.appendChild(option);
      }
    });
}

function filterByCategory() {
  const works = document.querySelectorAll("[data-category]");
  const categories = document.getElementsByClassName("category-btn");
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", (e) => {
      for (let work of works) {
        if (categories[i].dataset.id === "Tous") {
          work.style.display = "block";
        } else if (work.dataset.category != categories[i].dataset.id) {
          work.style.display = "none";
        } else {
          work.style.display = "block";
        }
      }
    });
  }
}

async function AddImages() {
  const photo=document.getElementById("photo").files[0];
  console.log(photo);
  const title=document.getElementById("titre");
  const cat=document.getElementById("category");
  const token = localStorage.getItem("token");
  const form = document.querySelector(".add_modal form");
  console.log(token);
  const formData = new FormData();
  formData.append("image", photo);
  formData.append("title", title);
  formData.append("category", cat);
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Autorization: `Bearer ${token}`},
    body: formData,
  })
    .then((response) => response.json())
    .then((works) => {
      console.log(works);
    })
    .catch((error) => console.log(error));
}

function checkForm() {
  const check = document.querySelector(".valid");
  check.addEventListener("click", (e) => {
    e.preventDefault();
   AddImages();
  });
}

async function init() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      showWorks(works);
      showWorksModal(works);
    });
  await showCategory();
  filterByCategory();
  modeEdit();
  checkForm();
}
init();
