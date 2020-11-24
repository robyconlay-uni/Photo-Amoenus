//here goes the script for the html page
function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if((file.name.indexOf("jpg") != -1) || (file.name.indexOf("png") != -1) || (file.name.indexOf("jpeg") != -1)){
                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                } else {
                    txt = "Formato non supportato! Inserire solo file .jpg, .jpeg o .png";
                }
            }
        }
    } else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("demo").innerHTML = txt;
    if(txt == "Formato non supportato! Inserire solo file .jpg, .jpeg o .png"){
        x.value = "";
    }
}

function addLocation(){
    
    //Importo inserimenti da form HTML
    var nameLoc = document.getElementById("nome").value;
    var addressLoc = document.getElementById("posizione").value;
    var cityLoc = document.getElementById("città").value;
    var descLoc = document.getElementById("descrizione").value;
    var imgLoc = document.getElementById("myFile").files[0];
    var catLoc = document.getElementById("categoria").value;
    var likesLoc = 0;

    //Creo un oggetto FormData e ci aggiungo i parametri chiave-valore
    const formData = new FormData();
    formData.append('name', nameLoc);
    formData.append('address', addressLoc);
    formData.append('city', cityLoc);
    formData.append('description', descLoc);
    formData.append('locationImage', imgLoc);
    formData.append('category', catLoc);

    fetch('../locations', { //Se non specificato header creato da browser, in questo caso form-data
        method: 'POST',
        body: formData  //passo il form-data
    })
    .then((resp) => {
        console.log(resp);
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

}


function registration() {

    //get the form object
    var username = document.getElementById("regUser").value;
    var emailuser = document.getElementById("regEmail").value;
    var passworduser = document.getElementById("regPd").value;
    var password2 = document.getElementById("regPdConf").value;


    fetch('../lib/user/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { 
            user: username,
            email: emailuser,
            password: passworduser
        } ),
    })

};

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
            span.innerHTML = `<a href="${location._id}">${location.name}</a>`;
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