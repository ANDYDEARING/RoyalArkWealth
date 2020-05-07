var tag = document.createElement("p");
var text = document.createTextNode("Inernal JS Injection Works");
tag.appendChild(text);
var element = document.getElementsByTagName('quiz-area')[0];
element.appendChild(tag);