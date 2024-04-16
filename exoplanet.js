'use strict';

/* API KEY eDcGmc68SHznNH1e1w9QDxnEbcnu3x2JOJnINsa2 */

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

function populateCardGroup(exoplanets) {
    const cardGroup = document.getElementsByClassName('card-group')[0];

    if (!cardGroup) {
        console.error('Element with class "card-group" not found.');
        return;
    }

    exoplanets.forEach(exoplanet => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${exoplanet.name}</h5>
            <p class="card-text">Radius: ${exoplanet.radius !== null ? exoplanet.radius + ' Earth radii' : 'Unknown'}</p>
            <p class="card-text">Orbital Period: ${exoplanet.period !== null ? exoplanet.period + ' Earth days' : 'Unknown'}</p>
            <p class="card-text">Disposition: ${exoplanet.disposition !== null ? exoplanet.disposition : 'Unknown'}</p>
            <p class="card-text">Surface Temperature: ${exoplanet.temperature !== null ? exoplanet.temperature + ' Kelvin' : 'Unknown'}</p>
        </div>
        `;

        cardGroup.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const baseURL = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?';
    const table = 'cumulative';
    const whereClause = "koi_disposition like 'CANDIDATE' and koi_period>300 and koi_prad<2";
    const orderBy = 'koi_period';
    const format = 'ascii';
    const queryURL = `${baseURL}table=${table}&where=${encodeURIComponent(whereClause)}&order=${orderBy}&format=${format}`;

    console.log(queryURL);

    fetch(queryURL)
    .then(response => response.text())
    .then(data => {
        const exoplanets = parseExoplanets(data);
        populateCardGroup(exoplanets);
    })
    .catch(error => {
        console.error('Error getting data from Exoplanet Archive:', error);
    });
});
