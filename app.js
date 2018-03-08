const tmi = require('tmi.js');
const { BOT_NAME, OATH, CHANNEL, TWITTER_MSG} = require('./config');

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
})

client.on('join', (channel, username, self) => {
    client.action(CHANNEL, `Welcome ${username}`)
})

