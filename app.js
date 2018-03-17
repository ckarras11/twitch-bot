const tmi = require('tmi.js');
const fetch = require('node-fetch');
const { BOT_NAME, OATH, CHANNEL, TWITTER_MSG, KEY} = require('./config');

const options = {
    options: {
        debug: true
    },
    connection: {
        cluster: 'aws',
        reconnect: true
    },
    identity: {
        username: BOT_NAME,
        password: OATH
    },
    channels: [CHANNEL]
};

const client = new tmi.client(options);

client.connect();

client.on('chat', (channel, user, message, self) => {
    if(message === '!hello') {
        client.action(CHANNEL, `Hello ${user['display-name']}`)
    }
    if(message === '!twitter') {
        client.action(CHANNEL, TWITTER_MSG )
    }
    if(message === '!quote') {
        const init = {
            method: 'GET',
            headers: {
                "X-Mashape-Key": KEY,
                "X-Mashape-Host": "andruxnet-random-famous-quotes.p.mashape.com"
            }
        }
        fetch("https://andruxnet-random-famous-quotes.p.mashape.com/?count=10&cat=famous", init)
            .then(res => res.json())
            .then(data => client.action(CHANNEL, `${data.quote} -${data.author}`))
    }
})

client.on('join', (channel, username, self) => {
    if(self) return;
    client.action(CHANNEL, `Welcome ${username}`)
})

