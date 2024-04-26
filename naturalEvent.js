'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    const eventsList = document.getElementById('events-list');
})