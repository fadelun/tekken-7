// buat teks main dulu
// generate semua informasi fighters seperti nama,umur,dan deskripsi
// generate fighters list max 4 fighters secara acak
const main = document.querySelector("main");
const body = document.body;

const generateMain = () => {
  fetch("../fighterDetails.json")
    .then((results) => results.json())
    .then((data) => {
      const fighters = data.fighters;

      getDataPerson(fighters);
    })
    .catch((err) => {
      console.log("not found", err);
    });

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
};

generateMain();

const section = document.querySelector(".fighters-list");
const description = document.querySelector(".description");
const fighterImage = document.querySelector(".full-body-fighter img");
const fighterName = description.querySelector(".personal-name");
const fighterInfo = description.lastElementChild;

// function data person
const getDataPerson = (data) => {
  let names = [];

  data.forEach((e) => {
    const firstName = e.name.split(" ")[0];
    names.push(firstName);
  });

  // get file name
  const url = window.location.pathname;
  const filename = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".")); // get name only without html format

  // console.log(filename);
  // console.log(url);

  data.forEach((e, i) => {
    if (e.name.split(" ")[0] == filename) {
      console.log(filename);

      const infoPerson = e.info;
      const personName = e.name.split(" ");
      const findedName = personName.find((name) => name == names[i]);

      document.title += " | " + e.name;
      fighterName.innerHTML = e.name;
      fighterImage.src = `../../assets/persons/${findedName.toLowerCase()}.png`;
      fighterImage.alt = findedName;
      description.firstElementChild.children[1].innerHTML = `AGE : ${e.age ? e.age : " Unknown"}`;
      description.firstElementChild.children[2].innerHTML = `REGION : ${e.country ? e.country.toUpperCase() : " Unknown"}`;

      setInterval(() => {
        if (window.innerWidth < 767) {
          main.style.backgroundImage = `url("../../assets/persons/${findedName}.png"`;
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
    }
  });

  getfighters(names);
};

// function get fighters from json
const getfighters = (names) => {
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
    console.log(results);
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
                                        <a href="./${e}.html" style="color: white">
                                        <figure class="figure position-relative">
                                            <img src="../../assets/fighters/${e.toLowerCase()}.png" class="figure-img img-fluid m-0" alt="${e}" />
                                            <figcaption class="figure-caption position-absolute bottom-0 start-0">${e}</figcaption>
                                        </figure>
                                        </a>
                                    </div>`;

    section.firstElementChild.innerHTML += generateCol;
  });
};

// const fruits = ["apple", "banana"];

// function getFruits() {
//   console.log(fruits);
// }

// const test = getFruits;

// console.log(test());
