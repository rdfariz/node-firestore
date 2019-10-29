var firebase = require('firebase')

const config = {
    apiKey: "AIzaSyBydnKgiJ3Eas3q4MlnJHukYCSBZxkskZM",
    authDomain: "quickstart-1561852140985.firebaseapp.com",
    databaseURL: "https://quickstart-1561852140985.firebaseio.com",
    projectId: "quickstart-1561852140985",
    storageBucket: "quickstart-1561852140985.appspot.com",
    messagingSenderId: "107477508845",
    appId: "1:107477508845:web:539dc5ad612559ed6122e4",
    measurementId: "G-1TN2N8Y27E"
}

var fire = firebase.initializeApp(config)
module.exports = fire