'use strict';

function searchObject() {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://simbad.cds.unistra.fr/simbad/sim-id?output.format=ASCII&Ident=${encodeURIComponent(searchInput)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/plain')) {
                return response.text();
            } else {
                throw new Error('Unexpected response format');
            }
        })
        .then(data => {
            const trimmedData = removeBibcodes(data);
            displayObjectInfo(trimmedData);
        })
        .catch(error => {
            displayError('An error occurred while searching for the object. Please try again later.');
        });
}

function removeBibcodes(data) {
    const bibcodesRegex = /bibcode:\s*\d{4}[A-Za-z0-9\.\-\+]+\s*/g;
    const trimmedData = data.replace(bibcodesRegex, '');
    return trimmedData;
}

function displayObjectInfo(data) {
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `<pre>${data}</pre>`;
    const objectInfoContainer = document.getElementById('object-info');
    if (objectInfoContainer) {
        objectInfoContainer.innerHTML = '';
        objectInfoContainer.appendChild(infoDiv);
    } else {
        displayError('Object info container not found.');
    }
}

function displayError(message) {
    console.error(message);
    alert(message);
}
