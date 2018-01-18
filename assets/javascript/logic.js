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

var newTrain;
var trainDb;
var database = firebase.database();

var userConnected=database.ref(".info/connected");
var newUser=database.ref().push().key;

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = $("#start-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  // var currentTime = firebase.database.ServerValue.TIMESTAMP;


  newTrain = {
    trainName: trainName,
    destination: destination,
    trainStart: trainStart,
    frequency: frequency,
    key:true,
    currentTime:firebase.database.ServerValue.TIMESTAMP
  };



  database.ref().push(newTrain);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().orderByKey().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().childtrainName;
  var destination = childSnapshot.val().destination;
  var trainStartDb = childSnapshot.val().trainStart;
  var tFrequency = childSnapshot.val().frequency;
  var keyDb = childSnapshot.key;
  var currentTime = childSnapshot.val().currentTime;
  console.log(currentTime);

  var trainStartConverted = moment(trainStartDb,"HH:mm A").subtract(1,"years");
  // console.log("converted : " + trainStartConverted);
  // var currentTimeConverted = moment(currentTime).format("HH:mm A");
  console.log("CURRENT TIME: "+ moment(currentTime).format("HH:mm A"));
  var diffTime = moment(currentTime).diff(moment(trainStartConverted),"minutes");
  console.log("DIFFERENCE IN TIME : "+diffTime);
  var tRemainder = diffTime % tFrequency;
  // console.log(tRemainder);
  var tMinutesTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN : " +tMinutesTrain);
  var nextTrain = moment().add(tMinutesTrain, "minutes");
  var arrivalTime =moment(nextTrain).format("HH:mm A");
  console.log("arrivalTime : "+arrivalTime);

  var newTr=$("<tr>");
  newTr.attr("id",keyDb);
  var nameTd = $("<td>").text(trainName);
  var destTd = $("<td>").text(destination);
  var freqTd = $("<td>").text(tFrequency);
  var arrivalTd=$("<td>").text(arrivalTime);
  var minutesTd=$("<td>").text(tMinutesTrain);
  newTr.append(nameTd,destTd,freqTd,arrivalTd,minutesTd);
  $("#schedule-table > tbody").append(newTr);
});
//
var number = 10;
var intervalId;
function run(){
  intervalId = setInterval(decrement,1000);
};
function decrement(){
  number --;
  if (number === 0){

    number =10;
    console.log("decrement is working");
database.ref().orderByKey().on("child_added",function(snapshot){
  var newTime = firebase.database.ServerValue.TIMESTAMP;
  keykey = snapshot.key;
  console.log("key : "+keykey);
  database.ref().child(keykey).update({currentTime:newTime});
  database.ref().child(keykey).on("value",function(childSnapshot){
    var trainStartDb = childSnapshot.val().trainStart;
    var tFrequency = childSnapshot.val().frequency;
    var currentTime = childSnapshot.val().currentTime;
    var trainStartConverted = moment(trainStartDb,"HH:mm A").subtract(1,"years");
    // console.log("converted : " + trainStartConverted);
    // var currentTimeConverted = moment(currentTime).format("HH:mm A");
    console.log("CURRENT TIME: "+ moment(currentTime).format("HH:mm A"));
    var diffTime = moment(currentTime).diff(moment(trainStartConverted),"minutes");
    console.log("DIFFERENCE IN TIME : "+diffTime);
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);
    var tMinutesTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN : " +tMinutesTrain);
    var nextTrain = moment().add(tMinutesTrain, "minutes");
    var arrivalTime =moment(nextTrain).format("HH:mm A");
    console.log("arrivalTime : "+arrivalTime);
  })

})
  // console.log(snap);
}
};
 run();
