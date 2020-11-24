//here goes the script for the html page

function login() {


    //use fetch function

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

}