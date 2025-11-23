document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#year-now").textContent = new Date().getFullYear();
  document.querySelector("#page-update").textContent = `Last Updated: ${document.lastModified}`;

  const temples = [
    {
      templeName: "Salt Lake Temple",
      location: "Salt Lake City, Utah, USA",
      dedicated: "1893, April, 6",
      area: 382207,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Peru",
      location: "Lima, Peru",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
      templeName: "Rome Italy Temple",
      location: "Rome, Italy",
      dedicated: "2019, March, 10",
      area: 95000,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
    },
    {
      templeName: "Paris France Temple",
      location: "Paris, France",
      dedicated: "2017, May, 21",
      area: 72000,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
    }
  ];

  const main = document.querySelector("main");
  const heading = document.querySelector("#gallery-heading");

  function getYearFromDedicated(dedicatedStr) {
    const y = parseInt(dedicatedStr, 10);
    return Number.isFinite(y) ? y : null;
  }

  function clearTemples() {
    main.querySelectorAll("figure").forEach(f => f.remove());
  }

  function showTemples(list) {
    clearTemples();
    list.forEach(t => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = t.imageUrl;
      img.alt = `${t.templeName} — ${t.location}`;
      img.loading = "lazy";
      img.decoding = "async";

      const caption = document.createElement("figcaption");
      caption.innerHTML = `
        <strong>${t.templeName}</strong><br>
        ${t.location}<br>
        Dedicated: ${t.dedicated}<br>
        Area: ${t.area.toLocaleString()} sq ft
      `;

      figure.appendChild(img);
      figure.appendChild(caption);
      main.appendChild(figure);
    });
  }

  heading.textContent = "All Temples";
  showTemples(temples);

  // ⭐ UPDATED: Select <a> links instead of buttons
  const navLinks = document.querySelectorAll('#nav-menu a[data-filter]');

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // keep page from jumping

      const type = (link.dataset.filter || "home").toLowerCase();
      let filtered = temples;

      if (type === "old") {
        filtered = temples.filter(t => {
          const y = getYearFromDedicated(t.dedicated);
          return y !== null && y < 1900;
        });
      } else if (type === "new") {
        filtered = temples.filter(t => {
          const y = getYearFromDedicated(t.dedicated);
          return y !== null && y > 2000;
        });
      } else if (type === "large") {
        filtered = temples.filter(t => Number(t.area) > 90000);
      } else if (type === "small") {
        filtered = temples.filter(t => Number(t.area) < 10000);
      } else {
        filtered = temples;
      }

      heading.textContent = type === "home" ? "All Temples" : `${link.textContent} Temples`;
      showTemples(filtered);

      const navList = document.querySelector("#nav-menu ul");
      if (navList.classList.contains("show")) {
        navList.classList.remove("show");
        const menuBtn = document.getElementById("menu-button");
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Hamburger menu
  const menuButton = document.getElementById("menu-button");
  const navList = document.querySelector("#nav-menu ul");

  menuButton.addEventListener("click", () => {
    const isShown = navList.classList.toggle("show");
    menuButton.setAttribute("aria-expanded", isShown ? "true" : "false");
  });
});
