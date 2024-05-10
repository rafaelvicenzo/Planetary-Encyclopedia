'use strict'

document.getElementById('menu-button').addEventListener('click', function(event) {
    event.stopPropagation(); // Evita que o evento de clique propague para o documento
    document.getElementById('menu').classList.toggle('open');
    this.classList.toggle('open');
});
