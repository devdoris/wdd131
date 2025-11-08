document.querySelector("#year-now").textContent = new Date().getFullYear();
document.querySelector("#page-update").textContent = `Last Updated: ${document.lastModified}`;

const temples = [
  { name: "Salt Lake Temple", location: "Salt Lake City, Utah", year: 1893, img: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg" },
  { name: "Nauvoo Temple", location: "Nauvoo, Illinois", year: 2002, img: "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-illinois-temple/nauvoo-illinois-temple-50576-main.jpg" },
  { name: "Rome Italy Temple", location: "Rome, Italy", year: 2019, img: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg" },
  { name: "Aba Nigeria Temple", location: "Aba, Nigeria", year: 2005, img: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg" },
  { name: "Lima Peru Temple", location: "Lima, Peru", year: 1986, img: "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-12721-main.jpg" },
  { name: "Paris France Temple", location: "Paris, France", year: 2017, img: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg" }
];

const main = document.querySelector("main");
const heading = document.querySelector("main h1");


function showTemples(list) {
  main.querySelectorAll("figure").forEach(f => f.remove());
  list.forEach(t => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.src = t.img;
    img.alt = t.name;
    caption.innerHTML = `<strong>${t.name}</strong><br>${t.location} – ${t.year}`;

    figure.appendChild(img);
    figure.appendChild(caption);
    main.appendChild(figure);
  });
}


heading.textContent = "All Temples";
showTemples(temples);


document.querySelectorAll("nav li").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.textContent.toLowerCase();
    let filtered = temples;

    if (type === "old") filtered = temples.filter(t => t.year < 1900);
    if (type === "new") filtered = temples.filter(t => t.year > 2000);
    if (type === "large") filtered = temples.filter(t => ["Salt Lake Temple", "Rome Italy Temple"].includes(t.name));
    if (type === "small") filtered = temples.filter(t => ["Aba Nigeria Temple", "Lima Peru Temple"].includes(t.name));

    heading.textContent = type === "home" ? "All Temples" : `${btn.textContent} Temples`;
    showTemples(filtered);
  });
});
