//TODO: Check that only mods can enter !boom
//TODO:
//TODO: ************ Started Version 2 to: ****************************
//TODO:• Can we have the meter shake more as it's filling towards 100%
//TODO:• *******  Phase I - Start shaking at 80%
//TODO:
//TODO:• Explode when reaches full 100%, where the emotes leave the center of the emotes.
//TODO:• *******  Do that in Stream Elements
//TODO:
//TODO:• The meter should lose gain when nothing is happening or the excitement isn't happening.
//TODO:• *******  Idea - Tickle Me with Emotes" after x mins of inactivity
//TODO:
//TODO:• Can we have the emotes that pop over screen overlay, as the emotes used in the stream itself?
//TODO:
//TODO: ************ Started Version 3 to: ****************************
//TODO:  [ X ] Capture 1st emote
//TODO:  [ X ] Only accept first X emotes from a user
//TODO:  [ X ] Take out the fades
//TODO:  [ x ] Figure out increments
//TODO:  [ x ]Add color as it progresses
//TODO:  [ x ] Make as many params as possible
//TODO:  [ x ] Have the program started and ended by a mod
//TODO:
//TODO:  *********** In Version 4 ******************************
//TODO:   Subscribe to the Hype Train Event
//TODO:   Have it run only during the time of a Hype Tran

//import dotenv from 'dotenv';

// ***********************
//export function starthype(client, tags, channel, streamer){
// ***********************

// **********************************  YOU CAN CHANGE THESE  ********************************* //
// ******************************************************************************************* //
// ******************************************************************************************* //
//                                                                                             //
const totalEmotesAllowed = 20; // total number of emotes needed to get to 100%                 //
var max_Emotes_Accepted_Per_Message = 10; // only recognize thse many emotes per message per user
var startToWiggle = 80; // functionality disabled                                              //
var marqueeTimer = 11000; // time in millisecs for train emotes to run e.g. 11000 = 11 secs
var delayTime = 60000; // 1 sec = 1000 , 30 sec = 30000                                        //
const endMessage = "message"                                                                   // 
//                                                                                             //
// ******************************************************************************************* //
// ******************************************************************************************* //
// ******************************************************************************************* //


const gaugeElement = document.querySelector('.gauge');

const gauge_shakingElement = document.querySelector('.gaugeshake');

gaugeElement.querySelector('.gauge__fill');
gaugeElement.querySelector('.gauge__cover').textContent = `0%`;

gauge_shakingElement.querySelector('.gauge__fill');
gauge_shakingElement.querySelector('.gauge__cover').textContent = `0%`;

// ********************  DO NOT CHANGE THESE ******************** //
var totalEmotes = 0; //
var active = 0; //
var trigger = 0; //
var percentageOfEmotes = 0; //
var stopped = 0; //
var currTime = new Date(); //
var currMinute = currTime.getMinutes(); //
var previousMinute = currMinute; //
var nextTime = currTime.getMinutes() + 5; // make 5 a param       //
var timeoutID; //
var firstTime = 1; //
var guageIsFadedOut = 0; //
var meterRotationMultiplier = 100 / totalEmotesAllowed; // this is the multiplier for the turn radius of the meter   //
// ************************************************************** //

function setGaugeValue(gauge, gaugeshake, value) {
	totalEmotes = totalEmotes + value;
	percentageOfEmotes = totalEmotes / totalEmotesAllowed;

	//if (totalEmotesAllowed *100 >= maxPercentage) {
	//	 trigger = 1;

	if (totalEmotes >= totalEmotesAllowed) {
		trigger = 1;
	}
	console.log('Total Emotes Allowed ', totalEmotesAllowed);
	console.log('Total Emotes ', totalEmotes);
	console.log('Value ', value);
	//console.log ("Total Emote % ", (totalEmotes * .01) / 2);
	console.log('Total Emote % ', percentageOfEmotes);

	if (totalEmotes < startToWiggle) {
		// check if the shaking count has been reached.
		// determine the color of the gauge element

		switch (true) {
			case percentageOfEmotes < 0.14:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ffbe00';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;
			case percentageOfEmotes >= 0.14 && percentageOfEmotes < 0.28:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ffaa00';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;
			case percentageOfEmotes >= 0.28 && percentageOfEmotes < 0.42:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ff9600';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;
			case percentageOfEmotes >= 0.42 && percentageOfEmotes < 0.56:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ff8200';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;
			case percentageOfEmotes >= 0.56 && percentageOfEmotes < 0.7:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ff6e00';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;
			case percentageOfEmotes >= 0.7 && percentageOfEmotes < 0.84:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ff5a00';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;
			case percentageOfEmotes >= 0.84 && percentageOfEmotes < 0.9:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ff4600';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;

			case percentageOfEmotes >= 0.9 && percentageOfEmotes < 2:
				gaugeElement.querySelector('.gauge__fill').style.background = '#ff0000';
				gaugeElement.querySelector('.gauge__cover').style.background = '#ffffff';
				gaugeElement.querySelector('.gauge__cover').style.color = '#000000';
				break;

			default:
				console.log('ERROR: - Percentage out of pounds for setting colors');
		}

		if (percentageOfEmotes > 1) {
			percentageOfEmotes = 1;
		}

		if (percentageOfEmotes <= 0.9) {
			console.log('% of emotes = ', percentageOfEmotes);
			console.log('Rotation = ', totalEmotes * (1.8 * meterRotationMultiplier));

			gauge.querySelector('.gauge__fill').style.transform = `rotate(${totalEmotes * (1.8 * meterRotationMultiplier)}deg)`;
			var deadline = new Date().getTime() + delayTime;
			
			if (firstTime){			
			var x = setInterval(function() {
			var now = new Date().getTime();
			var t = deadline - now;
			var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((t % (1000 * 60)) / 1000);
			if (t < 0) {
				clearInterval(x);
				gauge.querySelector(".gauge__cover").innerHTML = endMessage;
			}
			//gauge.querySelector('.gauge__cover').innerHTML = `${Math.round(percentageOfEmotes * 100)}%`;
			//gauge.querySelector('.gauge__cover').innerHTML = `${Math.round(percentageOfEmotes * 100)}% <br/> ${minutes}:${seconds}`;
				}, 1000);
			}
			gauge.querySelector('.gauge__cover').innerHTML = `${Math.round(percentageOfEmotes * 100)}%`;
		} else {
			console.log('FinalMeterRotationMultiper', meterRotationMultiplier);
			console.log('FinalRotation = ', totalEmotes * (1.8 * meterRotationMultiplier));
			const finalRotation = totalEmotes * (1.8 * meterRotationMultiplier);
			gauge.querySelector('.gauge__fill').style.transform = `rotate(180deg)`;
			gauge.querySelector('.gauge__cover').textContent = `${Math.round(percentageOfEmotes * 100)}%`;
		}

		// ********************    first time through    *******************
		if (firstTime) {
			document.getElementById('showGauge').style.visibility = 'visible';
			document.getElementById('marquee').style.visibility = 'visible';
			// only show the train emotes for the amount of time set in the marqueeTimer
			setTimeout(() => {
				document.getElementById('marquee').style.visibility = 'hidden';
			}, marqueeTimer);
		}
		// *****************************************************************

		gaugeshake.querySelector('.gauge__fill').style.transform = `rotate(${totalEmotes *
			(1.8 * meterRotationMultiplier)}deg)`;
		gaugeshake.querySelector('.gauge__cover').textContent = `${Math.round(percentageOfEmotes * 100)}%`;

		document.getElementById('showShake').style.display = 'none';
	} else {
		// shake code
		document.getElementById('showGauge').style.display = 'none';
		gaugeshake.querySelector('.gauge__fill').style.transform = `rotate(${totalEmotes * 1.8}deg)`;
		gaugeshake.querySelector('.gauge__cover').textContent = `${Math.round(totalEmotesAllowed)}%`;
		document.getElementById('showShake').style.display = 'inline-block';
	}
}


//*********************  Goes Here ****************/




//*********************  Ends Here ****************/

client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if (self) return;

	console.log(tags);

var validUser;
	if (message.toLowerCase() === '!starthype' || message.toLowerCase() === '!stophype' || message.toLowerCase() === '!boom') {

		if (tags.badges && (tags.badges.broadcaster || tags.badges.moderator)){
		 validUser = 1;
	    }
		else {
		validUser = 0;
		}
		if (!validUser){
		return;
	  }
	
	}

	if (message.toLowerCase() === '!starthype' && !active) {
		//value = 0;
		totalEmotes = 0;
		active = 1;
		trigger = 0;
		firstTime = 1;
		console.log('Process started .......');
	} else if (!active) return;

	if (message.toLowerCase() === '!stophype' && active) {
		//value = 0;
		totalEmotes = 0;
		active = 0;
		trigger = 0;
		document.getElementById('showGauge').style.visibility = 'hidden';
		document.getElementById('marquee').style.visibility = 'hidden';
		console.log('Process stopped by mod.......');
	}

	if (tags.emotes == null) {
		return;
	}

	let all = [];
	for (const key of Object.keys(tags.emotes)) {
		const emote = tags.emotes[key];

		for (const range of emote) {
			const split = range.split('-');

			all.push({
				emote: key,
				start: parseInt(split[0]),
				end: parseInt(split[1])
			});
		}
	}

	length = all.length;

	// only take the first x number of emotes

	if (length > max_Emotes_Accepted_Per_Message) {
		length = max_Emotes_Accepted_Per_Message;
	}

	console.log(' Version 3.0');
	setGaugeValue(gaugeElement, gauge_shakingElement, length);


  function setTimer() {

// if first time then start the timer
		timeoutID = setTimeout(() => {
				stopMe();
			}, delayTime); 
	console.log("Started the timer")
// then make the time display on the screen

}


function stopMe() {
	totalEmotes = 0;
	active = 0;
	trigger = 0;
	document.getElementById('showGauge').style.visibility = 'hidden';
	document.getElementById('marquee').style.visibility = 'hidden';
	console.log('Process stopped - time expired .......');
}

	// resetTimer(nextTime);

	function resetTimer(nextTime) {
		//	Timing
		//	======
		//	save the current minute plus the nexttime so we can set the setTimeout
		// if the setTimeout expires,
		//  1)  hide the component
		//   OPTIONAL: say "Tickle me"
		// otherwise, if the next emote is within the delayTime,
		//  1)clear the last setTimeout
		//  2) reset the nextTime and send this new nextTime to the resettimer so it starts a new clock

		function fadeOutEffect() {
			if (totalEmotes < startToWiggle) {
				// set a timeoout pulsingTimput, for x secs.

				var pulseID = setTimeout(() => {
					// set the .pulse class

					document.getElementById('showGauge').classList.add('pulse');
				}, 1000);

				var fadeEffect = setInterval(function() {
					if (!gaugeElement.style.opacity) {
						gaugeElement.style.opacity = 1;
					}
					if (gaugeElement.style.opacity > 0) {
						gaugeElement.style.opacity -= 0.1;
					} else {
						clearInterval(fadeEffect);
						guageIsFadedOut = 1;
						console.log('in 3rd section *******');
					}
				}, 500);
			} else {
				var fadeEffect = setInterval(function() {
					if (!gauge_shakingElement.style.opacity) {
						gauge_shakingElement.style.opacity = 1;
					}
					if (gauge_shakingElement.style.opacity > 0) {
						gauge_shakingElement.style.opacity -= 0.1;
					} else {
						clearInterval(fadeEffect);
						guageIsFadedOut = 1;
					}
				}, 200);
			}
		}


		//	if (firstTime){
		//		firstTime = 0;
		//		}
		//	else {  // clear the last timer and set a new one below
		// in version 3 ignore all fades
		// clearTimeout(timeoutID);

		//		if (guageIsFadedOut){
		//fade it back in *********************
		//			gaugeElement.style.opacity = 1;
		//			gauge_shakingElement.style.opacity = 1
		//		}  // *************************************
		//	}

		//start the pulse effect
		// in version 3 ignore all fades

		//timeoutID = setTimeout(() => {
		//		console.log("I'm going to sleep")
		//		fadeOutEffect();
		//	}, delayTime); //10 sec for now

		return;
	}

	if (firstTime) {
		firstTime = 0;
  		setTimer();
	}

	if (trigger) {
		client.say(channel, `!boom`);

		// **** Reset everything and quit ****

		totalEmotes = 0;
		active = 0;
		trigger = 0;
		document.getElementById('showGauge').style.visibility = 'hidden';
		document.getElementById('marquee').style.visibility = 'hidden';
		console.log('Process stopped .......');
	}
});

//}
