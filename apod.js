'use strict'

fetch('https://api.nasa.gov/planetary/apod?api_key=eDcGmc68SHznNH1e1w9QDxnEbcnu3x2JOJnINsa2')
.then(response => { 
    return response.json()
})
.then(data => { 
    console.log(data);
})
.catch(error => { console.log(error)
});
