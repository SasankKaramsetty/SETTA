// // const MQTTBroker = require('./Mqtt');
// // class Sensor {
// //   constructor(sensorId, broker) {
// //     this.sensorId = sensorId;
// //     this.broker = broker;
// //     this.interval = null;
// //   }

// //   connect() {
// //     this.broker.connect(this.sensorId, {
// //       LWT: { topic: 'sensor/status', message: JSON.stringify({ sensorId: this.sensorId, status: 'dead' }) },
// //     });
// //     this.startPublishing();
// //   }

// //   startPublishing() {
// //     // this.interval = setInterval(() => {
// //       const data = {
// //         sensorId: this.sensorId,
// //         timestamp: new Date().toISOString(),
// //         temperature: (Math.random() * 20 + 30).toFixed(2),
// //         pressure: (Math.random() * 10 + 100).toFixed(2),
// //         classified: true,
// //       };
// //       this.broker.publish('sensor/data', JSON.stringify(data));
// //     // }, 3000);
// //   }

// //   stop() {
// //     clearInterval(this.interval);
// //     console.log(`[Sensor] Sensor "${this.sensorId}" stopped.`);
// //     this.broker.publish('sensor/status', JSON.stringify({ sensorId: this.sensorId, status: 'dead' }));
// //     this.broker.disconnect(this.sensorId);
// //   }
// // }

// // module.exports = Sensor;








// class Sensor {
//   constructor(sensorId, broker, topic, attributes) {
//     this.sensorId = sensorId;
//     this.broker = broker;
//     this.topic = topic;
//     this.attributes = attributes;
//     this.interval = null;
//   }

//   connect() {
//     console.log(`[Sensor] "${this.sensorId}" connected.`);
//     this.broker.connect(this.sensorId);

//     this.interval = setInterval(() => {
//       const data = this.attributes.reduce((acc, attr) => {
//         acc[attr] = parseFloat((Math.random() * 100).toFixed(2)); // Random value
//         return acc;
//       }, { sensorId: this.sensorId });
//       console.log(`data in the sensor ${JSON.stringify(data)}`);
//       this.broker.publish(this.sensorId, this.topic, JSON.stringify(data));
//     }, 1000); // Publish every second
//   }

//   stop() {
//     clearInterval(this.interval);
//     console.log(`[Sensor] "${this.sensorId}" stopped.`);
//   }
// }

// module.exports = Sensor;




class Sensor {
  constructor(sensorId, broker, topic, attributes) {
    this.sensorId = sensorId;
    this.broker = broker;
    this.topic = topic;
    this.attributes = attributes;
  }

  connect() {
    console.log(`[Sensor] "${this.sensorId}" connected.`);
    this.broker.connect(this.sensorId);

    this.interval = setInterval(() => {
      const data = this.attributes.reduce((acc, attr) => {
        acc[attr] = parseFloat((Math.random() * 100).toFixed(2)); // Random sensor data
        return acc;
      }, { sensorId: this.sensorId });
      console.log(`data in the sensor ${JSON.stringify(data)}`);
      this.broker.publish(this.topic, data);
    }, 2000);
  }

  stop() {
    clearInterval(this.interval);
    console.log(`[Sensor] "${this.sensorId}" stopped.`);
  }
}

module.exports = Sensor;
