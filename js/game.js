// A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you.
$(document).ready(function () {

	// click text for random button area
	// When random-button is clicked
	$("#random-button").on("click", function () {

		//generates random number from 10-100
		var random = Math.floor(Math.random() * 100) + 10;

		//dumps random number into our random number text.
		$("#random-number").text(random);

		// Setting up random numbers for each jewel
		// Random number has to be between 5 - 12
		var diamond = Math.floor(Math.random() * 11 + 5)
		var emerald = Math.floor(Math.random() * 11 + 5)
		var rock = Math.floor(Math.random() * 11 + 5)
		var ruby = Math.floor(Math.random() * 11 + 5)


		// without this user total wont go up
		var userTotal = 0;
		var wins = 0;
		var losses = 0;		

		// reset score to 0 (failed attempt it didn't work im missing some code***)
		var reset = function(){
			score = 0;
			var random = Math.floor(Math.random() * 60) + 1;
			$("#random-number").text(random);
		}
		// end of failure code

		// adds wins and losses to user total 
		$('#numberWins').text(wins);
		$('#numberLosses').text(losses);

		// what happens when you win
		function win() {
			// alert window
			alert("Noice");
			// adds one to the wins
			wins++;
			// shows wins
			$('#numberWins').text(wins);
			// review this line
			reset();
		}

		// what happens when you lose
		function lost() {
			// alert window
			alert("Ha! Losseeeeer");
			// adds one to the loses
			losses++;
			// shows losses
			$('#numberLosses').text(losses);
			// same as win 
			reset();
		}

		//onclick for diamond function
		$('#diamond').on('click', function () {
			userTotal = userTotal + diamond;

			// console log
			console.log("New userTotal= " + userTotal);
			$('#finalTotal').text(userTotal);

			//win loss conditions (if the total number is more than the "click text for target number" number)
			if (userTotal == random) {
				win();
			} else if (userTotal > random) {
				lost();
			}
		})

		//onclick for emerald function
		$('#emerald').on('click', function () {
			// adds to the user total
			userTotal = userTotal + emerald;

			// console log
			console.log("New userTotal= " + userTotal);
			$('#finalTotal').text(userTotal);

			//win loss conditions (if the total number is more than the "click text for target number" number)
			if (userTotal == random) {
				win();
			} else if (userTotal > random) {
				lost();
			}
		})

		//onclick for blue diamond "rock" function
		$('#rock').on('click', function () {
			// adds to the user total
			userTotal = userTotal + rock;

			// console log
			console.log("New userTotal= " + userTotal);
			$('#finalTotal').text(userTotal);

			//win loss conditions (if the total number is more than the "click text for target number" number)
			if (userTotal == random) {
				win();
			} else if (userTotal > random) {
				lost();
			}
		})

		//onclick for ruby function
		$('#ruby').on('click', function () {
			// adds to the user total
			userTotal = userTotal + ruby;

			// console log
			console.log("New userTotal= " + userTotal);
			$('#finalTotal').text(userTotal);

			//win loss conditions (if the total number is more than the "click text for target number" number)
			if (userTotal == random) {
				win();
			} else if (userTotal > random) {
				lost();
			}
		});
	});
});