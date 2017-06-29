$(document).ready(function() {


var trivia = {
	questions: ["What is the name of the disease that has been referred to as the 'disease of kings'?", "What disease causes a buildup of fluid pressure in the eyeball and damages the optic nerve at the back of the eye?","In which century was the greatest number of chemical elements discovered?","Which two planets are most similar in size diameter wise?","Louis Pasteur developed which vaccine?", "Which one of the following instruments is used to measure humidity?","Many scientists think that some of the dinosaurs did not go extinct, but rather evolved into what kind of creature?","What would be the most likely thing one would do with the compound MgSO4 7H2O?","What causes the disease toxoplasmosis?"],
	guesses: {
		first: ["A. hemophilia", "A. astigmatism", "A. 17th","A. Mars and Mercury","A. polio", "A. anemometer","A. amphibians","A. power a car", "A. a bacterium"],
		second: ["B. jaundice","B. cataract", "B. 18th","B. Venus and Earth", "B. rabies", "B. ammeter","B. reptiles","B. blow up a building","B. a protozoan"],
		third: ["C. rubella","C. glaucoma","C. 19th", "C. Uranus and Neptune", "C. smallpox","C. hygrometer","C. birds","C. soak ones feet","C. a virus"],
		fourth: ["D. syphilis","D. retinitis","D. 20th", "D. Jupiter and Saturn", "D. anthrax", "D. barometer","D. mammals","D. fertilize a lawn","D. a prion"]
	},
	correct: ["A. hemophilia","C. glaucoma", "C. 19th", "B. Venus and Earth","B. rabies","C. hygrometer","C. birds","C. soak ones feet","B. a protozoan"],
	images: ["assets/images/hemophilia.jpg","assets/images/Glauc.jpg","assets/images/chemist.gif","assets/images/VenusEarth.jpg", "assets/images/rabies.gif","assets/images/hygrometer.jpg","assets/images/bird.jpg","assets/images/feet.jpg","assets/images/protozoa.jpg"],

	right: 0,
	wrong: 0,
	unanswered: 0
	
};
//for random questions
var rand;
//question counter
var count = 0;

//timer function
//set the number counter
var number = 15;

//variable to hold the interval ID when we execute the run function
var intervalId;
//don't show timer until game starts
$(".timer").css('visibility','hidden');

//the run function sets an interval that decrements once a second
function run () {
	intervalId = setInterval(decrement, 1000);
	}

//the decrement function
function decrement() {

	number--;
//if number =-1 display 0
	$(".timer").html("<h2><strong>" + "Time Remaining: " + number + " Seconds" + "</strong></h2>");
	
	
		

	if (number < 0){
		//also want to display another screen for when the user doesn't guess in time, displaying the correct answer.
		stop();
		resetInterval();
		timeUp();
	}
	else if (number <= 4){
		$(".timer").html("<h2 style= 'color: red'>" + "Time Remaining: " + number + " Seconds" + "</h2>");
	}

}
function stop() {
	//clears the interval.  Just pass the name of the interval to the clearInterval function.
	clearInterval(intervalId);

}

function resetInterval() {
	number = 15;
}
//display question
function question(){

	console.log(count);
	console.log(trivia.questions.length);
	if (count === trivia.questions.length){
		results();
	}
	else{
	//reset time 
	resetInterval();
	
	//start timer when question loads
	run();
	
	$(".guesses").show();
	$(".img").hide();

    $(".timer").css('visibility','visible');
	
	$(".question").html("<h2>" + trivia.questions[count]+"</h2>");
	$(".guesses1").html("<h2>" + trivia.guesses.first[count]+"</h2>");
	$(".guesses2").html("<h2>" + trivia.guesses.second[count]+"</h2>");
	$(".guesses3").html("<h2>" + trivia.guesses.third[count]+"</h2>");
	$(".guesses4").html("<h2>" + trivia.guesses.fourth[count]+"</h2>");
	}	
}


//function that runs if user answer is incorrect
function incorrect(){

	trivia.wrong++;
	console.log("wrong " + trivia.wrong);
	$(".question").html("<h2 style='color:red'>Sorry, that was incorrect." +"<br>" + "The correct answer was: " + trivia.correct[count]+"</h2>");
	$(".guesses").hide();
	$(".img").show();
	$(".img").html("<img src=" + trivia.images[count] + " width = '400px'>");
	nextQuestion();
}
//function that runs if user answer was correct
function correct(){

	trivia.right++;
	
	console.log(trivia.guesses.first[count]);
	console.log(trivia.correct[count]);
	console.log("right " + trivia.right);
	
	$(".question").html("<h2 style='color:green'>Good Job!" +"<br>" + "You Selected the Correct Answer: " + trivia.correct[count]+"</h2>");
	$(".guesses").hide();
	$(".img").show();
	$(".img").html("<img src=" + trivia.images[count] + " width = '400px'>");
	nextQuestion();
}

function nextQuestion(){
	
	//setTimeout to run to display the next question
	setTimeout(question, 5000);
	}

//function to run when time runs out on the question
function timeUp(){
	$(".timer").css('visibility','hidden');
	$(".question").html("<h2>You Ran Out of Time." +"<br>" + "The correct answer was: " + trivia.correct[count]+"</h2>");
	$(".guesses").hide();
	$(".img").show();
	$(".img").html("<img src=" + trivia.images[count] + " width = '400px'>");
	count++;
	trivia.unanswered++;
	nextQuestion();
}

//function to run when game is over and load final page
function results(){

	$(".timer").hide();
	$(".question").html("<h2>CORRECT: " +trivia.right +" out of " +trivia.questions.length+"</h2>");
	$(".img").html("<h2>INCORRECT: " + trivia.wrong +" out of " + trivia.questions.length +"</h2>");
	$(".guesses").show();
	$(".guesses").html("<h2>UNANSWERED: " + trivia.unanswered +" out of " + trivia.questions.length +"</h2>");
	count = 0;
	restart();

}

//give restart option
function restart(){
	$(".restart").html("<button type='button' class='btn btn-primary'>Play Again</button>");
	$(".restart").show("<button type='button' class='btn btn-primary'>Play Again</button>");
	$(".restart").on("click",function(){
		$(".restart").hide("<button type='button' class='btn btn-primary'>Play Again</button>");
		trivia.right = 0;
		trivia.wrong = 0;
		trivia.unanswered = 0;
		question();
	});
}

//jquery calls to color the answers
$(".guesses1").on("click", function(){
		stop();

		if (trivia.guesses.first[count] === trivia.correct[count]){
			correct();		
			}
		else {
			incorrect();
		}
		count++;
	});
	$(".guesses2").on("click", function(){
		stop();

		if (trivia.guesses.second[count] === trivia.correct[count]){
			correct();
			
			}
		else {
			incorrect();
		}
		count++;
	});
	$(".guesses3").on("click", function(){
		stop();
		if (trivia.guesses.third[count] === trivia.correct[count]){
			correct();
			}
		else {
			incorrect();
		}
		count++;
	});
	$(".guesses4").on("click", function(){
		stop();
		if (trivia.guesses.fourth[count] === trivia.correct[count]){
			correct();
			}
		else {
			incorrect();
		}
		count++;
	});

$(".start").hover(function() {
	$(this).css("cursor","pointer");
	$(this).css("background-color","#1d375b");
	$(this).css("color","#b5b6cb");
	});
$(".start").mouseout(function() {
	$(this).css("background-color","#b5b6cb");
	$(this).css("color","#1d375b");
	});

$(".guesses1").hover(function(){
	$(this).css("cursor","pointer");
	$(this).css("background-color","#1d375b");
	$(this).css("color","#b5b6cb");	
	});
$(".guesses1").mouseout(function() {
	$(this).css("background-color","#b5b6cb");
	$(this).css("color","#1d375b");
	});
$(".guesses2").hover(function(){
		$(this).css("cursor","pointer");
		$(this).css("background-color","#1d375b");
		$(this).css("color","#b5b6cb");	
	});
$(".guesses2").mouseout(function() {
	$(this).css("background-color","#b5b6cb");
	$(this).css("color","#1d375b");
	});
$(".guesses3").hover(function(){
		$(this).css("cursor","pointer");
		$(this).css("background-color","#1d375b");
		$(this).css("color","#b5b6cb");	
	});
$(".guesses3").mouseout(function() {
	$(this).css("background-color","#b5b6cb");
	$(this).css("color","#1d375b");
	});
$(".guesses4").hover(function(){
		$(this).css("cursor","pointer");
		$(this).css("background-color","#1d375b");
		$(this).css("color","#b5b6cb");	
	});
$(".guesses4").mouseout(function() {
	$(this).css("background-color","#b5b6cb");
	$(this).css("color","#1d375b");
	});

//starts game
$(".start").on("click",function(){	
	$(".start").css('visibility','hidden');
	question();
	});


});//end of document ready

//question resource:
//http://www.triviacountry.com/M16-Science-Trivia.htm