'use strict'

const planetInfo = {
    'img1': {
        'title': 'EARTH',
        'galaxy': 'Milky Way',
        'diameter': '12.742 km',
        'dayLength': '24 Earth hours',
        'avgTemperature': '15°C',
        'climate': 'Equatorial'
    },
    'img2' : {
        'title': 'WASP 18B',
        'galaxy': 'Milky Way',
        'diameter': '158.140 km',
        'dayLength': '23 Earth hours',
        'avgTemperature': '2,700°C',
        'climate': 'Extreme Temperature'
    },
    'img3' : {
        'title': 'KLEPER 22B',
        'galaxy': 'Milky Way',
        'diameter': '30.581 km',
        'dayLength': '6960 Earth hours',
        'avgTemperature': '22°C',
        'climate': 'Tropical'
    },
    'img4': {
        'title': 'KLEPER 11E',
        'galaxy': 'Milky Way',
        'diameter': '57.594 km',
        'dayLength': '744 Earth hours',
        'avgTemperature': '43 °C',
        'climate': 'Equatorial'
    }
};

function updatePlanetInfo(imageId) {
    const info = planetInfo[imageId];
    if (info) {
        document.querySelector('.planetTitle').innerHTML = info.title;
        document.querySelector('.info1').innerHTML = info.galaxy;
        document.querySelector('.info2').innerHTML = info.diameter;
        document.querySelector('.info3').innerHTML = info.dayLength;
        document.querySelector('.info4').innerHTML = info.avgTemperature;
        document.querySelector('.info5').innerHTML = info.climate;
    }
}

const planetTitle = document.querySelector('.planetTitle');
document.getElementById("right").addEventListener("click", function() {
    const currentImage = document.querySelector('.activated');
    const nextImage = currentImage.nextElementSibling;

    if (nextImage && nextImage.tagName === 'IMG') {
        currentImage.classList.remove('activated');
        currentImage.classList.add('noActivated');
        nextImage.classList.remove('noActivated');
        nextImage.classList.add('activated');
    }

    updatePlanetInfo(nextImage.id);
}
);

document.getElementById("left").addEventListener("click", function() {
    const currentImage = document.querySelector('.activated');
    const previousImage = currentImage.previousElementSibling;

    if (previousImage && previousImage.tagName === 'IMG') {
        currentImage.classList.remove('activated');
        currentImage.classList.add('noActivated');
        previousImage.classList.remove('noActivated');
        previousImage.classList.add('activated');
    } 

    updatePlanetInfo(previousImage.id);
    }
);

