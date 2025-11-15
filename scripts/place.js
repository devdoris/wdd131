// Current year
const yearEl = document.querySelector("#currentyear");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Last modified date
const modifiedEl = document.querySelector("#lastModified");
if (modifiedEl) {
    modifiedEl.textContent = "Last Modified: " + document.lastModified;
}

// Wind Chill Calculator (Celsius + km/h)
function calculateWindChill(tempC, windKmh) {
    const valid = tempC <= 10 && windKmh > 4.8;
    if (!valid) return "N/A";

    const tempF = (tempC * 9/5) + 32;
    const windMph = windKmh * 0.621371;

    const wcF = 35.74 +
                (0.6215 * tempF) -
                (35.75 * Math.pow(windMph, 0.16)) +
                (0.4275 * tempF * Math.pow(windMph, 0.16));

    const wcC = (wcF - 32) * 5/9;
    return wcC.toFixed(1);
}

// Demo weather values
const temperature = 14;
const wind = 12;

// Update page values
const tempEl = document.querySelector("#temperature");
const windEl = document.querySelector("#wind");
const chillEl = document.querySelector("#windchill");

if (tempEl) tempEl.textContent = temperature;
if (windEl) windEl.textContent = wind;

if (chillEl) {
    chillEl.textContent = calculateWindChill(temperature, wind);
}
