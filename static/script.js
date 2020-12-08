//here goes the script for the html page

/**
 * Gestisce l'aggiunta di un file(immagine)
 */
function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                var file = x.files[i];
                if((file.name.indexOf("jpg") != -1) || (file.name.indexOf("png") != -1) || (file.name.indexOf("jpeg") != -1) || (file.name.indexOf("JPG") != -1)){

                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                } else {
                    txt = "Formato non supportato! Inserire solo file .jpg, .jpeg o .png o .JPG";
                }
            }
        }
    } else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
        }
    }
    document.getElementById("demo").innerHTML = txt;

    if(txt == "Formato non supportato! Inserire solo file .jpg, .jpeg o .png o .JPG"){
        x.value = "";
    }
}


/**
 * Aggiunge una location
 */
function addLocation(){
    
    //Importo inserimenti da form HTML
    var nameLoc = document.getElementById("nome").value;
    var addressLoc = document.getElementById("posizione").value;
    var cityLoc = document.getElementById("città").value;
    var descLoc = document.getElementById("descrizione").value;
    var catLoc = document.getElementById("categoria").value;
    var raggiungibilitaLoc = Array.from(document.getElementById("ragg").selectedOptions).map(el=>el.value);
    var imgLoc = document.getElementById("myFile").files[0];
    var photoDescLoc = document.getElementById("photoDescription").value;
    var oraLoc = document.getElementById("orario").value;
    var dataLoc = document.getElementById("data").value;
    var likesLoc = 0;

    //Creo un oggetto FormData e ci aggiungo i parametri chiave-valore
    const formData = new FormData();
    formData.append('name', nameLoc);
    formData.append('address', addressLoc);
    formData.append('city', cityLoc);
    formData.append('description', descLoc);
    formData.append('category', catLoc);
    formData.append('raggiungibilita', raggiungibilitaLoc);
    formData.append('locationImage', imgLoc);
    formData.append('photoDesc', photoDescLoc);
    formData.append('hour', oraLoc);
    formData.append('date', dataLoc);

    fetch('../locations', { //Se non specificato header creato da browser, in questo caso form-data
        method: 'POST',
        body: formData  //passo il form-data
    })
    .then((resp) => {
        console.log(resp);
        window.open('addDone.html', '_self');
        return;
    })
    .catch(error => console.error(error)); // If there is any error you will catch them here

}



/**
 * Carica l'elenco completo delle locations
 */
function loadLocations() {
    var url ='../locations?';

    //FILTRI E ORDINAMENTO messi come parametri nel URL
    var order = document.getElementById("ordine").value;
    var category = document.getElementById("categoria").value;
    var city = document.getElementById("citta").value;
    var raggiungibilita = document.getElementById("raggiung").value;
    if(order != "null"){
        url = url + "order=" + order;
    }
    if(category != "null"){
        if(order != "null"){ url = url + "&";}
        url = url + "category=" + category;
    }
    if(city!= "null"){
        if(order != "null" || category != "null"){ url = url + "&";}
        url = url + "city=" + city;
    }
    if(raggiungibilita != "null"){
        if(order != "null" || category!= "null" || city!= "null"){ url = url + "&";}
        url = url + "raggiungibilita=" + raggiungibilita;
    }
    console.log(url);

    const div = document.getElementById("locations");
    div.innerHTML = '';

    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            // console.log(data);

            return data.locations.map(function (location) { // Map through the results and for each run the code below

                let div2 = document.createElement('div');
                div2.className = "loc";
                //div2.addEventListener('click', window.open(`location.html?id=${location._id}`));
                div2.innerHTML = `<a href="location.html?id=${location._id}">${location.name}</a>`;
                div.appendChild(div2);
            })
        })
        .catch(error => console.error(error));// If there is any error you will catch them here
}

function loadLocation(url_string) {
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    fetch('../locations/' + id)
        .then(res => res.json())
        .then(data => {
            document.getElementById("name").innerHTML = data.location.name;
            document.getElementById("address").innerHTML = data.location.address;
            document.getElementById("city").innerHTML = data.location.city;
            document.getElementById("description").innerHTML = data.location.description;
            document.getElementById("category").innerHTML = data.location.category;
            document.getElementById("raggiungibilita").innerHTML = data.location.raggiungibilita;
            document.getElementById("locationImage").innerHTML = "null";
            document.getElementById("photoDesc").innerHTML = data.location.photoDesc;
            document.getElementById("hour").innerHTML = data.location.hour;
            document.getElementById("date").innerHTML = data.location.date;
            document.getElementById("likes").innerHTML = data.location.likes;
        })
        .catch(err => {
            console.log(err);
        });
}

async function upvote(url_string) {
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    var upvotes = 1;
    await fetch('../locations/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.location.likes) {
                upvotes = data.location.likes + 1;
            } else {
                upvotes = 1;
            }
            document.getElementById('likes').innerHTML = upvotes;
        });

    fetch('../locations/' + id, {
        headers: {
            "Content-type": 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify([{
            propName: "likes",
            value: upvotes
        }])
    })
        .then(res =>
            res.json()
        )
        .then(res => {
            console.log(res);
            document.getElementById("likeButton").disabled = true;
        })
        .catch(err => {
            console.log(err);
        });
}


function registration() {

    //get the form object
    var user_name = document.getElementById("regUser").value;
    var emailuser = document.getElementById("regEmail").value;
    var passworduser = document.getElementById("regPd").value;
    var password2 = document.getElementById("regPdConf").value;


    fetch('../user/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: user_name,
            email: emailuser,
            password: passworduser
        }),
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

function Popup() {
    var stili = "top=200, left=300, width=400, height=250, status=no, menubar=no, toolbar=no scrollbars=no";
    var testo = window.open("", "", stili);
    
    testo.document.write("<html>");
    testo.document.write(" <head>");
    testo.document.write(" <title>Report</title>");
    testo.document.write(" <basefont size=2 face=Tahoma>");
    testo.document.write(" </head>");
    testo.document.write("<body topmargin=50>");
    testo.document.write("<div align=center>Report this picture for:</div>");
    testo.document.write("<form action='Report()' name='report'>");
    testo.document.write("<input type='radio' id='1' name='reports' value='uno'>");
    testo.document.write("<label>Inappropriate picture</label><br>");
    testo.document.write("<input type='radio' id='2' name='reports' value='due'>");
    testo.document.write("<label>Misinformation about the place</label><br>");
    testo.document.write("<input type='radio' id='3' name='reports' value='tre'>");
    testo.document.write("<label>Violation of privacy</label><br><br>");
    testo.document.write("<input type='submit' value='Submit'>");
    testo.document.write("</form>");
    testo.document.write("</body>");
    testo.document.write("</html>");
    }
    
    function Report() {
        var choice;
        /*
        if (document.getElementById('1').checked) {
            choice = document.getElementById('1').value
            console.log('1');
        } else if (document.getElementById('2').checked) {
            choice = document.getElementById('2').value
        } else if (document.getElementById('3').checked) {
            choice = document.getElementById('3').value
        } */
    
    var radios = document.getElementsByName('reports');
    
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
     
        choice = radios[i].value;
    
        break;
      }
    }
        console.log(choice);
        fetch('../user/registration?report=' + choice);
    }
