const MQTTBroker = require('./Mqtt');
const Sensor = require('./Sensor.1');
const LambdaHandler = require('./Lambda');
const AlarmHandler = require('./Alarm');

const broker = new MQTTBroker();

const sensor1 = new Sensor('sensor-001', broker);

const lambdaHandler = new LambdaHandler(broker);
lambdaHandler.start();

const alarmHandler = new AlarmHandler(broker);
alarmHandler.start();

sensor1.connect();

// setInterval(() => {
  console.log('\n=== Broker State ===');
  broker.listClients();
  broker.listSubscriptions();
  broker.listRetainedMessages();
  console.log('=====================\n');
// }, 5000);

setTimeout(() => {
  console.log('[Main] Stopping the sensor...');
  sensor1.stop();
}, 10000);








// const RuleEngine = require('./rule-engine');
// const DynamoDB = require('./dynamo-db');

// // Initialize the broker
// const broker = new MQTTBroker();

// // Initialize the simulated DynamoDB
// global.DynamoDB = DynamoDB;
// DynamoDB.createTable('myDDB');

// // Initialize sensors
// const sensor1 = new Sensor('sensor-001', broker, 'topic/sensor1', ['temperature', 'pressure', 'altitude']);
// const sensor2 = new Sensor('sensor-002', broker, 'topic/sensor2', ['humidity', 'light']);

// // Initialize the rule engine
// const ruleEngine = new RuleEngine(broker);

// // Connect sensors
// sensor1.connect();
// sensor2.connect();

// // Simulate stopping sensors after 10 seconds
// setTimeout(() => {
//   sensor1.stop();
//   sensor2.stop();
// }, 10000);
