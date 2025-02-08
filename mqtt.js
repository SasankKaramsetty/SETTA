const mqtt = require('mqtt');

// const client = mqtt.connect('mqtt://broker.hivemq.com');
const client = mqtt.connect('mqtt://localhost:1884');  // Change to your custom port (e.g., 1884)

const readline = require('readline');

// Readline setup for terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('connect', () => {
    console.log('Connected to Mosquitto broker');
    client.subscribe('test/topic', (err) => {
        if (!err) {
            console.log('Subscribed to topic: test/topic');
            console.log('You can now type messages to publish.');
            promptInput();
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message from ${topic}: ${message.toString()}`);
});

// Function to prompt for user input and publish messages
function promptInput() {
    rl.question('Enter your message: ', (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('Exiting program...');
            rl.close();
            client.end();
            return;
        }
        client.publish('test/topic', input, () => {
            console.log(`Published: "${input}"`);
            promptInput(); // Prompt again after publishing
        });
    });
}
