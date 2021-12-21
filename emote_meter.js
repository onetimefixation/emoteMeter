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

//	length = all.length * .01;
	length = all.length;
	
	setGaugeValue(gaugeElement, gauge_shakingElement, length);

//	Timing
//	======
//	query the current Time
var d = new Date(); // for now
d.getHours(); // => 9
d.getMinutes(); // =>  30
d.getSeconds(); // => 5

console.log(d);

//	set timeout for currnt time + idle time (say 5 Mins)
//	   if time expires 
//		      say "tickle me"
//			  then wait a minute, then dissapear the meter
//	     
//		 else 
//		   <the idle timer should then be reset in setGaugeValue when new emote comes in
	
	if (trigger){
		client.say(channel, `!boom`);        

		// **** Reset everything ****
		value = 0;
		totalEmotes = 0;
		trigger = 0;
	}

});





