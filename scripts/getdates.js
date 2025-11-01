// Put the current year in the footer
document.getElementById("year-now").textContent = new Date().getFullYear();

// Show the page's last update date
document.getElementById("page-update").textContent =
  "Last updated: " + document.lastModified;
