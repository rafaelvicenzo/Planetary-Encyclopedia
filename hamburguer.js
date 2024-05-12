'use strict'

document.getElementById('menu-button').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('menu').classList.toggle('open');
    this.classList.toggle('open');
});
