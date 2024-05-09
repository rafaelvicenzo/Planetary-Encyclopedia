'use strict'

document.getElementById('menu-button').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    var menuButton = document.getElementById('menu-button');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        menuButton.classList.remove('open');
    } else {
        menu.style.display = 'block';
        menuButton.classList.add('open');
    }
});
