var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}


// the bellow is slack specific handle
controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})


// the bellow is slack specific handle
controller.hears('message_received', function(bot, message) {
  bot.reply(message, "I'd like to help you, but please try to say something more specific like `ux invite` or `ux design` etc.")
})



controller.hears(['ramukaka', 'ramu', 'kakaramu', 'ramu kaka', 'ramu ji', 'kaka'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {
  bot.reply(message, 'Did you mention my name?')
})



// the following script hears for
// "gsiuxd invite" or "ux group invite"

controller.hears(['get gsiuxd invite', 'gsiuxd invite','slack invite', 'ux slack invite', 'group invite'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {


bot.reply(message, 'Here is the slack invite link to join in less than 30 secs http://www.gsiuxd.co/join-ux-slack-community-india/')
});


// Reply my my short bio

controller.hears(["what's your name?", 'what is your name', 'your name', 'your real name'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, 'Hello! My name is Ramu, but you can call me kaka, ramu or even ramu kaka.')
});



// Reply Yep! when hear cool, awesome, etc.

controller.hears(["that's cool", 'nice', 'cool', 'awesome', 'great'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, 'Yep!')
});


// Reply whre did you born?

controller.hears(["who made you?", 'who built you?'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, 'I was designed and tested by my master')
});


// Reply are you from india?

controller.hears(["are you from india?"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, "Yes!")
});


// Reply who is your master?

controller.hears(["who is your master?", "Who's your master?"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, "It's confidential!:blush:");
});


// Let me introduce ramu kaka

controller.hears(["me introduce"], [ 'direct_message','direct_mention','mention'], function (bot, message) {



bot.reply(message, "Thank you :thumbsup:");
});



// Reply Welcome, Don't mention, etc when hear thank you, etc.

controller.hears(['Thanks','thx','thank u','thank you','thanks a lot', 'thanks man', 'thank you so much'], ['direct_message','direct_mention','mention'], function(bot, message) {
    var message_options = [
    	"You got it",
    	"Don’t mention it",
      "Not a problem",
      "No worries",
      "My pleasure",
      "I’m happy to help",
    	"Anytime"
	]
	var random_index = Math.floor(Math.random() * message_options.length)
	var chosen_message = message_options[random_index]

  bot.reply(message, chosen_message)
    // do something here, the "is typing" animation is visible

});


// Reply to continuing message

controller.hears(['Okay','hmm','hm.','hm..','i see', 'alright', 'ok','yes'], ['direct_message','direct_mention','mention'], function(bot, message) {
    var message_options = [
    	"Yep",
    	"Okay",
      "hmm",
      "cool then",
      "what else?",
	]
	var random_index = Math.floor(Math.random() * message_options.length)
	var chosen_message = message_options[random_index]

  bot.reply(message, chosen_message)
    // do something here, the "is typing" animation is visible

});


// Replies to lol, haha, funny, etc.

controller.hears(['LOL','lmao','LMAO','omg','LOL','lolz','lol.','ha','haha','HAHA','hahahahahaha','bahahaahah','ha.','hehe'], ['direct_message','direct_mention','mention'], function(bot, message) {
    var message_options = [
    	"I'm still learning emotions :thought_balloon:",
    	"What's this? :thought_balloon:",
      "Still need to understand emotions :thought_balloon:",
      "Let me think :thought_balloon:",
      "Should I laugh :thought_balloon:",
      "What does it mean :thought_balloon:",
    	"Hmmmmm.... :thought_balloon:"
	]
	var random_index = Math.floor(Math.random() * message_options.length)
	var chosen_message = message_options[random_index]

  bot.reply(message, chosen_message)
    // do something here, the "is typing" animation is visible

});


// Reply random greeting messages

controller.hears(['hello','hey','hi','aloha'], ['direct_message','direct_mention','mention'], function(bot, message) {
    var message_options = [
    	"Hello there!",
    	"Hello.",
      "Yes, I'm listening...",
      "Hi! How can I help?",
      "Hey, what's up!",
      "Yes, tell me! What are you looking for?",
    	"What's up?"
	]
	var random_index = Math.floor(Math.random() * message_options.length)
	var chosen_message = message_options[random_index]

  bot.reply(message, chosen_message)
    // do something here, the "is typing" animation is visible

});



// remember and call out the user name

controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});


// Reply a link with hyperlinked text

controller.hears(["community website", "our website link"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

      bot.reply(message,{
        text: "Here is the link to <http://www.gsiuxd.co|GSIUXD Website>",
        icon_emoji: ":man_with_turban:", // added bot existing icon to work
      });

});

// This is a demo Update the following later on...
// Reply using attachment basic - understand how it stores information and data

controller.hears(["play games"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

  var reply_with_attachments = {

    "text": "Would you like to play a game?",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "chess",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "maze",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "war",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
}
bot.reply(message, reply_with_attachments);
});
// demo ends...


// Conversation - intro

controller.hears(['How are you?'], 'direct_message, direct_mention, mention', function(bot,message) {

  // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {

    /*convo.say('Hello there!'); */
    convo.say("I'm doing good. :simple_smile: Thanks!");

  });
});

// Conversation -
/*  Hear some keywords as questions
    bot asks, what is it?
    user replies with text as a question
    bot says the text as a question
*/

controller.hears(['I have a question','tell me something', 'ask a question'], 'direct_message, direct_mention, mention', function(bot,message) {

  // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {

    convo.ask('Yes! What is it?',function(response,convo) {

      convo.say('Cool, you said: ' + response.text);
      convo.next();

    });

  })

});







// Example of message.match using "user experience" witout "engineer"

controller.hears('user experience (.*)',["direct_message", "direct_mention"],function(bot,message) {
  var uxType = message.match[1]; //match[1] is the (.*) group. match[0] is the entire group (user experience (.*)).
  if (uxType === 'engineer') {
    return bot.reply(message, 'I\'m afraid I can\'t say more things on UX engineer at this time.');
  }
  return bot.reply(message, 'Say more...');
});


// Reply to users why bot doesn't understand the given text



controller.hears(".*", ["direct_message", "direct_mention"], function (bot, message) {

  var message_options = [
    "Sorry! I don't understand this. Could you be more specific?",
    "Ah! I can only help you with specific topics such as `Slack Invite`, `GSIUXD`, or `Learn UX`",
    "I'm not that smart enough to understand, yet!",
    "Could you be more specific?"
  ]
  var random_index = Math.floor(Math.random() * message_options.length)
  var chosen_message = message_options[random_index]

    bot.reply(message, chosen_message)
});

/*
controller.on(['direct_message','direct_mention','mention'], function(bot, message) {

var message_options = [
  "Come again...",
  "Sorry! I din't catch that.",
  "Sorry! I don't understand this. Could you be more specific?",
  "Hi! How can I help?",
  "Ah! I can only help you with specific topics such as `Slack Invite`, `GSIUXD`, or `Learn UX`",
  "I'm not that smart enough to understand, yet!",
  "Could you be more specific?"
]
var random_index = Math.floor(Math.random() * message_options.length)
var chosen_message = message_options[random_index]

bot.reply(message, chosen_message)

});
*/
