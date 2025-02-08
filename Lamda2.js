// class Lambda2 {
//     async handle(data) {
//       console.log(`[Lambda2] Processing data from Sensor2:`, data);
  
//       if (data.humidity < 40) {
//         console.log(`[Lambda2] Humidity (${data.humidity}%) drops below threshold. Writing "Switch OFF AC" command.`);
  
//         const item = {
//           command: "Switch OFF AC",
//           triggeredBy: 'Lambda2',
//           humidity: data.humidity,
//           timestamp: new Date().toISOString(),
//         };
  
//         await this.putToDynamoDB('myDDB', item);
//       }
//     }
  
//     async putToDynamoDB(table, item) {
//       console.log(`[DynamoDB] Lambda2 writing to table "${table}":`, item);
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           global.DynamoDB.put(table, item);
//           resolve();
//         }, Math.random() * 2000); // Simulate async delay
//       });
//     }
//   }
  
//   module.exports = new Lambda2();
  

class Lambda2 {
  async handle(data) {
    if (data.humidity < 40) {
      console.log(`[Lambda2] Low humidity (${data.humidity}%). Writing "Switch OFF AC" to DB.`);
      const item = { command: "Switch OFF AC", triggeredBy: 'Lambda2', humidity: data.humidity, timestamp: new Date().toISOString() };
      await this.putToDynamoDB('myDDB', item);
    }
  }

  async putToDynamoDB(table, item) {
    console.log(`[DynamoDB] Lambda2 writing to "${table}":`, item);
    return new Promise(resolve => setTimeout(() => {
      global.DynamoDB.put(table, item);
      resolve();
    }, Math.random() * 2000));
  }
}

module.exports = new Lambda2();
