
document.addEventListener("DOMContentLoaded", () => {

  /* Affichage montant don onclick*/
  const boutons = document.querySelectorAll(".montant-btn");
  const inputMontant = document.getElementById("montant-libre");

  if (boutons.length && inputMontant) {
    boutons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const montant = btn.getAttribute("data-montant");
        inputMontant.value = montant;
      });
    });
  }

  /*CAROUSEL RECETTES*/

  const carouselContent = document.getElementById("carousel-content");
  const cards = document.getElementsByClassName("slide");
  const leftButton = document.getElementById("g");
  const rightButton = document.getElementById("d");

  if (carouselContent && cards.length && leftButton && rightButton) {
    let currentIndex = 0;
    const gap = 20;

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth;
      const offset = currentIndex * (cardWidth + gap);
      carouselContent.style.transform = `translateX(${-offset}px)`;
    }

    leftButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });

    rightButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    });

    updateCarousel();
  }

  /* form don */
  const coordForm = document.querySelector(".column-coordonnees form");
  const virementBtn = document.getElementById("virement");
  const carteBtn = document.getElementById("carte");

  function verifierChampsCoordonnees(event) {
    if (!coordForm) return;

    const inputs = coordForm.querySelectorAll("input, select");
    let tousRemplis = true;

    inputs.forEach((input) => {
      if (input.type !== "checkbox" && input.id !== "complement" && input.value.trim() === "") {
        tousRemplis = false;
      }
    });

    if (!tousRemplis) {
      event.preventDefault();
      alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
    } else {
      alert("Merci pour votre don ! Votre soutien est précieux.");
    }
  }

  if (virementBtn) virementBtn.addEventListener("click", verifierChampsCoordonnees);
  if (carteBtn) carteBtn.addEventListener("click", verifierChampsCoordonnees);

  /* Menu de la semaine*/
  const weeklyMenus = [
    {
      week: 21,
      event: "Vesak – Fête bouddhiste (Asie)",
      title: "Pad Thaï Végétarien",
      image: "../img/padthai.png",
      history: "Le Pad Thaï est devenu populaire dans les années 1930 en Thaïlande...",
      reason: "Choisi cette semaine pour célébrer le Vesak...",
      recipe: `
        <ul>
          <li>Nouilles de riz</li>
          <li>Tofu grillé</li>
          <li>Oeufs (facultatif)</li>
          <li>Cacahuètes, soja, citron vert</li>
          <li>Sauce tamarin et sucre de palme</li>
        </ul>
        <p>Faites tremper les nouilles, faites sauter le tofu, ajoutez les sauces...</p>
      `,
    },
    {
      week: 22,
      event: "Semaine de l'Afrique",
      title: "Yassa au poulet (Sénégal)",
      image: "../img/yassa.heic",
      history: "Plat traditionnel sénégalais...",
      reason: "Choisi pour célébrer la richesse culinaire de l’Afrique...",
      recipe: `
        <ul>
          <li>Cuisses de poulet</li>
          <li>Oignons, citron, moutarde</li>
          <li>Riz blanc</li>
        </ul>
        <p>Mariner le poulet, le griller, cuire les oignons...</p>
      `,
    },
  ];

  function getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - start) / (24 * 60 * 60 * 1000));
    return Math.ceil((now.getDay() + 1 + days) / 7);
  }

  function showRecipe() {
    const week = getWeekNumber();
    const recipe = weeklyMenus.find((r) => r.week === week);
    const container = document.getElementById("recipe-container");
    const eventName = document.getElementById("event-name");

    if (!container || !eventName) return;

    if (!recipe) {
      container.innerHTML = `<p>Aucune recette prévue pour cette semaine. Revenez bientôt !</p>`;
      return;
    }

    eventName.innerText = `Événement : ${recipe.event}`;
    container.innerHTML = `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <div class="recipe-content">
          <h2>${recipe.title}</h2>
          <p><strong>Pourquoi cette recette ?</strong> ${recipe.reason}</p>
          <p><strong>Son histoire :</strong> ${recipe.history}</p>
          <button onclick="toggleRecipe()">Voir la recette</button>
          <div class="recipe-details" id="recipe-details" style="display:none;">
            ${recipe.recipe}
          </div>
        </div>
      </div>
    `;
  }

  window.toggleRecipe = function () {
    const details = document.getElementById("recipe-details");
    if (details) {
      details.style.display =
        details.style.display === "none" || details.style.display === "" ? "block" : "none";
    }
  };

  showRecipe();

  /* Barre de recherche*/
  const champRecherche = document.getElementById("barreRecherche");

  champRecherche.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      cherchePays();
    }
  });
});

function cherchePays() {
  let saisie = document.getElementById("barreRecherche").value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const liensPays = {
    "nigeria": "nigeria.html",
    "tunisie": "tunisie.html",
    "colombie": "colombie.html",
    "chine": "chine.html",
    "cameroun": "cameroun.html",
    "australie": "australie.html",
    "argentine": "argentine.html",
    "bresil": "bresil.html",
    "republique du cameroun": "cameroun.html"
  };

  if (liensPays[saisie]) {
    window.location.href = liensPays[saisie];
  } else {
    alert("Pays non trouvé. Essaie avec un nom exact !");
  }
}
