document.querySelector("#year-now").textContent = new Date().getFullYear();

document.querySelector("#page-update").textContent =
    `Last Updated: ${document.lastModified}`;
