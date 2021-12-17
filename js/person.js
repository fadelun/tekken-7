const main = document.querySelector("main");
const body = document.body;
const id = new URLSearchParams(window.location.search).get("id");

const generateMain = async () => {
  let url = "http://localhost:3000/fighters";

  const res = await fetch(url + "/" + id);
  const res_02 = await fetch(url);

  const data = await res.json();
  const allFighters = await res_02.json();

  const fighters = data;

  main.innerHTML = `<div class="container" style="max-width: 80vw">
 <div class="row">
   <div class="col d-none d-md-block">
     <figure class="full-body-fighter">
       <img src="" alt="" class="position-absolute" />
     </figure>
   </div>
   <div class="col col-md-6 position-relative">
     <div class="description">
       <header class="mb-5">
         <h1 class="personal-name fw-bold mb-0 text-uppercase">Akuma</h1>
         
         <h3 class="fw-bolder mb-0">
           <!-- age --> 
         </h3>
         <h3 class="fw-bold mb-0">
           <!-- region -->
         </h3>
        
       </header>

       <div class="info fw-light">
         <!-- <p></p> -->
         <!-- <p></p> -->
       </div>
     </div>
     <!-- fighters-list -->
     <section class="fighters-list position-absolute d-none d-md-block">
       <div class="row row-cols-2 justify-content-sm-end justify-content-start g-2">
         <!-- <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div> -->
       </div>
     </section>
   </div>
 </div>
</div>`;

  getDataPerson(fighters);
  getfighters(allFighters);
};

// function data person
const getDataPerson = (data) => {
  const description = document.querySelector(".description");
  const fighterImage = document.querySelector(".full-body-fighter img");
  const fighterName = description.querySelector(".personal-name");
  const fighterInfo = description.lastElementChild;
  const infoPerson = data.info;

  document.title += " | " + data.name;
  fighterName.innerHTML = data.name;
  fighterImage.src = `./assets/persons/${data.name.split(" ")[0].toLowerCase()}.png`;
  fighterImage.alt = data.name.split(" ")[0];
  description.firstElementChild.children[1].innerHTML = `AGE : ${data.age ? data.age : " Unknown"}`;
  description.firstElementChild.children[2].innerHTML = `REGION : ${data.country ? data.country.toUpperCase() : " Unknown"}`;

  setInterval(() => {
    if (window.innerWidth < 767) {
      main.style.backgroundImage = `url("./assets/persons/${data.name.split(" ")[0].toLowerCase()}.png"`;
    } else {
      main.style.backgroundImage = "";
    }
  }, 100);

  if (typeof infoPerson == "object") {
    infoPerson.map((info, i) => {
      const para = document.createElement("p"); //build tag <p>
      para.innerHTML = info; //write text in tag <p>
      fighterInfo.appendChild(para); //put tag <p> on class info
    });
  } else {
    fighterInfo.innerHTML = `<p>${infoPerson}</p>`;
  }
};

// function get fighters from json
const getfighters = (data) => {
  const section = document.querySelector(".fighters-list");

  let names = [];

  data.forEach((item) => {
    names.push({ name: item.name, id: item.id });
  });

  let results = [];

  function generateNumbers() {
    return Math.floor(Math.random() * names.length);
  }

  function getFightersList() {
    for (let i = 0; i < 4; i++) {
      const random = generateNumbers();

      for (let j = 0; j < names.length; j++) {
        if (j == random) {
          results.push(names[j]);
        }
      }
    }
    // console.log(results);
  }

  function cekResults() {
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < i; j++) {
        const random = generateNumbers();
        if (results[j] == results[i]) {
          const finded = names.find((item, index) => index == random);
          console.log(finded);
          results[j] = finded;
        }
      }
    }
    console.log(results);
  }
  getFightersList();
  cekResults();

  results.forEach((e) => {
    const generateCol = `<div class="col">
        <a href="./person.html?id=${e.id}" style="color: white">
        <figure class="figure position-relative">
            <img src="./assets/fighters/${e.name.split(" ")[0].toLowerCase()}.png" class="figure-img img-fluid m-0" alt="${e.name}" />
            <figcaption class="figure-caption position-absolute bottom-0 start-0">${e.name.split(" ")[0]}</figcaption>
        </figure>
        </a>
    </div>`;

    section.firstElementChild.innerHTML += generateCol;
  });
};

window.addEventListener("DOMContentLoaded", () => generateMain());
