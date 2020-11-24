//here goes the script for the html page
function myFunction() {
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                var file = x.files[i];
                if ((file.name.indexOf("jpg") != -1) || (file.name.indexOf("png") != -1)) {
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
            txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
        }
    }
    document.getElementById("demo").innerHTML = txt;
    if (txt == "Formato non supportato! Inserire solo file .jpg o .png") {
        x.value = "";
    }
}

function addLocation() {
    var nameLoc = document.getElementById("nome").value;
    var addressLoc = document.getElementById("posizione").value;
    var descLoc = document.getElementById("descrizione").value;
    var imgLoc = document.getElementById("myFile");
    var catLoc = "";
    var likesLoc = 0;

    console.log(nameLoc);

    fetch('../locations', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: nameLoc,
            address: addressLoc,
            description: descLoc,
            locationImage: imgLoc,
            category: catLoc,
            likes: likesLoc
        }),
    })
        .then((resp) => {
            console.log(resp);
            //loadBooks();
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};

function loadLocations() {

    const ul = document.getElementById("locations");
    ul.innerHTML = '';

    fetch('../locations')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            // console.log(data);

            return data.map(function (location) { // Map through the results and for each run the code below

                let li = document.createElement('li');
                let span = document.createElement('span');
                span.innerHTML = `<a href="${location._id}">${location.name}</a>`;
                span.innerHTML += `<form action="location/id?${location._id}">`;
                span.innerHTML += `<button type="submit">Visualizza luogo</button>`;
                span.innerHTML += `</form>`;

                // Append all our elements
                li.appendChild(span);
                ul.appendChild(li);
            })
        })
        .catch(error => console.error(error));// If there is any error you will catch them here

}


function loadLocation(id) {
    fetch('../locations/' + id)
        .then(res => res.json())
        .then(data => {
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("address").innerHTML = data.address;
            document.getElementById("city").innerHTML = data.city;
            document.getElementById("description").innerHTML = data.description;
            document.getElementById("locationImage").innerHTML = data.locationImage;
            document.getElementById("category").innerHTML = data.category;
            document.getElementById("likes").innerHTML = data.likes;
        });
}

function upvote() {

    var upvotes = 0;
    fetch('../locations/' + id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.likes) {
                upvotes = data.likes + 1;
            } else {
                upvotes = 1;
            }
            document.getElementById('upvotes').value = upvotes;
        });

    //console.log('chiamata ad upvote');
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

        })
        .catch(err => {
            console.log(err);
            //show error for upvoting
        });
}