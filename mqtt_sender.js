// // publisher.js
// const mqtt = require('mqtt');
// const readline = require('readline');

// // Connect to Mosquitto broker (localhost on port 1884)
// const client = mqtt.connect('mqtt://localhost:1884');

// // Setup readline for terminal input
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // When the client connects to the broker
// client.on('connect', () => {
//     console.log('Connected to Mosquitto broker');
//     console.log('You can now type messages to publish to test/topic.');
//     promptInput();
// });

// // Function to handle user input and publish messages
// function promptInput() {
//     rl.question('Enter your message: ', (input) => {
//         if (input.toLowerCase() === 'exit') {
//             console.log('Exiting publisher...');
//             rl.close();
//             client.end();
//             return;
//         }
//         // Publish the message to 'test/topic'


//         // async function publish
//         //async function publish need to publish the data and the console.log the data on the 'test/topic'
//         //name of the function is async function publish 

//         client.publish('test/topic', input, () => {
//             console.log(`Published: "${input}"`);
//             promptInput(); // Prompt again after publishing
//         });
//     });
// }


const EventEmitter = require('events');
const readline = require('readline');

// Custom EventEmitter to handle publish/subscribe functionality
class MessageBus extends EventEmitter {}
const messageBus = new MessageBus();

// Setup readline for terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Event listener for messages published to 'test/topic'
messageBus.on('test/topic', (message) => {
    console.log(`Message received on 'test/topic': "${message}"`);
});

// Function to handle user input and publish messages
function promptInput() {
    rl.question('Enter your message: ', (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('Exiting publisher...');
            rl.close();
            return;
        }

        // Publish the message to 'test/topic'
        async function publish(topic, message) {
            console.log(`Publishing to ${topic}: "${message}"`);
            messageBus.emit(topic, message); // Emit event for the topic
        }

        publish('test/topic', input).then(() => {
            promptInput(); // Prompt again after publishing
        });
    });
}

console.log('You can now type messages to publish to test/topic.');
promptInput();
