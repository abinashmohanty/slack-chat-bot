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

controller.hears(['ramukaka', 'ramu', 'kakaramu', 'ramu kaka', 'ramu ji', 'kaka'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {
  bot.reply(message, 'Did you mention my name?')
})



// the following script hears for
// "gsiuxd invite" or "ux group invite"

controller.hears(['get gsiuxd invite', 'slack invite', 'ux slack invite', 'group invite'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {


bot.startTyping(message, function () {
  // do something here, the "is typing" animation is visible
})


bot.replyWithTyping(message, 'Here is the slack invite link to join in less than 30 secs http://www.gsiuxd.co/join-ux-slack-community-india/')
});


// 1. About Ramu kaka

controller.hears(['whats your name?', 'what is your name', 'your name', 'your real name'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.startTyping(message, function () {
  // do something here, the "is typing" animation is visible
})


  bot.replyWithTyping(message, 'Hello! My name is Ramu, but you can call me kaka, ramu or even ramu kaka.')
});


// 2. That's cool Ramu kaka

controller.hears(['thats cool', 'cool', 'awesome', 'great'], [ 'direct_message','direct_mention','mention'], function (bot, message) {

bot.startTyping(message, function () {
  // do something here, the "is typing" animation is visible
})


  bot.replyWithTyping(message, 'Yep, I will see you afterwards!')
});

// 3. send random greeting messages

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

  bot.startTyping(message, function () {
    // do something here, the "is typing" animation is visible

  })


	bot.replyWithTyping(message, chosen_message)

});


// 5. remember and call out the user name

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
            bot.replyWithTyping(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});
