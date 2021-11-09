const main = document.querySelector("main");
const section = document.querySelector(".fighters-list");
const description = document.querySelector(".description");
const fighterImage = document.querySelector(".full-body-fighter img");
const fighterName = description.querySelector(".personal-name");
const fighterInfo = description.lastElementChild;
// const del = window.location.pathname;

fetch("../src/fighterDetails.json")
  .then((results) => results.json())
  .then((data) => {
    const fighters = data.fighters;

    getfighters(fighters);
  });

const getfighters = (fighters) => {
  let array = [];
  let results = [];

  fighters.forEach((e) => {
    const firstName = e.name.split(" ")[0];
    array.push(firstName);
  });

  function generateNumbers() {
    return Math.floor(Math.random() * array.length);
  }

  function getResults() {
    for (let i = 0; i < 4; i++) {
      const random = generateNumbers();

      for (let j = 0; j < array.length; j++) {
        if (j == random) {
          results.push(array[j]);
        }
      }

      // mencari item untuk dimasukkan ke results
      // const filtered = array.filter((item, j) => j == random);
      // results.push(filtered);
    }
    console.log(results);
  }

  function cekResults() {
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < i; j++) {
        // let random = Math.floor(Math.random() * array.length);
        const random = generateNumbers();
        if (results[j] == results[i]) {
          const finded = array.find((item, index) => index == random);
          console.log(finded);
          results[j] = finded;
        }
      }
    }
    console.log(results);
  }
  getResults();
  cekResults();

  results.forEach((e) => {
    const generateCol = `<div class="col">
                                      <a href="./${e}.html" style="color: white">
                                      <figure class="figure position-relative">
                                          <img src="../../assets/fighters/${e}.png" class="figure-img img-fluid m-0" alt="${e}" />
                                          <figcaption class="figure-caption position-absolute bottom-0 start-0">${e}</figcaption>
                                      </figure>
                                      </a>
                                  </div>`;

    section.firstElementChild.innerHTML += generateCol;
  });

  getDataPerson(fighters, array);
};

const getDataPerson = (data, names) => {
  // get file name
  const url = window.location.pathname;
  const filename = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".")); // get name only without html format

  console.log(filename);

  data.forEach((e, i) => {
    if (e.name.split(" ")[0] == filename) {
      const infoPerson = e.info;
      const personName = e.name.split(" ");
      const findedName = personName.find((name) => name == names[i]);

      fighterName.innerHTML = e.name;
      fighterImage.src = `../assets/persons/${findedName}.png`;
      fighterImage.alt = findedName;
      description.firstElementChild.children[1].innerHTML = `AGE: ${e.age ? e.age : "UNKNOWN"}`;
      description.firstElementChild.children[2].innerHTML = `REGION: ${e.country ? e.country.toUpperCase() : "UNKNOWN"}`;

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
};
// masukan setiap array ke dalam number
//cek kembali apakah setiap index number memilki nilai yang sama

// const arr = [8, 5, 10, 18];
// const arr2 = [10, 2, 5, 2];
// let numbers = [];

// function getNumbers() {
//   for (let i = 0; i < arr2.length; i++) {
//     // masukan setiap array ke dalam number
//     numbers.push(arr2[i]);
//   }
//   console.log("numbers ", numbers);
// }

// //cek kembali apakah setiap index number memilki nilai yang sama
// function cekNumbers() {
//   for (let i = 0; i < numbers.length; i++) {
//     for (let j = 0; j < i; j++) {
//       function generateNumbers() {
//         return Math.floor(Math.random() * 20);
//       }

//       // jika sama ,ambil , lalu ganti dengan nilai yang lain
//       if (numbers[j] == numbers[i]) {
//         console.log(numbers[j]);
//         numbers[j] = generateNumbers();
//       }
//     }

//     //selesai jika setiap nilai pada index numbers berbeda, terima kasih
//   }
// }
// getNumbers();
// cekNumbers();

// // console.log(filtered);

// console.log("numbers ", numbers);
