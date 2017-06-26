$(document).ready(function() {


var trivia = {
	questions: ["1. What is the name of the disease that has been referred to as the 'disease of kings'?", "2. What disease causes a buildup of fluid pressure in the eyeball and damages the optic nerve at the back of the eye?","3. In which century was the greatest number of chemical elements discovered?","4. Which two planets are most similar in size diameter wise?","5. Louis Pasteur developed which vaccine?"],
	guesses: {
		first: ["A. hemophilia", "A. astigmatism", "A. 17th","A. Mars and Mercury","A. polio"],
		second: ["B. jaundice","B. cataract", "B. 18th","B. Venus and Earth", "B. rabies"],
		third: ["C. rubella","C. glaucoma","C. 19th", "C. Uranus and Neptune", "C. smallpox"],
		fourth: ["D. syphilis","D. retinitis","D. 20th", "D. Jupiter and Saturn", "D. anthrax"]
	},
	correct: ["A. hemophilia","C. glaucoma", "C. 19th", "B. Venus and Earth","B. rabies"],
	images: ["assets/images/hemophilia.jpg","assets/images/glaucoma.jpg","assets/images/chemist.gif","assets/images/VenusEarth.jpg", "assets/images/rabies.gif"],

	right: 0,
	wrong: 0,
	
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

//the run function sets an interval that decrements once a second
function run () {
	intervalId = setInterval(decrement, 1000);
	}

//the decrement function
function decrement() {

	$(".start").html("<h2>" + "Time Remaining: " + number + " Seconds" + "</h2>");
	
	number--;
		

	if (number === 0){
		//also want to display another screen for when the user doesn't guess in time, displaying the correct answer.
		stop();
		timeUp();
	}
	else if (number <= 4){
		$(".start").html("<h2 style= 'color: red'>" + "Time Remaining: " + number + " Seconds" + "</h2>");
	}

}
function stop() {
	//clears the interval.  Just pass the name of the interval to the clearInterval function.
	clearInterval(intervalId);
	$(".start").hide();
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


	$(".start").show();
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
	setTimeout(question, 3000);
	}

//function to run when time runs out on the question
function timeUp(){

	$(".question").html("<h2>You Ran Out of Time." +"<br>" + "The correct answer was: " + trivia.correct[count]+"</h2>");
	$(".guesses").hide();
	$(".img").show();
	$(".img").html("<img src=" + trivia.images[count] + " width = '400px'>");
	count++;
	trivia.wrong++;
	nextQuestion();
}

//function to run when game is over and load final page
function results(){

	$(".question").html("<h2>CORRECT: " +trivia.right +"</h2>");
	$(".img").html("<h2>INCORRECT: " + trivia.wrong +"</h2>");
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
		question();
	});
}

$(".start").on("click",function(){	
	question();
	});

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
	});
$(".guesses1").hover(function(){
	$(this).css("cursor","pointer");	
	});
	$(".guesses2").hover(function(){
		$(this).css("cursor","pointer");
	});
	$(".guesses3").hover(function(){
		$(this).css("cursor","pointer");
	});
	$(".guesses4").hover(function(){
		$(this).css("cursor","pointer");
	});

});//end of document ready

//question resource:
//http://www.triviacountry.com/M16-Science-Trivia.htm