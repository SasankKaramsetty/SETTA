// subscriber.js
const mqtt = require('mqtt');

// Connect to Mosquitto broker (localhost on port 1884)
const client = mqtt.connect('mqtt://localhost:1884');

// When the client connects to the broker
client.on('connect', () => {
    console.log('Connected to Mosquitto broker');
    // Subscribe to 'test/topic' to receive messages
    client.subscribe('test/topic', (err) => {
        if (!err) {
            console.log('Subscribed to topic: test/topic');
        } else {
            console.log('Error subscribing to topic:', err);
        }
    });
});

// Handle received messages
client.on('message', (topic, message) => {
    console.log(`Received message from ${topic}: ${message.toString()}`);
});
