var numberTurns = 5, createdTime, reactionTime, counter, currentFastest = 1000000000, userName, fb = new Firebase("https://austin2to5cerner2015.firebaseio.com//users");

function showFirstHand() {
  counter += 1;
  document.getElementById("startButton").disabled = true;
  setTimeout(function(){
    document.getElementById("austin").style.cssText = "background-image: url(firsthand.png);background-repeat: no-repeat;height: 55px;width: 55px;display: block;position: relative;top: " + (Math.random() * 300).toString() + "px; left: " + (Math.random() * 500).toString() + "px;";
    createdTime = Date.now();
  },(Math.random() * 3000));
}

function startPlay() {
  counter = reactionTime = document.getElementById("thisRound").innerHTML = 0;
  showFirstHand();
}

document.getElementById("austin").onclick = function() {
  reactionTime += (Date.now() - createdTime) / 1000;
  this.style.display = "none";
  if (counter < numberTurns) {
    showFirstHand();
  } else {
    document.getElementById("thisRound").innerHTML = (reactionTime/numberTurns);
    if ((reactionTime/numberTurns) < currentFastest) currentFastest = document.getElementById("currentFastest").innerHTML = (reactionTime/numberTurns);
    fb.child(userName).update({fastestTime: currentFastest});
    document.getElementById("startButton").disabled = false;
  }
}

fb.child(document.getElementById("userName").innerHTML = userName = prompt("What is your name?")).once('value', function(snapshot) {
  if (snapshot.val() !== null) {
    currentFastest = document.getElementById("currentFastest").innerHTML = snapshot.val().fastestTime;
  } else {
    fb.child(userName).set({fastestTime: currentFastest});
  }
});
