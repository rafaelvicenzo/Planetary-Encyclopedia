'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    const eventsList = document.getElementById('events-list');


    fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
    .then(response => response.json())
    .then(data => {
        data.events.forEach(event => {
        if (event.geometries && event.geometries.length > 0) {
        const [lon, lat] = event.geometries[0].coordinates;
        let popupContent = `<b>${event.title}</b><br>${event.categories.length > 0 ? event.categories[0].title : 'N/A'}`;
        let marker;
        /*PERSONALIZED ICONS*/
        if (event.categories.some(cat => cat.title === 'Volcanoes')) {
            const volcanoIcon = L.icon({
                iconUrl: '/assets/img/icons/volcano.png',
                iconSize: [38, 38],
                iconAnchor: [19, 38],
                popupAnchor: [0, -38]
            });
            marker = L.marker([lat, lon], { icon: volcanoIcon });
        } else if (event.categories.some(cat => cat.title === 'Wildfires')) {
            const wildfireIcon = L.icon({
                iconUrl: '/assets/img/icons/campfire.png',
                iconSize: [38, 38],
                iconAnchor: [19, 38],
                popupAnchor: [0, -38]
            });
            marker = L.marker([lat, lon], { icon: wildfireIcon }).addTo(map)
            .bindPopup(popupContent, {zIndex: 1000})
            .openPopup();
        } else if (event.categories.some(cat => cat.title === 'Sea and Lake Ice')) {
            const iceberg = L.icon({
                iconUrl: '/assets/img/icons/iceberg.png',
                iconSize: [38, 38],
                iconAnchor: [19, 38],
                popupAnchor: [0, -38]
            });
            marker = L.marker([lat, lon], { icon: iceberg }).addTo(map)
            .bindPopup(popupContent, {zIndex: 1000})
            .openPopup();
        } else {
            marker = L.marker([lat, lon]);
        }

        marker.addTo(map)
            .bindPopup(popupContent, { zIndex: 1000 })
            .openPopup();
    }
});
})
.catch(error => {
console.error('Error getting data from API:', error);
});
});
