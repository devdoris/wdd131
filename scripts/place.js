document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    "Last Modified: " + document.lastModified;

function calculateWindChill(tempC, windKmh) {
    if (tempC <= 10 && windKmh > 4.8) {
        let tempF = (tempC * 9/5) + 32;
        let windMph = windKmh * 0.621371;

        let wcF = 35.74 + (0.6215 * tempF) -
            (35.75 * Math.pow(windMph, 0.16)) +
            (0.4275 * tempF * Math.pow(windMph, 0.16));

        let wcC = (wcF - 32) * 5/9;

        return wcC.toFixed(1);
    } else {
        return "N/A";
    }
}


const temperature = 14;  
const wind = 12;

document.querySelector("#temperature").textContent = temperature;
document.querySelector("#wind").textContent = wind;

const windChillValue = calculateWindChill(temperature, wind);
document.querySelector("#windchill").textContent = windChillValue;
