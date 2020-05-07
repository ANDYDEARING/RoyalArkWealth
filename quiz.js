//Heading
var headerTag = document.createElement("h1");
var headerText = document.createTextNode("Quiz");
headerTag.appendChild(headerText);
var quizArea = document.getElementsByTagName('quiz-area')[0];
quizArea.appendChild(headerTag);

//Question Area
var questionTag = document.createElement("p");
questionTag.innerText = "What is your time worth?";
quizArea.appendChild(questionTag);

//Answer Area
var answerAreaTag = document.createElement("div");
answerAreaTag.innerHTML= '<span>$ </span><input id="answer" type="number"></input><span> / Hour</span>';
quizArea.appendChild(answerAreaTag);

//Next Button
var buttonAreaTag = document.createElement("div");
buttonAreaTag.innerHTML = '<br><button onClick="next()">Next</button>';
quizArea.appendChild(buttonAreaTag);

function next(){
    console.log(document.getElementById("answer").value);
}