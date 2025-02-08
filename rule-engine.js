// const lambda1 = require('./lambda1');
// const lambda2 = require('./lambda2');

// class RuleEngine {
//   constructor(broker) {
//     this.broker = broker;

//     this.broker.subscribe('rule-engine', 'topic/sensor1');
//     this.broker.subscribe('rule-engine', 'topic/sensor2');

//     this.broker.on('message', (clientId, topic, message) => {
//       this.applyRules(topic, message);
//     });
//   }

//   applyRules(topic, message) {
//     switch (topic) {
//       case 'topic/sensor1':
//         console.log(`[RuleEngine] Rule1 triggered for ${topic}`);
//         lambda1.handle(message);
//         break;

//       case 'topic/sensor2':
//         console.log(`[RuleEngine] Rule2 triggered for ${topic}`);
//         lambda2.handle(message);
//         break;

//       default:
//         console.log(`[RuleEngine] No rules for topic: ${topic}`);
//     }
//   }
// }

// module.exports = RuleEngine;

const lambda1 = require('./Lamda1');
const lambda2 = require('./Lamda2');

class RuleEngine {
  constructor(broker) {
    this.broker = broker;

    // Subscribe to sensor topics
    this.broker.subscribe('rule-engine', 'topic/sensor1');
    this.broker.subscribe('rule-engine', 'topic/sensor2');

    this.broker.on('message', (clientId, topic, message) => {
      this.applyRules(topic, message);
    });
  }

  applyRules(topic, message) {
    switch (topic) {
      case 'topic/sensor1':
        console.log(`[RuleEngine] Rule1 triggered for ${topic}`);
        lambda1.handle(message);
        break;

      case 'topic/sensor2':
        console.log(`[RuleEngine] Rule2 triggered for ${topic}`);
        lambda2.handle(message);
        break;

      default:
        console.log(`[RuleEngine] No rules for topic: ${topic}`);
    }
  }
}

module.exports = RuleEngine;
