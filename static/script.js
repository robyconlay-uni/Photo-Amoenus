//here goes the script for the html page

function loadLocations() {

    const ul = document.getElementById("locations"); 
    ul.innerHTML = '';

    fetch('../locations')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        
        // console.log(data);
        
        return data.map(function(location) { // Map through the results and for each run the code below
                   
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.innerHTML = `<a href="${location.id}">${location.name}</a>`;
            span.innerHTML += `<button type="button" onclick="openLocation('${location._id}')">Visualizza luogo</button>`
            
            // Append all our elements
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here
    
}

function openLocation(idLocation){
    window.open("localhost:8000/locations/"+idLocation);
}