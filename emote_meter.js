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
gaugeElement.querySelector(".gauge__cover").textContent = `0%`
gauge_shakingElement.querySelector(".gauge__fill");
gauge_shakingElement.querySelector(".gauge__cover").textContent = `0%`

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
  gauge.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes) * (1.8)}deg)`;
  gauge.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;

  gaugeshake.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes) * (1.8)}deg)`;
  gaugeshake.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;

};

const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: { username: 'astro_charles',
		        password: 'oauth:5wbi0v5az77x59vv6c1kv2f11v7egz'
	},
	channels: [ '#astro_charles' ]
});

client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) return;

	if(message.toLowerCase() === '!resetmeter') {
		value = 0;
		totalEmotes = 0;
		trigger = 0;
		return;
	};

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

//if ( currMinute > nextTime)

	//if not the first time then 

	if (firstTime){
		firstTime = 0;
	}
	else {
		clearTimeout(timeoutID);
		//console.log("TimeoutID: in the else", timeoutID)
	}

	// set a new timer
	timeoutID = setTimeout(() => {
		console.log("I'm going to sleep")
		console.log("Need to disappear me")
					}, delayTime); //10 sec for now
				
	//clearTimeout(timeoutID);

//console.log("TimeoutID: ", timeoutID)
//console.log("Current Minute ", currMinute);
//console.log("Next Time ", nextTime);
	return;			
}


//
//
//console.log (nextTime - currMinute)

//	set timeout for currnt time + idle time (say 5 Mins)

	
	if (trigger){
		client.say(channel, `!boom`);        

		// **** Reset everything ****
		value = 0;
		totalEmotes = 0;
		trigger = 0;
	}

});





