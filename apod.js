'use strict'

const apiKEY = 'eDcGmc68SHznNH1e1w9QDxnEbcnu3x2JOJnINsa2';
const dataSelect = document.getElementById('start');
dataSelect.addEventListener('change', function () {
    const selectDate = this.value;


fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKEY}&date=${selectDate}`)
.then(response => { 
    return response.json()
})
.then(data => { 
    const apodIMG = document.querySelector('#apod-img');
    const apodText = document.querySelector('#apod-text');

    apodIMG.src = data.url;
    apodText.textContent = data.explanation;

    console.log(data);
})
.catch(error => { console.log(error)
})
});

const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    loadApodImage(todayISO);

    dataSelect.addEventListener('change', function () {
        const selectedDate = this.value;
        loadApodImage(selectedDate);
    });
 


