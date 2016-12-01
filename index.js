/*-+-+-+-+-+ +-+-+-+
|R|a|m|u| |K|a|k|a|
+-+-+-+ +-+-+-+-+-*/

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

/*~~~~~~~~~~~
Bot Functions
Starts Here
~~~~~~~~~~~~*/

// Bot starts a conversation before listen to any keyword

bot.say({
      text: "Welcome to our test zone!",
      channel: 'G38RUGE4D' // channel Id for #slack_integration
  });


// Listen a keyword and mention back to the user

controller.hears('are you listening to me',['direct_mention', 'mention'],function(bot, message) {
  bot.reply(message, 'Most likely <@'+message.user+'>');
});


// Sends image as attachment

controller.hears('demo images','direct_message,direct_mention',function(bot,message) {
  var reply_with_attachments = {
    'username': 'My bot' ,
    'text': 'This is how we promote',
    'attachments': [
      {
        'fallback': 'As of November 2016, GSIUXD has 390+ members.',
        'title': 'GSIUXD Featured',
        'text': 'Click here to join in less than 30 secs',
        'color': '#36a64f'
      }
    ],
    'image_url': 'https://github.com/abinashmohanty/slack-chat-bot/blob/master/img/img-demo-gsiuxd-slack.png'
    }

  bot.reply(message, reply_with_attachments);
});




// Replies to Hello

controller.hears(['hello'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'thumbsup',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});


// Replies random greeting messages


controller.hears(['hi','aloha'], 'direct_message', function(bot, message) {
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


// the bellow is slack specific handle
controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})





controller.hears(['ramukaka', 'ramu', 'kakaramu', 'ramu kaka', 'ramu ji', 'kaka'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {
  bot.reply(message, 'Did you mention my name?')
})



// the following script hears for
// "gsiuxd invite" or "ux group invite"

controller.hears(['get gsiuxd invite', 'gsiuxd invite','slack invite', 'ux slack invite', 'group invite'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {


bot.reply(message, 'Here is the slack invite link to join in less than 30 secs *<http://www.gsiuxd.co/join-ux-slack-community-india/|GSIUXD Invite>*')
});


// Replies my my short bio

controller.hears(["what's your name?", 'what is your name', 'your name', 'your real name'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, 'My name is Ramu kaka.\n You can also call me kaka, ramu\n or just say `Help Needed`.')
});



// Replies Yep! when hear cool, awesome, etc.

controller.hears(["that's cool", 'nice', 'hmm', 'awesome', 'great'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, 'Yep!')
});


// Replies whre did you born?

controller.hears(["who made you?", 'who built you?'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, 'I was designed and tested by my master')
});


// Replies are you from india?

controller.hears(["are you from india?"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, "Yes!")
});


// Replies who is your master?

controller.hears(["who is your master?", "Who's your master?"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, "It's confidential!:blush:");
});


// Let me introduce ramu kaka

controller.hears(["me introduce"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.reply(message, "Thank you :thumbsup:");
});



// Replies Welcome, Don't mention, etc when hear thank you, etc.

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


// Replies to thank you related messages

controller.hears(['Okay','cool','wow','superb', 'excellent','hm.','hm..','i see', 'alright', 'ok','yes'], ['direct_message','direct_mention','mention'], function(bot, message) {

  bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'thumbsup',
  }, function(err, res) {
      if (err) {
          bot.botkit.log('Failed to add emoji reaction :(', err);
      }
  });

});


// Replies to negative keywords as part of our community rules!

controller.hears(['anus','arse','arsehole','ass', 'ass-hat','ass-jabber','assbag','asscock', 'assclown', 'asscock','assfuck','assface','asshat','asshead', 'asshole','assshit','assshole','asssucker', 'Whore', 'motherfucker','mother fucker'], ['direct_message','direct_mention','mention'], function(bot, message) {

  bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'no_entry_sign',
  }, function(err, res) {
      if (err) {
          bot.botkit.log('Failed to add emoji reaction :(', err);
      }
  });

  controller.storage.users.get(message.user, function(err, user) {
      if (user && user.name) {
          bot.reply(message, 'Hello ' + user.name + '!!');
      } else {
          bot.reply(message, "These words are no allowed in here!\n Please read our *<www.example.com|community guidelines>*." );
      }
  });

});


// Replies to users when they feel sorry about something

controller.hears(['oops','oops!','my bad','sorry', 'sorry!'], ['direct_message','direct_mention','mention'], function(bot, message) {

  var message_options = [
    "It's Okay.",
    "It's Fine.",
    "No Problem.",
    "That's fine."
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


// remembers and call out the user name

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

controller.hears(['what is my name', "do you know my name", "do you remember me", "do you remember my name", "what's my name", "Who am I", 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});



// Bot - identify yourself
/*
controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
*/




// Replies a link with hyperlinked text

controller.hears(["community website", "our website link"], [ 'direct_message','direct_mention','mention'], function (bot, message) {

      bot.reply(message,{
        text: "Here is the link to *<http://www.gsiuxd.co|GSIUXD Website>*",
        /*username: "@ramukaka",*/
        icon_emoji: ":man_with_turban:", // added bot existing icon to work
      });

});



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


// replies to users why bot doesn't understand the given text



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
