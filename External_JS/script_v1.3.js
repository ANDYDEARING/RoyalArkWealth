//create the quiz element
var div = document.createElement("div");
div.setAttribute("id","quiz-area");
div.style.marginLeft = "75px";
var contentArea = document.getElementsByClassName("content-wrapper")[0];
contentArea.appendChild(div);

//Heading
var headerTag = document.createElement("h1");
var headerText = document.createTextNode("Quiz");
headerTag.appendChild(headerText);
var quizArea = document.getElementById('quiz-area');
quizArea.appendChild(headerTag);
var answerList = [];
var FINAL_QUESTION = 3;

var questionIndex = 0;
var questionList = [

    "<p>What is your time worth?</p>"+
    '<div><span>$ </span><input id="answer" type="number"></input><span> / Hour</span></div>'+
    '<div><br><button onClick="next()">Next</button></div>',

    "<p>What is the total size of your investment portfolio?</p>"+
    '<div><span>$ </span><input id="answer" type="number"></input></div>'+
    '<div><br><button onClick="next()">Next</button></div>',

    "<p>What is your approximate Net Worth?</p>"+
    '<div><span>$ </span><input id="answer" type="number"></input></div>'+
    '<div><br><button onClick="next()">Next</button></div>'
];

var question = document.createElement("div");
question.innerHTML = questionList[questionIndex];
quizArea.appendChild(question);

function next(){
    answerList.push(document.getElementById("answer").value);
    questionIndex++;
    if(questionIndex < FINAL_QUESTION){
        question.innerHTML = questionList[questionIndex];
    } else {
        question.innerHTML = 
            "<p>Your time is worth $" + getAnswer(0) + "/hr</p>"+
            "<p>Your Portfolio is worth $" + getAnswer(1) + "</p>"+
            "<p>Your Net Worth is $" + getAnswer(2) + "</p>"
    }
    console.log(answerList);
}

function getAnswer(index){
    return answerList[index];
}