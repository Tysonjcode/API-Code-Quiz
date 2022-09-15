var questions = [
    {
        title: "Which element is not HTML semantic element?",
        choices: ["article", "aside", "div", "section"],
        answer: "div"
    },
    {
        title: "The function and  var are known as?",
        choices: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
        answer: "Declaration statements"
    },
    {
        title: "Which one of the following is the correct way for calling the JavaScript code?",
        choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
        answer: "Function/Method"
    },
    {
        title: "Which of the following tags is used for inserting the largest heading in HTML?",
        choices: ["<h3>", "<h1>", "<h5>", "<h6>"],
        answer: "<h1>"
    },
    {
        title: "The HTML attribute used to define the inline styles is?",
        choices: ["style", "styles", "class", "ID"],
        answer: "style"
    }
];
var totalTime = 59;
var start = document.querySelector("#startQuiz");
var count = 0;
var totalPoints = 0;
var scoreH1 = document.querySelector("#score");
var lastQ = false;
var submitBtn = document.querySelector("#submit");
var highscore;
var highscoreBtn = document.querySelector("#highscores");
var scoresDiv = document.querySelector("#scoresDiv");

highscoreBtn.addEventListener("click", function () {
	document.getElementById("highscoreDisp").innerHTML = "";
	var hsList = JSON.parse(localStorage.getItem("Highscore")).highscoreArr || [];
	if (scoresDiv.style.display === "none") {
		scoresDiv.style.display = "flex";
		hsList.map(a => {
			var ele = document.createElement("h3");
			var node = document.createTextNode(a);
			ele.appendChild(node);
			document.getElementById("highscoreDisp").appendChild(ele);
		});
	} else {
		scoresDiv.style.display = "none";

	}
	console.log("Hello");
});

submitBtn.addEventListener("click", function () {
	if (localStorage.getItem("Highscore") === null) {
		localStorage.setItem("Highscore", JSON.stringify({
			highscore: 0,
			highscoreArr: []
		}));
	}

	var input = document.querySelector("#initials").value;
	var score = totalPoints + totalTime;
	highscore = JSON.parse(localStorage.getItem("Highscore")).highscore;
	var allscores = JSON.parse(localStorage.getItem("Highscore")).highscoreArr;

	if (score > highscore) {
		highscore = score;
	}
	allscores.push(input + score);
	localStorage.setItem('Highscore', JSON.stringify({
		highscore,
		highscoreArr: allscores
	}));

	startAgain();
});


var startOverScreen = document.querySelector("#startOver");
var restartBtn = document.querySelector("#restart");

function startAgain() {
	endQuiz.style.display = "none";
	startOverScreen.style.display = "flex";
}

restartBtn.addEventListener("click", function () {
	totalTime = 75;
	count = 0;
	totalPoints = 0;
	lastQ = false;
	startDiv.style.display = "block";
	quizDiv.style.display = "none";
	startOverScreen.style.display = "none";
});

endGame = () => {
	lastQ = true;
	quizDiv.style.display = "none";
	endQuiz.style.display = "block";
	var score = totalPoints + totalTime;
	scoreH1.textContent = score;
};

answeredRight = () => {
	alert("YOU GOT IT RIGHT!");
	totalPoints += 10;
	console.log(highscore);
	count++;
	if (count === questions.length) {
		endGame();
	} else {
		generateQuestions();
	}
};

answeredWrong = () => {
	alert("YOU GOT IT WRONG!");
	totalPoints -= 5;
	count++;
	totalTime -= 10;
	if (count === questions.length) {
		endGame();
	} else {
		generateQuestions();
	}
};

generateQuestions = () => {
	document.getElementById("quizQ").innerHTML = questions[count].title;
	document.getElementById("choiceBtns").innerHTML = "";

	questions[count].choices.map((choice, i) => {
		var btn = document.createElement("button");
		var textnode = document.createTextNode(choice);
		btn.appendChild(textnode);
		document.getElementById("choiceBtns").appendChild(btn);
		btn.setAttribute("data", choice);
		btn.setAttribute("id", `btn${i}`);
		btn.setAttribute("answer", questions[count].answer);

		document.querySelector(`#btn${i}`).addEventListener("click", function (e) {
			console.log(e.target.getAttribute("data"));
			if (e.target.getAttribute("data") === e.target.getAttribute("answer")) {
				answeredRight();
			} else {
				answeredWrong();
			}
		});
	});
};
var timerSpan = document.querySelector("#timer");
var startDiv = document.querySelector("#startDiv");
var quizDiv = document.querySelector("#quizDiv");
var endQuiz = document.querySelector("#endQuiz");

start.addEventListener("click", function () {
	console.log(totalTime);
	startDiv.style.display = "none";
	quizDiv.style.display = "block";
	generateQuestions();

	var interval = setInterval(function () {
		totalTime--;
		timerSpan.innerHTML = totalTime;
		console.log("tick .. " + totalTime);
		if (totalTime === 0 || lastQ) {
			clearInterval(interval);
			console.log("Time's out");
			endGame();
		}
	}, 1000);

});
