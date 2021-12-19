//TODO: Check that only mods can enter !boom
//TODO:  Why are some emotes showing before !boom
//TODO:  Reconstruct the math so that there is a percentage
//TODO:  Find out what the upper limit is for the total emotes
//TODO: 
//TODO:  Disappear the meter - find out when

const gaugeElement = document.querySelector(".gauge");


//import dotenv from 'dotenv';


var value = 0;
var totalEmotes = 0;
var trigger = 0;

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 1.01) {
    console.log("starting value error");
    return;
  }

 totalEmotes = totalEmotes + value;
 if (totalEmotes >= .1) {
	 trigger = 1;
 }


  console.log ("Total Emotes ",totalEmotes);
  console.log ("Value ", value);

  gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
  gauge.querySelector(".gauge__cover").textContent = `${Math.round(totalEmotes * 100)}%`;
 // gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}%`;
};

      // ------------- for testing only 
const myForm = document.getElementById("myForm");


myForm.addEventListener("submit", (e) => {
        e.preventDefault();

        value = value + .005;
        setGaugeValue(gaugeElement, value);

//console.log("Counter has been incremented by .01");

});
      // ------------- for testing only 

setGaugeValue(gaugeElement, value);

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
	if(message.toLowerCase() === '!hello') {

        //client.say(channel, `!boom FailFish`);
  
		//client.say(channel, `@${tags.username}, heya!`);

	}
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
	//console.log(all);
	//console.log(all.length);
	//totalEmotes = (totalEmotes + all.length) * .01;
	//console.log(totalEmotes);
	length = all.length * .01
	setGaugeValue(gaugeElement, length);
	if (trigger){
		client.say(channel, `!boom`);
		// **** Reset everything ****
		value = 0;
		totalEmotes = 0;
		trigger = 0;
	}

  

});





