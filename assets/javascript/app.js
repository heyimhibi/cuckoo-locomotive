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
var trainData = firebase.database();

//==============================================================//

$("#submitButton").on("click", function userSubmit(event) {
    event.preventDefault();
    console.log ("click");
    var newTrip = {
        trainName: $("#trainName").val().trim(),
        destination: $("#destination").val().trim(),
        trainTime: $("#trainTime").val().trim(),
        frequency: $("#trainFrequency").val().trim(),
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    if (
        newTrip.trainName === "" ||
        newTrip.destination === "" ||
        newTrip.trainTime === "" ||
        newTrip.frequency === ""
        
    ){
        alert("Please complete all the fields!");
    } else{
        trainData.ref().push(newTrip);
        $("#trainName, #destination, #trainTime, #frequency", "#dateAdded").val("");
        console.log(newTrip);
    }

});

trainData.ref().on("child_added", function(childSnapshot) {
   

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
   

    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log("first train time" + firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mmA"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainDisplay = nextTrain.format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainDisplay),
        $("<td>").text(tMinutesTillTrain),

      );
    
      // Append the new row to the table
      $("#trainTable > tbody").append(newRow);
});
