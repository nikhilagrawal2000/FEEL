firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    if(firebase.auth().currentUser != null){

      window.location.assign("https://narendrakpatel.github.io/FEEL/pdfselect.html");

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "block";
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}