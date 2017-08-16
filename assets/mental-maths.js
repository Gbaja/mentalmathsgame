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
var maximum = 20;
var point = 0;
var questionsAnswered = 0;
var counter = 60;

btn.addEventListener("click", changeNumber);
 
//function inputKeyUp(e) {
//  var e.which = e.which || e.keyCode;
//    if(e.which == 13) {
//        // submit
//        changeNumber();
//    }
// }
$(document).ready(function(){
    $(document).bind('keypress',enterbtn);
});

function enterbtn(e){
    if(e.keyCode === 13){
      changeNumber()
    }
}


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
    var numberTwo = Math.floor(Math.random() * minimum);
    var randomSymbol = symbol[Math.floor(symbol.length*Math.random())] 
    
    if(numberOne > numberTwo){
        boxOne.innerHTML = numberOne;
        boxTwo.innerHTML = numberTwo;
    } else{
        boxOne.innerHTML = numberTwo;
        boxTwo.innerHTML = numberOne;
    }
    
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
            displayTimer.style.display = "none";
            displayQuiz.innerHTML = "Time up!";
//            var url = 'https://twitter.com/intent/tweet?text=' + point + "/" + questionsAnswered'
            displayScore.innerHTML += "<p> You went through " + questionsAnswered + " questions" + "<br>" +
                                    " scored " + point + " points. </p> <p> <a href='mailto:gbajaf@yahoo.co.uk?subject=My Mental Maths Quiz Score'> Email me </a> your score </p> <p><a class='twitter-share-button' href='https://twitter.com/intent/tweet?text=I went through "+ questionsAnswered + " question(s) and scored "+ point + " in a 60seconds mental maths game created by Fatimat Gbajabiamila. https://gbaja.github.io/mentalmathsgame/'>Tweet</a></p> <button id='playAgain' onclick='window.location.reload()'> Refresh </button>";
        }
    }

   startTime();
   displayQuiz.style.display = "block";
   startBtn.style.display = "none";
   changeNumber();
}