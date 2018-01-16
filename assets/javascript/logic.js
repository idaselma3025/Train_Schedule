// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBWQGz9ObICKGnNTMEjA2d5QzNtT9mTDOs",
    authDomain: "tran-bcef1.firebaseapp.com",
    databaseURL: "https://tran-bcef1.firebaseio.com",
    projectId: "tran-bcef1",
    storageBucket: "",
    messagingSenderId: "712145263328"
  };
  firebase.initializeApp(config);
  var updates = {};
  var newTrain;
  var database = firebase.database();

  var userConnected=database.ref(".info/connected");
  var newUser=database.ref().push().key;

  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    //
    // console.log(trainStart);
    var next = "place holder";

    // Creates local "temporary" object for holding employee data
    newTrain = {
      trainName: trainName,
      destination: destination,
      trainStart: trainStart,
      frequency: frequency,
      key:true
    };


updates["/trains/"+newUser]=newTrain;
return database.ref().update(updates);


    // Logs everything to console
    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.trainStart);
    // console.log(newTrain.frequency);
    // console.log(newTrain.next);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });


  var trainDb;
  var changeChild ={value:true
  };
  database.ref("trains").push(changeChild);
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref("trains").orderByKey().on("child_added", function(childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());

    // Store everything into a variable.
    trainDb = {
      trainName:childSnapshot.val().trainName,
      destination : childSnapshot.val().destination,
      trainStartDb : childSnapshot.val().trainStart,
      tFrequency : childSnapshot.val().frequency,
      keyDb:childSnapshot.key
    }// 3. Create Fireba


    // Employee Info
    // console.log(trainName);
    // console.log(destination);
    // console.log(trainStartDb);
    // console.log(tFrequency);

    //trainStart pushed back one year to make sure comes before current time
    var trainStartConverted = moment(trainDb.trainStartDb,"HH:mm A").subtract(1,"years");
    // console.log("converted : " + trainStartConverted);
    var currentTime = moment();
    // console.log("CURRENT TIME: "+ moment(currentTime).format("HH:mm A"));
    var diffTime = moment().diff(moment(trainDb.trainStartConverted),"minutes");
    // console.log("DIFFERENCE IN TIME : "+diffTime);
    var tRemainder = diffTime % trainDb.tFrequency;
    // console.log(tRemainder);
    var tMinutesTrain = trainDb.tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN : " +tMinutesTrain);
    var nextTrain = moment().add(tMinutesTrain, "minutes");
    var arrivalTime =moment(nextTrain).format("HH:mm A");



    // Add each train's data into the table
    $("#schedule-table > tbody").append("<tr><td>" + trainDb.trainName + "</td><td>" + trainDb.destination + "</td><td>" +
    trainDb.tFrequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTrain + "</td><td>"+trainDb.keyDb+"</td>");

  });
// var number = 10;
// var intervalId;
// function run(){
//   intervalId = setInterval(decrement,1000);
// };
// function decrement(){
//   number --;
//   if (number === 0){
//   number=10;
//   var updatedCurrent = moment();
//   console.log("CURRENT TIME: "+ moment(updatedCurrent).format("HH:mm A"));
//   //get existing info in db
//   //recalculate with new current time
//   //repost to existing
// }
//   };


// userConnected.on("value",function(snapshot){
//   console.log(snapshot.val());
//   if(snapshot.val()){
//     run();
//     console.log("userConnected is working");
//   }
// });
// console.log(number);
database.ref("trains").orderByChild("key").equalTo(true).on("child_changed",function(childSnapshot){
var snap = childSnapshot.val();
var key = childSnapshot.key;
    // var trainName = childSnapshot.val().trainName;
    // var destination = childSnapshot.val().destination;
    // var trainStartDb = childSnapshot.val().trainStart;
    // var tFrequency = childSnapshot.val().frequency;
    // var keyDb =childSnapshot.key

  console.log(snap);
  console.log(key);
})
