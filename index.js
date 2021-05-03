console.log(`It's Working !!!`);

// for effects
AOS.init();

const API_KEY = "at_pOcNiOF4d3DcBQwrnEe3SR2sNenG3";

const dataIp = document.querySelector("#data-ip");
const dataLocReg = document.querySelector("#data-loc-reg");
const dataTimeZone = document.querySelector("#data-timezone");
const dataIsp = document.querySelector("#data-isp");
const buttonSubmit = document.querySelector("#send");

const inputIP = document.querySelector("#text-input");

const loder = () => {
  dataIp.innerHTML = '<img src="images/giphy.gif" height="92" />';
  dataLocReg.innerHTML = '<img src="images/giphy.gif" height="92" />';
  dataTimeZone.innerHTML = '<img src="images/giphy.gif" height="92" />';
  dataIsp.innerHTML = '<img src="images/giphy.gif" height="92" />';
};

const fetchUrl = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.ip) {
        dataIp.textContent = data.ip;
        dataLocReg.textContent = `${data.location.region} ${data.location.postalCode}`;
        dataTimeZone.textContent = data.location.timezone;
        dataISP = dataIsp.textContent = data.isp;

        // MAP CARTE
        mapboxgl.accessToken =
          "pk.eyJ1IjoibWpkaW9wMTAiLCJhIjoiY2tobmM2c3J6MHBjYTMxcm5kaGM1anAxciJ9.47xvhDL_Q8h8F826PqFTWw";

        let map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          zoom: 11,
          center: [data.location.lng, data.location.lat],
        });

        let marker = new mapboxgl.Marker({
          color: "#FF2c2c2",
        })
          .setLngLat([data.location.lng, data.location.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<h2>${data.location.region} ${data.location.country} !</h2>`
            )
          )
          .addTo(map);
        // marker.togglePopup();

        if (dataISP.length > 15) {
          dataIsp.style.fontSize = "16px";
        }
      } else {
        document
          .querySelector("#text-error")
          .classList.replace("none", "block");
        dataIp.textContent = "";
        dataLocReg.textContent = "";
        dataTimeZone.textContent = "";
        dataIsp.textContent = "";
      }

      if (data.ip === undefined) {
        inputIP.value = "";
      } else {
        inputIP.value = data.ip;
        document
          .querySelector("#text-error")
          .classList.replace("block", "none");
      }
    });
};

buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  loder();

  if (inputIP.value === null) {
    URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${defaultIP}`;

    fetchUrl();
  } else {
    ipAdress = inputIP.value;
    URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ipAdress}`;

    fetchUrl();
  }
});

window.addEventListener("load", buttonSubmit.click());
