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
            console.log("Data received:", data);
            const trimmedData = removeBibcodes(data);
            displayObjectInfo(trimmedData, searchInput);
            aladin.gotoObject(searchInput);
        })
        .catch(error => {
            console.error("Error occurred:", error);
            displayError('An error occurred while searching for the object. Please try again later.');
        });
}

function removeBibcodes(data) {
    const bibcodesRegex = /Bibcodes\s+\d+-\d+\s+\(\)\s+\(\d+\):\s*([\s\S]*?)(?=\n\n|$)/g;
    const trimmedData = data.replace(bibcodesRegex, '');
    return trimmedData;
}

function displayObjectInfo(data, searchInput) { 
    const infoDiv = document.createElement('div');
    const trimmedData = removeBibcodes(data);
    infoDiv.innerHTML = `<pre>${trimmedData}</pre>`;
    const objectInfoContainer = document.getElementById('object-info');
    if (objectInfoContainer) {
        objectInfoContainer.innerHTML = '';
        let aladin;
        A.init.then(() => {
            aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:1});
            aladin.gotoObject(searchInput);
        });     

        objectInfoContainer.appendChild(infoDiv);
        objectInfoContainer.appendChild(aladin);
    } else {
        displayError('Object info container not found.');
    }
}

function displayError(message) {
    console.error(message);
}

function isMobileDevice() {
    return window.matchMedia("only screen and (max-width: 767px)").matches;
}

function displayMobileAlert() {
    const isMobile = isMobileDevice();
    if (isMobile) {
        const confirmed = confirm('You are accessing this website from a mobile device. Do you want to access Sinbad Mobile?');
        if (confirmed) {
            window.location.href = 'https://simbad.u-strasbg.fr/mobile/';
        }
    }
}

window.onload = displayMobileAlert;

