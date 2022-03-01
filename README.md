# Emote Meter
Used by viewers to spam emotes in chat
When the chat reaches a certain threshold, this will trigger a "!boom" command
This "!boom" command spams a predefined overlay with emotes

The emote configuration is controled by the features of Stream Elements


## Getting Started

Follow the instructions below to install these additional commands to your Twitch channel

### Prerequisites




### Installing to Stream Elements and OBS


1) In Stream Elements
    - Chat Commands
        kappagen / boom
    My Overlays
        > create new
        > Position, size and style
            ?????
        >    Center Widget
        >    SAVE
        > Go to EMOTESPLOSIONS
        > SELECT EMOTES
        >    SAVE

    - Copy URL (on top right (chain))


OBS
    Create New Source - BROWSER
    Name it
    Paste the copied URL
    Change WIDTH and HEIGHT to ???????????????

## Add the RP_Creds code where applicable to the emote_meter file

add it between the following lines :

//*********************  Goes Here ****************/



//*********************  Ends Here ****************/

## Configurable Parameters ( in emote_meter_vxx.js)

Look for the box that says :
// **********************************  YOU CAN CHANGE THESE  ********************************* //

totalEmotesAllowed = nn;               // TOTAL # OF EMOTES NEEDED TO GOET TO 100%
max_Emotes_Accepted_Per_Message = nn;  // ONLY RECOGNIZE THESE MANY EMOTES PER MESSAGE PER USER 
startToWiggle = nn;                    // THIS IS DISABLED AT THIS TIME //
marqueeTimer = 11000;                  // TIME IN MILLISECS FOR THE TRAIN EMOTES TO RUN e.g. 11000 = 11 secs
delayTime = 60000;                     // 1 sec = 1000 , 30 sec = 30000 
const endMessage = "message"           // A MESSAGE CAN BE ADDED JUST BEFORE THE METER DISSAPEARS


## Built With

index.html
styles.css
emote_meter.js
package.json
tmi.min.js 