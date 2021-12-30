//TODO: Check that only mods can enter !boom
//TODO:  
//TODO:  
//TODO:  Find out what the upper limit is for the total emotes
//TODO: 
//TODO:  Disappear the meter - find out when
//TODO:
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

const gaugeElement = document.querySelector(".gauge");

const gauge_shakingElement = document.querySelector(".gaugeshake");

gaugeElement.querySelector(".gauge__fill");
gaugeElement.querySelector(".gauge__cover").textContent = `0%`;

gauge_shakingElement.querySelector(".gauge__fill");
gauge_shakingElement.querySelector(".gauge__cover").textContent = `0%`;

//import dotenv from 'dotenv';

var value = 0;
var totalEmotes = 0;
var totalPercentage = 0;
var maxPercentage = 100;
var trigger = 0;

var currTime = new Date();
var currMinute = currTime.getMinutes();
var previousMinute = currMinute;
var delayTime = 10000; // 10 secs
var nextTime = currTime.getMinutes() + 5; // make 5 a param
var timeoutID;
var firstTime = 1;
var guageIsFadedOut = 0;

function setGaugeValue(gauge, gaugeshake, value) {

 totalEmotes = totalEmotes + value;
 totalPercentage = totalEmotes / maxPercentage;
 if (totalPercentage *100 >= maxPercentage) {
	 trigger = 1;
 }

  console.log ("Total Percetage ",totalPercentage);
  console.log ("Total Emotes ",totalEmotes);
  console.log ("Value ", value);
  console.log ("Total Emote % ", (totalEmotes * .01) / 2);



 // gauge.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes * .01) / 2}turn)`;
  //gauge.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes) * (1.8)}deg)`;
  //gauge.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;

  //gaugeshake.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes) * (1.8)}deg)`;
  //gaugeshake.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;


// check if the shaking count has been reached.
// if so swith the visibility of the two meters
//

if (totalEmotes >= 10) {

// This needs to change because opacity still takes up space.

	//gaugeElement.style.opacity = 0; 
console.log("I am here")
console.log("total Emotes in here: ", totalEmotes);
// *********************************************************

document.getElementById("showGauge").style.display = "none";
document.getElementById("showShake").style.display = "";

gaugeshake.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes) * (1.8)}deg)`;
gaugeshake.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;

}

else {
 // gauge.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes * .01) / 2}turn)`;
 gauge.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes) * (1.8)}deg)`;
 gauge.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;

 gaugeshake.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes) * (1.8)}deg)`;
 gaugeshake.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;
 document.getElementById("showShake").style.display = "none";

}

};

//*********************  Goes Here ****************/

client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) return;

	if(message.toLowerCase() === '!resetmeter') {
		value = 0;
		totalEmotes = 0;
		trigger = 0;
		return;
	};

	if(tags.emotes == null){
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
				end: parseInt(split[1]),
			});
		}
	}


	length = all.length;
	
	setGaugeValue(gaugeElement, gauge_shakingElement, length);


	resetTimer(nextTime);


function resetTimer(nextTime){
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
	
		var fadeEffect = setInterval(function () {
			if (!gaugeElement.style.opacity) {  
				gaugeElement.style.opacity = 1;  
			}
			if (gaugeElement.style.opacity > 0) {  
				gaugeElement.style.opacity -= 0.1; 
			} else {
				clearInterval(fadeEffect);
				guageIsFadedOut = 1;
			}
		}, 200);
	}	



	if (firstTime){
		firstTime = 0;
	}
	else {  // clear the last timer and set a new one below
		clearTimeout(timeoutID);
		if (guageIsFadedOut){
			//fade it back in ***************************************************
			gaugeElement.style.opacity = 1;  

			
		}  // *******************************************************************
	}

	
	timeoutID = setTimeout(() => {
			console.log("I'm going to sleep")
			fadeOutEffect();
		}, delayTime); //10 sec for now
				

	return;			
}


//	set timeout for currnt time + idle time (say 5 Mins)

	
	if (trigger){
		client.say(channel, `!boom`);        

		// **** Reset everything ****
		value = 0;
		totalEmotes = 0;
		trigger = 0;
	}

});