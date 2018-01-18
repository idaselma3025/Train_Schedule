
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
  var trainDb;

  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    newTrain = {
      trainName: trainName,
      destination: destination,
      trainStart: trainStart,
      frequency: frequency,
      key:true
    };

database.ref().push(newTrain);


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

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainStartDb = childSnapshot.val().trainStart;
    var tFrequency = childSnapshot.val().frequency;
    var keyDb = childSnapshot.key;



    // Employee Info
    // console.log(trainName);
    // console.log(destination);
    // console.log(trainStartDb);
    // console.log(tFrequency);

    //trainStart pushed back one year to make sure comes before current time
    var trainStartConverted = moment(trainStartDb,"HH:mm A").subtract(1,"years");
    // console.log("converted : " + trainStartConverted);
    var currentTime = moment();
    // console.log("CURRENT TIME: "+ moment(currentTime).format("HH:mm A"));
    var diffTime = moment().diff(moment(trainStartConverted),"minutes");
    // console.log("DIFFERENCE IN TIME : "+diffTime);
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);
    var tMinutesTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN : " +tMinutesTrain);
    var nextTrain = moment().add(tMinutesTrain, "minutes");
    var arrivalTime =moment(nextTrain).format("h:mm a");



    // Add each train's data into the table
    var newTr=$("<tr>");
    newTr.attr("id",keyDb);
    var nameTd = $("<td>").text(trainName);
    var destTd = $("<td>").text(destination);
    var freqTd = $("<td>").text(tFrequency);
    var arrivalTd=$("<td>").text(arrivalTime);
    var minutesTd=$("<td>").text(tMinutesTrain);
    var removeBtn =$("<button>").attr("data-key",keyDb);
    removeBtn.addClass("remove");
    newTr.append(nameTd,destTd,freqTd,arrivalTd,minutesTd, removeBtn);
    $("#schedule-table > tbody").append(newTr);
  });
var number = 60;
var intervalId;
function run(){
  intervalId = setInterval(decrement,1000);
};
function decrement(){
  number --;
  if (number === 0){
  $("tbody").empty();
  number=60;
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainStartDb = childSnapshot.val().trainStart;
    var tFrequency = childSnapshot.val().frequency;
    var keyDb = childSnapshot.key;



    // Employee Info
    // console.log(trainName);
    // console.log(destination);
    // console.log(trainStartDb);
    // console.log(tFrequency);

    //trainStart pushed back one year to make sure comes before current time
    var trainStartConverted = moment(trainStartDb,"HH:mm A").subtract(1,"years");
    // console.log("converted : " + trainStartConverted);
    var currentTime = moment();
    // console.log("CURRENT TIME: "+ moment(currentTime).format("HH:mm A"));
    var diffTime = moment().diff(moment(trainStartConverted),"minutes");
    // console.log("DIFFERENCE IN TIME : "+diffTime);
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);
    var tMinutesTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN : " +tMinutesTrain);
    var nextTrain = moment().add(tMinutesTrain, "minutes");
    var arrivalTime =moment(nextTrain).format("h:mm a");



    // Add each train's data into the table
    var newTr=$("<tr>");
    newTr.attr("id",keyDb);
    var nameTd = $("<td>").text(trainName);
    var destTd = $("<td>").text(destination);
    var freqTd = $("<td>").text(tFrequency);
    var arrivalTd=$("<td>").text(arrivalTime);
    var minutesTd=$("<td>").text(tMinutesTrain);
    var removeBtn =$("<button>").attr("data-key",keyDb);
    removeBtn.addClass("remove");
    newTr.append(nameTd,destTd,freqTd,arrivalTd,minutesTd, removeBtn);
    $("#schedule-table > tbody").append(newTr);
  });;

}
};
run();

$(document).on("click",".remove",function(e) {
    var key = $(e.target).data("key");
  var tr =  document.getElementById(key);
  tr.remove();
    console.log(key);
    var updates ={};
    var removeData ={};
    database.ref().on("child_added",function(snapshot){
      var snap = snapshot.key;
      console.log(snap);
      if (key == snap){
        console.log("working");
        updates[snap]=removeData;
        return database.ref().update(updates);
      }
    })

})

  // ==keyDb){
  //     console.log("working");
//   // }
// })
// });
