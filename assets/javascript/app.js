var config = {
    apiKey: "AIzaSyBtk0Dnu7McvIZ0MP6Z9aSN5rLd5wj-tdk",
    authDomain: "cuckoolocomotive.firebaseapp.com",
    databaseURL: "https://cuckoolocomotive.firebaseio.com",
    projectId: "cuckoolocomotive",
    storageBucket: "cuckoolocomotive.appspot.com",
    messagingSenderId: "86278184646",
    appId: "1:86278184646:web:bfccdf5eec8b195f"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

//==============================================================//

$("#submitButton").on("click", userSubmit);

//==============================================================//

function userSubmit(event) {
    event.preventDefault();
    console.log("click");
    var newTrip = {
        trainName: $("#trainName").val().trim(),
        destination: $("#destination").val().trim(),
        trainTime: $("#trainTime").val().trim(),
        frequency: $("#trainFrequency").val().trim()
    }
    $("#add-train").on("click", function() {
        event.preventDefault();
        // Storing and receiving new train data
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#trainTime").val().trim();
        frequency = $("#trainFrequency").val().trim();
    });

    if (
        newTrip.trainName === "" ||
        newTrip.destination === "" ||
        newTrip.trainTime === "" ||
        newTrip.frequency === ""
    ){
        alert("Please complete all the fields!");
    } else{
        database.ref().push(newTrip);
        $("#trainName, #destination, #trainTime, #frequency").val("");
    };


}
