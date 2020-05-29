//create the quiz element
var div = document.createElement("div");
div.setAttribute("id","quiz-area");
div.style.marginLeft = "75px";
var contentArea = document.getElementsByClassName("content-wrapper")[0];
contentArea.appendChild(div);

//Heading
// var headerTag = document.createElement("h1");
// var headerText = document.createTextNode("Quiz");
// headerTag.appendChild(headerText);
var quizArea = document.getElementById('quiz-area');
// quizArea.appendChild(headerTag);
var answerList = [];
var FINAL_QUESTION = 10;

var questionIndex = 0;
var questionList = [

    "<p><strong>Q1. What is your time worth?</strong></p>"+
    '<div><span>$ </span><input id="answer" type="number"></input><span> / Hour</span></div>'+
    '<div><br><button onClick="next()">Next</button></div>',

    "<p><strong>Q2. What is the total size of your investment portfolio?</strong></p>"+
    '<p><strong>Include:</strong> brokerage accounts, IRAs, 401(k)s, 529s, and any other accounts in which you control how the balance is invested. Also include any excess cash currently in checking/savings that you know should be invested.</p>' +
    '<p><strong>Exclude:</strong> bank accounts (checking/savings, aside from excess cash mentioned above), company stock, and any other investments over which you do not have discretionary control to make changes (private equity funds, start-up seed investments, whole life insurance policies, etc.).</p>' +
    '<div><span>$ </span><input id="answer" type="number"></input></div>'+
    '<div><br><button onClick="next()">Next</button></div>',

    "<p><strong>Q3. What is your approximate Net Worth? (exclude any residential real estate)</strong></p>"+
    '<div><span>$ </span><input id="answer" type="number"></input></div>'+
    '<div><br><button onClick="next()">Next</button></div>',

    "<p><strong>Q4. How many hours per year do you spend managing your investments and other financial planning decisions? Or rather, how much time do you think you should be spending if you had the time or desire to do so?</strong></p>"+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="52">'+
    '<label for="a">Extensive time (1+ hour/week = 52 hours/year)</label><br>'+
    '<input type="radio" name="answer" id="b" value="24">'+
    '<label for="b">Quite a bit of time (2 hours/month = 24 hours/year)</label><br>'+
    '<input type="radio" name="answer" id="c" value="12">'+
    '<label for="c">A moderate amount of time (1 hour/month = 12 hours/year)</label><br>'+
    '<input type="radio" name="answer" id="d" value="4">'+
    '<label for="d">Very little time (1 hour/quarter = 4 hours/year)</label><br>'+
    '<div><br><button onClick="radioNext()">Next</button></div>',

    "<p><strong>Q5. Is your current portfolio well-constructed? If not, how much better off would you be if it were?</strong></p>"+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="0.45">'+
    '<label for="a">My portfolio is structured by default, not by design. I set my allocations years ago and haven’t really checked it since. (Annual benefit = 0.45% of portfolio based on Morningstar)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0.25">'+
    '<label for="b">My portfolio is okay. I tried to diversify with funds in a few different asset classes, but I know it’s sub-optimal. (Annual benefit = 0.25% of portfolio)</label><br>'+
    '<input type="radio" name="answer" id="c" value="0">'+
    '<label for="c">My portfolio is optimized. I do everything mentioned above. (No benefit)</label><br>'+
    '<div><br><button onClick="radioNext()">Next</button></div>',
    
    "<p><strong>Q6. How much is access to DFA worth to you?</strong></p>"+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="0.5">'+
    '<label for="a">I do not have access to DFA, and I do not tilt my portfolio towards small cap and value stocks. (Annual benefit = .5%)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0.25">'+
    '<label for="b">I do not have access to DFA, but I already tilt my portfolio towards small cap and value stock index funds. (Annual benefit = 0.25%)</label><br>'+
    '<input type="radio" name="answer" id="c" value="0">'+
    '<label for="c">I already have access to DFA, or I don’t see any value in gaining access. (No benefit)</label><br>'+
    '<div><br><button onClick="radioNext()">Next</button></div>',

    
];

var question = document.createElement("div");
question.innerHTML = questionList[questionIndex];
quizArea.appendChild(question);

function next(){
    answerList.push(document.getElementById("answer").value);
    incrementQuestion();
}

function radioNext(){
    answerList.push(document.getElementsByName("answer")[0].value);
    incrementQuestion();
}

function incrementQuestion(){
    console.log(answerList);
    questionIndex++;
    if(questionIndex < FINAL_QUESTION){
        question.innerHTML = questionList[questionIndex];
    } else {
        endState();
    }
}

function endState(){
    console.log(answerList);
    question.innerHTML = 
            "<p>Your time is worth $" + getAnswer(0) + "/hr</p>"+
            "<p>Your Portfolio is worth $" + getAnswer(1) + "</p>"+
            "<p>Your Net Worth is $" + getAnswer(2) + "</p>";
}

function getAnswer(index){
    return answerList[index];
}