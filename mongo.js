// homeSafetySystemHandler.js
const mongoose = require('mongoose');
const generateHomeSafetySystemData = require('./homeSafetySystemDataGenerator');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// Define schema
const homeSafetySystemSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    gasLeakage: String,
    motionDetected: Boolean
});

// Define mod



// const AWS = require('aws-sdk');
// const dynamoDB = new AWS.DynamoDB.DocumentClient();
// const sns = new AWS.SNS();
// const lambda = new AWS.Lambda();
// exports.handler = async (event) => {
//     const message = JSON.parse(event.Records[0].Sns.Message);
//     const personStatus = message.person;
//     let doorStatus = personStatus === 'known' ? 'open' : 'closed';
// 	if (personStatus === 'known') {
//         // Example of getting data from the Thing Shadow
//         const iotdata = new AWS.IotData({ endpoint: 'YOUR_I'})