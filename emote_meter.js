//TODO: Check that only mods can enter !boom
//TODO:  Why are some emotes showing before !boom
//TODO:  
//TODO:  Find out what the upper limit is for the total emotes
//TODO: 
//TODO:  Disappear the meter - find out when

const gaugeElement = document.querySelector(".gauge");

gaugeElement.querySelector(".gauge__fill");
gaugeElement.querySelector(".gauge__cover").textContent = `0%`

console.log ("At the top");

//import dotenv from 'dotenv';

var value = 0;
var totalEmotes = 0;
var totalPercentage = 0;
var maxPercentage = 100;
var trigger = 0;

function setGaugeValue(gauge, value) {

 totalEmotes = totalEmotes + value;
 totalPercentage = totalEmotes / maxPercentage;
 if (totalPercentage *100 >= maxPercentage) {
	 trigger = 1;
 }

  console.log ("Total Percetage ",totalPercentage);
  console.log ("Total Emotes ",totalEmotes);
  console.log ("Value ", value);
  console.log ("Total Emote % ", (totalEmotes * .01) / 2);

  gauge.querySelector(".gauge__fill").style.transform = `rotate(${(totalEmotes * .01) / 2}turn)`;
  gauge.querySelector(".gauge__cover").textContent = `${Math.round(totalPercentage * 100)}%`;


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
	
	setGaugeValue(gaugeElement, length);
	
	if (trigger){
		client.say(channel, `!boom`);        

		// **** Reset everything ****
		value = 0;
		totalEmotes = 0;
		trigger = 0;
	}

});





