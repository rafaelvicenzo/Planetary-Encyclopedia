'use strict';

let map; 
let markersByCategory = {};

function addMarkers(map, data) {
    data.events.forEach(event => {
        if (event.geometries && event.geometries.length > 0) {
            const [lon, lat] = event.geometries[0].coordinates;
            let popupContent = `<b>${event.title}</b><br>${event.categories.length > 0 ? event.categories[0].title : 'N/A'}<br>${event.geometries[0].date}`;
            let marker;

            if (event.categories.some(cat => cat.title === 'Volcanoes')) {
                const volcanoIcon = L.icon({
                    iconUrl: '/assets/img/icons/volcano.png',
                    iconSize: [38, 38],
                    iconAnchor: [19, 38],
                    popupAnchor: [0, -38]
                });
                marker = L.marker([lat, lon], { icon: volcanoIcon, category: 'volcanoes' });
            } else if (event.categories.some(cat => cat.title === 'Wildfires')) {
                const wildfireIcon = L.icon({
                    iconUrl: '/assets/img/icons/campfire.png',
                    iconSize: [38, 38],
                    iconAnchor: [19, 38],
                    popupAnchor: [0, -38]
                });
                marker = L.marker([lat, lon], { icon: wildfireIcon, category: 'wildfires' });
            } else if (event.categories.some(cat => cat.title === 'Sea and Lake Ice')) {
                const iceberg = L.icon({
                    iconUrl: '/assets/img/icons/iceberg.png',
                    iconSize: [38, 38],
                    iconAnchor: [19, 38],
                    popupAnchor: [0, -38]
                });
                marker = L.marker([lat, lon], { icon: iceberg, category: 'icebergs' });
            } else {
                marker = L.marker([lat, lon], { category: 'other' });
            }

            marker.bindPopup(popupContent, { zIndex: 1000 });

            if (marker.options.category) {
                if (!markersByCategory[marker.options.category]) {
                    markersByCategory[marker.options.category] = [];
                }
                markersByCategory[marker.options.category].push(marker);
            }

            marker.addTo(map);
        }
    });
}
    

document.addEventListener('DOMContentLoaded', function () {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    document.getElementById('loading-spinner').style.display = 'block';
    const southWest = L.latLng(-90, -180);
    const northEast = L.latLng(90, 180);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);

    fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
    .then(response => response.json())
    .then(data => {
        addMarkers(map, data);
        createLegend(map);
        document.getElementById('loading-spinner').style.display = 'none';
    })
    .catch(error => {
        console.error('Error getting data from API:', error);
        document.getElementById('loading-spinner').style.display = 'none';
    });
});

function createLegend(map) {
    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
        <form id="legend-form">
            <input type="checkbox" id="wildfires" name="category" value="wildfires">
            <label for="wildfires"><img src="/assets/img/icons/campfire16x.png">Wildfires</label><br>
            <input type="checkbox" id="volcanoes" name="category" value="volcanoes">
            <label for="volcanoes"><img src="/assets/img/icons/volcano16x.png">Volcanoes</label><br>
            <input type="checkbox" id="icebergs" name="category" value="icebergs">
            <label for="icebergs"><img src="/assets/img/icons/iceberg16x.png">Icebergs</label><br>
        </form>
        `;

        const checkboxes = div.querySelectorAll('input[name="category"]');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                filterMarkers();
            });
        });

        return div;
    };

    legend.addTo(map);
}

function filterMarkers() {
    console.log("Filtering markers...");
    const checkboxes = document.querySelectorAll('input[name="category"]');
    checkboxes.forEach((checkbox) => {
        const category = checkbox.value;
        console.log("Checkbox value:", category);
        const markers = markersByCategory[category];
        console.log("Markers:", markers);
        if (markers) {
            if (checkbox.checked) {
                markers.forEach(marker => {
                    marker.addTo(map);
                });
            } else {
                markers.forEach(marker => {
                    map.removeLayer(marker);
                });
            }
        }
    });
}
