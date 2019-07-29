var firebaseConfig = {
    apiKey: "AIzaSyDZM2CpAhpFkmK6it52iRy9eZiVefn3uLM",
    authDomain: "jjjj-c500d.firebaseapp.com",
    databaseURL: "https://jjjj-c500d.firebaseio.com",
    projectId: "jjjj-c500d",
    storageBucket: "jjjj-c500d.appspot.com",
    messagingSenderId: "363925363756",
    appId: "1:363925363756:web:4c5eaaab1893108d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $('#submit').on('click',function(event){
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency =$("#frequency").val().trim();

    var newTrain={
        trainName: trainName,
        destination:destination,
        trainTime:trainTime,
        frequency:frequency
    };

    database.ref().push(newTrain);

  });


  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().trainTime;
    //var today = new Date(new Date.getYear);
    var hrs = parseInt(trainTime.split(":")[0]);
    var mins= parseInt(trainTime.split(":")[1]);
   console.log("hrs "+hrs);
   console.log("mins "+mins);
   var time = moment(hrs+':'+mins,"HH:mm");
   console.log(time.format("HH:mm"));
   var val=findNextTime(time,frequency);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(val.nextTime),
      $("<td>").text(val.MinutesRemain)
      
    );
  
    // Append the new row to the table
    $("#train").append(newRow);
  });


  function findNextTime(time,frequency){
    /*var dt = new Date();
    //dt.setHours(20);
    //dt.setMinutes(0);
    var currTime = moment(dt.getHours()+':'+dt.getMinutes(),"HH:mm");
    console.log(time.hour(),currTime.hour());
    
    while(currTime.hour()!=time.hour()){
      time.add(parseInt(frequency),'m');
      console.log(time.format("HH:mm"));
    }
    if(currTime.isAfter(time)){
      time.add(parseInt(frequency),'m');
     console.log(time.format("HH:mm"));
    }
    if(time.minutes()<currTime.minutes()){
      time.add(parseInt(frequency),'m');
      console.log(time.format("HH:mm"));
      var remMin = moment.duration(time.diff(currTime),'minutes');
      //var remMin = duration.asMinutes();
      return {"NextArrival":time.format("HH:mm"),"timeRemain":remMin};
      
    }
    else{
      console.log(time.format("HH:mm"));
      var remMin = moment.duration(time.diff(currTime),'minutes');
     // var remMin = duration.asMinutes();
      return {"NextArrival":time.format("HH:mm"),"timeRemain":remMin};
      
      
    }
    

    console.log(time.minutes()-currTime.minutes());*/

    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log("TIME CONVERTED: " + firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemaining = diffTime % frequency;
    console.log(timeRemaining);

    var minTilTrain = frequency - timeRemaining;
    console.log("MINUTES TILL TRAIN: " + minTilTrain);

    var nextTrain = moment().add(minTilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    return {"nextTime":moment(nextTrain).format("HH:mm"),"MinutesRemain":minTilTrain};


   

  }