import firebase from 'firebase'
import { socket } from './api';

const config = {
    apiKey: process.env.REACT_APP_FIRE_KEY,
    authDomain: "githelpers.firebaseapp.com",
    databaseURL: "https://githelpers.firebaseio.com",
    projectId: "githelpers",
    storageBucket: "",
    messagingSenderId: "1005405342008"
}
firebase.initializeApp(config)

export const fbLogin = function() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ... save the token, etc.
        // console.log(user, token);
        console.log(JSON.stringify(user));

        const guestName = result.user.displayName || 'Guest';
        const eventName = `${guestName.split()[0]} just logged in.`;

        socket.emit('action', { name: eventName, time: Date.now() }, (data) => {
            console.log('action ack', data);
        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        var credential = error.credential;
        
        console.error(errorCode, errorMessage, credential, email);
    });
}

export const ref = firebase.database().ref()
export const provider = new firebase.auth.FacebookAuthProvider();
export const firebaseAuth = firebase.auth