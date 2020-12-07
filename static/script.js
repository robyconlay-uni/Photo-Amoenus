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
                if((file.name.indexOf("jpg") != -1) || (file.name.indexOf("png") != -1)){
                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                } else {
                    txt = "Formato non supportato! Inserire solo file .jpg o .png";
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
    if(txt == "Formato non supportato! Inserire solo file .jpg o .png"){
        x.value = "";
    }
}

function addLocation(){
    var nameLoc = document.getElementById("nome").value;
    var addressLoc = document.getElementById("posizione").value;
    var descLoc = document.getElementById("descrizione").value;
    var imgLoc = document.getElementById("myFile");
    var catLoc = "";
    var likesLoc = 0;

    console.log(nameLoc);

    fetch('../locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { 
            name: nameLoc,
            address: addressLoc,
            description: descLoc,
            locationImage: imgLoc,
            category: catLoc,
            likes: likesLoc
        } ),
    })
    .then((resp) => {
        console.log(resp);
        //loadBooks();
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


function registration() {

    //get the form object
    var username = document.getElementById("regUser").value;
    var emailuser = document.getElementById("regEmail").value;
    var passworduser = document.getElementById("regPd").value;
    var password2 = document.getElementById("regPdConf").value;


    fetch('../user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { 
            user: username,
            email: emailuser,
            password: passworduser
        } ),
    })
    .then((resp) => resp.json())
    .then(function(data) {
        let mes = data.message;
        if (mes.localeCompare("User created") == 0) {
            document.write("<div id='center'><h1>Registrazione avvenuta con successo!</h1><br><a href='index.html'>Torna alla home</a></div>");
        } else if (mes.localeCompare("user already exist") == 0) {
            document.write("<div id='center'><h1>Utente già esistente!</h1><br><a href='registration.html'>Torna alla registrazione</a></div>");
        } else {
            document.write("<div id='center'><h1>Errore nella fase di registrazione!</h1><br><a href='registration.html'>Torna alla registrazione</a></div>");
        }
        console.log(mes);
    });
    
    

}