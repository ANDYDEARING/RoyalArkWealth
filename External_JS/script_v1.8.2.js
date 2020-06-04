//create the quiz element
var div = document.createElement("div");
div.setAttribute("id","quiz-area");
var contentArea = document.getElementsByClassName("content-wrapper")[0];
contentArea.appendChild(div);

var quizArea = document.getElementById('quiz-area');
var answerList = [];
var FINAL_QUESTION = 8;

var questionIndex = 0;
var questionList = [

    '<h3 class="intro-header">How We Estimate the Benefits of Our Advice</h3><br>'+
    '<p>The decision to hire an advisor ultimately comes down to cost versus the value received. That equation will be different for each person, and may seem expensive, especially if you have not worked with an advisor before.</p>'+
    '<p>We strive to be transparent in all aspects of our work and our calculator is an effort to try to quantify what is largely intangible – your peace of mind.</p>'+
    '<p>We believe we offer value in four keys areas of investment management.</p>'+
    '<ul><li>A portfolio structured by design, rather than by default</li>'+
    '<li>Access to time-tested investment strategies</li>'+
    '<li>Actively rebalancing and tax loss harvesting as conditions warrant</li>'+
    '<li>Providing valuable perspective during financial turbulence</li></ul>'+
    '<p>This '+
    '<a href="https://www.morningstar.com/content/dam/marketing/shared/research/foundational/831611-GammaEfficientPortfolio.pdf" target="_blank">white paper from researchers at Morningstar</a>'+
    ' helps quantify the value of these various strategies on investor portfolios.</p>'+
    '<p>In addition, we provide <em>comprehensive financial planning</em>. We believe this is the most valuable part of a relationship with our firm. Achieving financial security and independence requires following a roadmap – and navigating the unexpected events life throws in our path along the way.</p>'+
    '<p>We invite you to spend a few minutes to determine how valuable our counsel might be given your specific financial picture.</p>'+
    '<div><br><button onClick="startQuiz()">Start Quiz</button></div>',

    "<p><strong>Q1. What is the total size of your investment portfolio?</strong></p>"+
    '<p><strong>Include:</strong> brokerage accounts, IRAs, 401(k)s, 529s, and any other accounts in which you control how the balance is invested. Also include any excess cash currently in checking/savings that you know should be invested.</p>' +
    '<p><strong>Exclude:</strong> bank accounts (checking/savings, aside from excess cash mentioned above), company stock, and any other investments over which you do not have discretionary control to make changes (private equity funds, start-up seed investments, whole life insurance policies, etc.).</p>' +
    '<div class="num-input"><span>$ </span><input id="answer" type="number"></input></div>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="next()">Next</button></div>',

    "<p><strong>Q2. What is your approximate Net Worth? (exclude any residential real estate)</strong></p>"+
    '<div class="num-input"><span>$ </span><input id="answer" type="number"></input></div>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="next()">Next</button></div>',

    "<p><strong>Q3. Is your current portfolio well-constructed? If not, how much better off would you be if it were?</strong></p>"+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="0.0045">'+
    '<label for="a">My portfolio is structured by default, not by design. I set my allocations years ago and haven’t really checked it since. (Annual benefit = 0.45% of portfolio based on Morningstar)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0.0025">'+
    '<label for="b">My portfolio is okay. I tried to diversify with funds in a few different asset classes, but I know it’s sub-optimal. (Annual benefit = 0.25% of portfolio)</label><br>'+
    '<input type="radio" name="answer" id="c" value="0">'+
    '<label for="c">My portfolio is optimized. I do everything mentioned above. (No benefit)</label><br>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="radioNext()">Next</button></div>',
    
    "<p><strong>Q4. How much is access to DFA worth to you?</strong></p>"+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="0.005">'+
    '<label for="a">I do not have access to DFA, and I do not tilt my portfolio towards small cap and value stocks. (Annual benefit = 0.5%)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0.0025">'+
    '<label for="b">I do not have access to DFA, but I already tilt my portfolio towards small cap and value stock index funds. (Annual benefit = 0.25%)</label><br>'+
    '<input type="radio" name="answer" id="c" value="0">'+
    '<label for="c">I already have access to DFA, or I don’t see any value in gaining access. (No benefit)</label><br>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="radioNext()">Next</button></div>',

    "<p><strong>Q5. How much is rebalancing worth to you?</strong></p>"+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="0.0035">'+
    '<label for="a">I never rebalance. (Annual benefit = 0.35%)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0.002">'+
    '<label for="b">I rebalance on an ad hoc basis, but would benefit from a more systematic approach. (Annual benefit = 0.20%)</label><br>'+
    '<input type="radio" name="answer" id="c" value="0.001">'+
    '<label for="c">I rebalance based on regular intervals (e.g., every quarter or year), regardless of deviation from my targets. (Annual benefit = 0.10%)</label><br>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="radioNext()">Next</button></div>',

    '<p><strong>Q6. How much would you benefit from "harvesting" losses in your portfolio?</strong></p>'+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="0.001">'+
    '<label for="a">I do not proactively harvest losses, and I am in a high marginal tax bracket. (Annual benefit = 0.10%)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0.0005">'+
    '<label for="b">I do not proactively harvest losses, and I am in a low marginal tax bracket. (Annual benefit = 0.05%)</label><br>'+
    '<input type="radio" name="answer" id="c" value="0">'+
    '<label for="c">I continuously monitor for loss harvesting opportunities. (No benefit)</label><br>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="radioNext()">Next</button></div>',

    '<p><strong>Q7. How valuable would it be to have a behavioral finance coach protecting you from your own biases?</strong></p>'+
    "<p><em>Please select one of the following:</em></p>"+
    '<input type="radio" name="answer" id="a" value="0.015">'+
    '<label for="a">I am likely to make emotional financial decisions. (Annual benefit = 1.5%)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0.005">'+
    '<label for="b">I am fairly disciplined in my investing, but I recognize that I inevitably have some cognitive biases. (Annual benefit = 0.5%)</label><br>'+
    '<input type="radio" name="answer" id="c" value="0">'+
    '<label for="c">I am perfectly disciplined in sticking to my long-term investment plan or otherwise see no value in coaching from a trusted advisor. (No benefit)</label><br>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="radioNext()">Next</button></div>',

    '<p><strong>Q8. How valuable would it be to continuously track whether you’re on pace to achieve your financial goals?</strong></p>'+
    "<p>The centerpiece of the financial planning process should be well-designed projections of the client's net worth and the probability of a secure and independent retirement. More importantly, do I have someone proactively monitoring and assessing my plan as circumstances change over time?</p>"+
    "<p>By building comprehensive models and regularly reviewing them with our clients (especially before any major financial decision is to be made), we provide our clients with an understanding of where they stand and a framework for decision-making. We believe our planning work is one of the most valuable components of the service we provide.</p>"+
    '<input type="radio" name="answer" id="a" value="0.005">'+
    '<label for="a">I have neither the time nor talent to project and analyze my financial progress and make most financial decisions on an “as needed” basis. (Annual benefit = 0.5%)</label><br>'+
    '<input type="radio" name="answer" id="b" value="0">'+
    '<label for="b">I model and project my progress toward goals and conduct a comprehensive review of all aspects of my financial situation on an annual basis. My spouse (partner) is also up to speed and capable of managing our finances should I be unable to do so. (No annual benefit)</label><br>'+
    '<div><br><button onClick="decrementQuestion()">Back</button><button onClick="radioNext()">Next</button></div>',
];

var question = document.createElement("div");
question.innerHTML = questionList[questionIndex];
quizArea.appendChild(question);

var messageArea = document.createElement("div");
quizArea.appendChild(messageArea);

function next(){
    if(verifyInput(document.getElementById("answer").value)){
        answerList.push(document.getElementById("answer").value);
        incrementQuestion();
    } else {
        displayMessage("Please enter a valid number");
    }
}

function radioNext(){
    let radios = document.getElementsByName("answer");
    let checkedIndex = -1;
    for(let i=0;i<radios.length;i++){
        if(radios[i].checked){
            checkedIndex = i;
            break;
        }
    }
    if(checkedIndex>=0){
        answerList.push(radios[checkedIndex].value);
        incrementQuestion();
    } else {
        displayMessage("Please make a selection");
    }
}

function startQuiz(){
    answerList.push("intro");
    incrementQuestion();
}

function incrementQuestion(){
    questionIndex++;
    if(questionIndex <= FINAL_QUESTION){
        displayMessage("");
        question.innerHTML = questionList[questionIndex];
    } else {
        endState();
    }
}

function decrementQuestion(){
    questionIndex--;
    answerList.pop();
    displayMessage("");
    question.innerHTML = questionList[questionIndex];
}

function endState(){
    let portfolioManagement = getPortfolioManagement();
    let financialPlanning = parseFloat(answerList[2])*parseFloat(answerList[8]);;
    let fee = getFee();
    question.innerHTML = 
            "<h3>Value of Our Advice</h3><br>"+
            "<p>Portfolio Management: $" + dollarPipe(portfolioManagement) + "</p>"+
            "<p>Financial Planning: $" + dollarPipe(financialPlanning) + "</p>"+
            "<p>Annual Value of Service: $" + dollarPipe(portfolioManagement+financialPlanning) + "</p>"+
            "<p>Projected ARWM Fee: $" + dollarPipe(fee) + "</p>"+
            "<p><u><strong>Net Benefit Per Year: $" + dollarPipe(portfolioManagement+financialPlanning-fee) +"</u></strong></p>"+
            '<div><br><br><button onClick="decrementQuestion()">Back</button><button onClick="endQuiz()">End Quiz</button></div>';
}

function getPortfolioManagement(){
    let result = 0;
    result += parseFloat(answerList[1])*parseFloat(answerList[3]);
    result += parseFloat(answerList[1])*parseFloat(answerList[4]);
    result += parseFloat(answerList[1])*parseFloat(answerList[5]);
    result += parseFloat(answerList[1])*parseFloat(answerList[6]);
    result += parseFloat(answerList[1])*parseFloat(answerList[7]);
    return result;
}

function getFee(){
    let portfolioValue = parseFloat(answerList[1]);
    if(portfolioValue > 5000000.00){
        return ((portfolioValue-5000000)*0.004)+41000;
    } else if(portfolioValue > 2000000.00){
        return ((portfolioValue-2000000)*0.007)+20000;
    } else {
        return portfolioValue*0.01;
    }
}

function dollarPipe(num){
    let rndStr = Math.round(num).toString();
    let index = rndStr.length;
    let count = 0;
    while(index>0){
        if(count==3){
            count=0;
            rndStr = rndStr.slice(0,index)+","+rndStr.slice(index);
        }
        count++;
        index--;
    }
    return rndStr;
}

function verifyInput(str){
    result = parseFloat(str);
    return !Number.isNaN(result);
}

function displayMessage(str){
    messageArea.innerHTML = '<p style="color:red;">'+str+'</p>';
}

function endQuiz(){
    window.close();
}