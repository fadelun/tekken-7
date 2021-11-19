const showcase = document.getElementById("fighters-showcase");
const allCategory = document.querySelectorAll(".list-category .form-check");

fetch("fighterDetails.json")
  .then((results) => results.json())
  // .then((data) => {
  //   const male = data.fighters.filter((e) => e.gender == "male");
  //   console.log(male);
  // })
  // .then((data) => {
  //   const female = data.fighters.filter((e) => e.gender == "female");
  //   console.log(female);
  // });
  .then((data) => {
    const fighters = data.fighters;

    getFighters(fighters);
    getData(fighters);
  });

const getFighters = (fighters) => {
  let array = [];
  fighters.forEach((e) => {
    const firstName = e.name.split(" ")[0];
    array.push(firstName);
  });

  array.forEach((e, i) => {
    showcase.innerHTML += `<div class="col" data-aos="fade-up" data-aos-easing="ease-in-sine"
                                      data-aos-duration="400" data-aos-offset="-100" data-aos-delay="${50 * i}">
                <a href="./fighters/${e}.html">
                <figure class="figure position-relative">
                    <img src="../assets/fighters/${e.toLowerCase()}.png" class="figure-img img-fluid m-0" alt="${e}" />
                    <figcaption class="figure-caption  position-absolute bottom-0 start-0">${e}</figcaption>
                </figure>
                </a>

</div>`;
  });
};

const getData = (data) => {
  const figures = showcase.querySelectorAll("figure");

  allCategory.forEach((e) => {
    data.forEach((fighter, i) => {
      e.firstElementChild.addEventListener("click", () => {
        const firstName = fighter.name.split(" ")[0];

        // kategori ALL
        if (e.innerText.toUpperCase() == "ALL") {
          figures[i].classList.remove("muted");
          figures[i].parentNode.setAttribute("href", `./fighters/${firstName}.html`);
        }
        // kategori NON-HUMAN
        else if (e.innerText.toUpperCase() == "NON-HUMAN" && fighter.gender[1] == e.innerText.toLowerCase()) {
          figures[i].classList.remove("muted");
          figures[i].parentNode.setAttribute("href", `./fighters/${firstName}.html`);
        }
        // kategori MALE atau FEMALE, tergantung user klik
        else if (fighter.gender != e.innerText.toLowerCase()) {
          figures[i].classList.add("muted");
          figures[i].parentNode.removeAttribute("href");

          if (fighter.gender[0] == e.innerText.toLowerCase()) {
            figures[i].classList.remove("muted");
            figures[i].parentNode.setAttribute("href", `./fighters/${firstName}.html`);
          }
        } else {
          figures[i].classList.remove("muted");
          figures[i].parentNode.setAttribute("href", `./fighters/${firstName}.html`);
        }
      });
    });
  });
};
