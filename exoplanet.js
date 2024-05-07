'use strict';

/* API KEY eDcGmc68SHznNH1e1w9QDxnEbcnu3x2JOJnINsa2 */

let exoplanets = [];
let currentPage = 1;
const cardsPerPage = 10;

function parseExoplanets(data) {
    if (!data) {
        return [];
    }
    const lines = data.trim().split('\n');

    return lines.map(line => {
        const values = line.trim().split(/\s+/).filter(val => val !== '');
        if (values.length !== 50) {
            return null;
        }
        const name = values[1] !== 'null' ? values[1] : null;
        const radius = parseFloat(values[23]);
        const period = parseFloat(values[11]);
        const disposition = values[3];
        const temperature = parseFloat(values[37]);

        return {
            name: name,
            radius: isNaN(radius) ? null : radius,
            period: isNaN(period) ? null : period,
            disposition: disposition,
            temperature: isNaN(temperature) ? null : temperature
        };
    }).filter(exoplanet => exoplanet !== null);
}

function populateCardGroup() {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const displayedExoplanets = exoplanets.slice(startIndex, endIndex);

    const cardGroup = document.getElementsByClassName('card-group')[0];
    cardGroup.innerHTML = '';

    if (!cardGroup) {
        console.error('Element with class "card-group" not found.');
        return;
    }

    displayedExoplanets.forEach(exoplanet => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="card-body">
            <img src="/assets/img/MIT-No-Atmosphere-01-PRESS.jpg" alt="" style="height:100px;">
            <h5 class="card-title">${exoplanet.name}</h5>
            <p class="card-text">Radius: ${exoplanet.radius !== null ? exoplanet.radius + ' Earth radius' : 'Unknown'}</p>
            <p class="card-text">Orbital Period: ${exoplanet.period !== null ? exoplanet.period + ' Earth days' : 'Unknown'}</p>
            <p class="card-text">Disposition: ${exoplanet.disposition !== null ? exoplanet.disposition : 'Unknown'}</p>
            <p class="card-text">Surface Temperature: ${exoplanet.temperature !== null ? (exoplanet.temperature - 273.15).toFixed(2) + ' Celsius' : 'Unknown'}</p>
        </div>
        `;

        cardGroup.appendChild(card);
    });

    renderPaginationButtons();
}

function goToPage(page) {
    currentPage = page;
    populateCardGroup();
}

function renderPaginationButtons() {
    const paginationContainer = document.getElementsByClassName('pagination')[0];
    if (!paginationContainer) {
        console.error('Element with class "pagination" not found.');
        return;
    }

    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(exoplanets.length / cardsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => goToPage(i));
        paginationContainer.appendChild(button);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const baseURL = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?';
    const table = 'cumulative';
    const whereClause = "koi_disposition like 'CANDIDATE' and koi_period>300 and koi_prad<2";
    const orderBy = 'koi_period';
    const format = 'ascii';
    const queryURL = `${baseURL}table=${table}&where=${encodeURIComponent(whereClause)}&order=${orderBy}&format=${format}`;
    const loadingOverlay = document.querySelector('.loading-overlay');
    const content = document.querySelector('.content');

    loadingOverlay.style.display = 'flex';

    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        content.style.display = 'block';

        populateCardGroup();
    }, 2000)

    console.log(queryURL);

    fetch(queryURL)
    .then(response => response.text())
    .then(data => {
        exoplanets = parseExoplanets(data);
        populateCardGroup();
    })
    .catch(error => {
        console.error('Error getting data from Exoplanet Archive:', error);
    });
});

