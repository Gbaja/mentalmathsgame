var boxOne = document.getElementById("boxOne");
var boxTwo = document.getElementById("boxTwo");
var btn = document.getElementById("btn");
var answerBox = document.getElementById("answer");
var mathSymbol = document.getElementById("sign");
var displayTimer = document.getElementById("counter");
var startBtn = document.getElementById("start");
var displayQuiz = document.getElementById("question");
var displayScore = document.getElementById("displayScore");
var instructions = document.getElementById("instructions");

var symbol = ["+", "x", "-"];
var minimum = 10;
var maximum = 25;
var point = 0;
var questionsAnswered = 0;
var counter = 10;

btn.addEventListener("click", changeNumber);

function changeNumber(){
    // increment questions attempted
    questionsAnswered++;


    // get expected answer
    var expectedAnswer = getExpectedAnswer(
        mathSymbol.innerHTML,
        parseInt(boxOne.innerHTML, 10),
        parseInt(boxTwo.innerHTML, 10)
    );


    var actualAnswer = parseInt(answerBox.value, 10);

    // check if expected answer is the same as value inputed and if so increment point
    if(expectedAnswer == actualAnswer){
        point++;

    }

    // change the values for a new set
    var numberOne = Math.floor(Math.random() * maximum);
        boxOne.innerHTML = numberOne;
    var numberTwo = Math.floor(Math.random() * minimum)
        boxTwo.innerHTML = numberTwo;
    var randomSymbol = symbol[Math.floor(symbol.length*Math.random())] 
        mathSymbol.innerHTML = randomSymbol;  

    answerBox.value = "";
}

function getExpectedAnswer(randomSymbol, numberOne, numberTwo){
    if(randomSymbol == "+"){
        return numberOne + numberTwo;
    } 

    if(randomSymbol == "-"){
        return numberOne - numberTwo;
    }

    if(randomSymbol == "x"){
        return numberOne * numberTwo;
    } 
}

function countdown(){
    instructions.style.display = "none";
    displayTimer.style.display = "block";
    function startTime(){
        counter--;
        displayTimer.innerHTML = counter + " seconds ";
        if(counter > 0){
            var t = setTimeout(startTime, 1000)
        } 
        else {
            clearTimeout(t);
            btn.style.pointerEvents = "none";
            displayQuiz.innerHTML = "Time up!";
            displayScore.innerHTML += "<p> You went through " + questionsAnswered + " questions" + "<br>" +
                                    " scored " + point + " points. </p><button id='playAgain' onclick='window.location.reload()'> Refresh </button>";
        }
    }

   startTime();
   displayQuiz.style.display = "block";
   startBtn.style.display = "none";
   changeNumber();
}