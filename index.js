// keep alive
function keepalive() {
    const http = require('http');
    const express = require('express');
    const app = express();
    app.get("/", (request, response) => {
        console.log(Date.now() + " Ping Received");
        response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
}
keepalive();

// set alive
const Discord = require("discord.js");
var bot = new Discord.Client();

var game = "league of legends";

bot.on("ready", function() { 
    bot.user.setActivity(game);
    console.log(`Logged in as ${bot.user.tag}!`); 
});

const CMDS = [
    "tony",
    "sig",
    "vroom",
    "sponge",
];
const FOOD_CMDS = [
    "food",
    "hungry",
    "lunch",
    "eat",
    "dinner",
    "breakfast",
    "pizza",
    "buffet",
];
const HI_CMDS = [
    "hi",
    "hey",
    "whats up",
    "what's up",
    "waddup",
    "wat up"
];
const NORMAL_REPLIES = [ 
    "*vrooooooooooM*",
    "Who lives in a pineapple under the sea...",
    "who reviewed this? I bet it was.. ",
    "maaaaaaaaaaaaaaaaaaaaaaaan",
    "wow",
    "can uuuuuuu????",
    "oh my god..",
    "deeevinnn",
    "but i like it...",
    "get me outta hereee",
    "let's play foosball!!",
    "brian",
    "where's brian?",
    "let's go to the gym!",
    "your mom",
    "WHO **WROTE** THIS",
    "devin's mom",
    "I just paired, I didn't do anything",
    "i'm DONE with you",
    "It's Jason's fault",
    "kill me",
    "Reporting someone is retaliation",
    "what are you DOING?",
    "That's racist",
    "This is going on your stakeholders",
    "What the *freak*?",
    "Can you not..?",
    "Probably no thought was put into this",
    "Config conschmig",
    "Oh reeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaally?",
    "**THICC**",
    "I'm just in time for the show...",
    "*dialup noises*",
    "Kyaaaaa~",
    "good one..",
];
const FOOD_REPLIES = [
    "i'm hungry..",
    "Wanna go to honeygrow?",
    "Let's get chipotle",
    "Let's get foood",
    "it's not spicy, devin",
    "how much food did you get?"
];
const HI_REPLIES = [
    "nnn..",
    "hi..."
];
const BYE_REPLIES = [
    "i'm so sad..",
    "DON'T LEAVE ME",
    "i'm leavinng",
    "i'm going home...",
    "let's go home..",
    "Are you LEAVING?",

];
const SIG_REPLIES = [
    "i'm going to SIG",
    "SIG has free computers..",
    "are you going to SIG?!?"
];
const REPLIES = NORMAL_REPLIES.
                concat(FOOD_REPLIES).
                concat(HI_REPLIES).
                concat(BYE_REPLIES).
                concat(SIG_REPLIES); 

// TODO: add test cases
// tony ... [play/ing+] <...>
// tony ... [play/ing+] <...> with <...>
// tony ... [play/ing+] with <...>
// tony ... [play/ing+] with <...> tony
// tony ... [play/ing+] with <...> tony ... with
function getGame(input, author) {
    const PLAY = "play";
    const PLAYING = "playing";

    if (input.includes(PLAYING))
        game = input.substring(input.indexOf(PLAYING) + PLAYING.length);
    else if (input.includes(PLAY))
        game = input.substring(input.indexOf(PLAY) + PLAY.length);

    game = game.replace(/\b[-.,()&$#!\[\]{}"']+\B|\B[-.,()&$#!\[\]{}"']+\b/g, "");

    if (game.indexOf("tony") != game.lastIndexOf("tony"))
        game = game.substring(0, game.lastIndexOf("tony"));

    var who = "";
    var index = game.lastIndexOf("with")
    if (index > 0)
    {
        who = game.substring(index + 4);
        game = game.substring(0, index); 

        if (who.indexOf("tony") > 0)
            who = who.substr(0, who.indexOf("tony"));
        if (who.match(/ me /gi))
            who = who.replace(/ me /gi, author);
        if (who.replace(/ /gi/"").length > 0)
            game += " with " + who;
    }

    return game;
}

// REPLY
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (message.author.tag.toLowerCase().includes("tony")) return;
    if (message.author.discriminator.toLowerCase().includes("tl7732")) return;

    var input = message.content.toLowerCase();
    if (!CMDS.some(v => input.includes(v))) return;

    var random = REPLIES[Math.floor(Math.random()*REPLIES.length)];
    var food_random = FOOD_REPLIES[Math.floor(Math.random()*FOOD_REPLIES.length)];
    var hi_random = HI_REPLIES[Math.floor(Math.random()*HI_REPLIES.length)];
    var bye_random = BYE_REPLIES[Math.floor(Math.random()*BYE_REPLIES.length)];
    var sig_random = SIG_REPLIES[Math.floor(Math.random()*SIG_REPLIES.length)];

    if (random.includes("reviewed"))    random += message.author;

    if (input.includes("help"))         message.reply("call me tony!");
    else if (input.includes("vroom"))   message.channel.send(NORMAL_REPLIES[0]);
    else if (input.includes("sponge"))  message.channel.send(NORMAL_REPLIES[1]);
    else if (FOOD_CMDS.some(f => input.includes(f)))    message.channel.send(food_random);
    else if (HI_CMDS.some(h => input.includes(h)))      message.reply(hi_random);
    else if (input.includes("bye"))     message.reply(bye_random);
    else if (input.includes("sig"))     message.channel.send(sig_random);
    else if (input.includes("play"))
    {
        bot.user.setActivity(getGame(input, message.author.tag));
        // message.channel.send("fine...");
    }
    else 
        message.channel.send(random);
});

// LOGIN
var fs = require('fs');
fs.readFile('token', (err, data) => {
    if (err)  data = process.env.TOKEN;              // .env file - glitch
    else      data = data.toString().split("\n")[0]; // local file
    bot.login(data);
});
