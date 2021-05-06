console.log('hello');

//--------------------------------------------- DECLARATION DES VARIABLES ---------------------------------------------

let myHeaders = new Headers();

let myInit = { method: 'POST',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

let inscriptionBtn = document.getElementById('inscription-button');


inscriptionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/users/signup', myInit)
        .then(response => {
            if (response.message == 'Utilisateur créé !') {
                RedirectionJavascript('./user.html');
            }
        })
})

function RedirectionJavascript(string) {
    window.location.href=string; 
  }
