class Lambda1 {
    async handle(data) {
      console.log(`[Lambda1] Processing data from Sensor1:`, data);
  
      if (data.temperature > 30) {
        console.log(`[Lambda1] Temperature (${data.temperature}°C) exceeds threshold. Writing "Switch ON AC" command.`);
  
        const item = {
          command: "Switch ON AC",
          triggeredBy: 'Lambda1',
          temperature: data.temperature,
          timestamp: new Date().toISOString(),
        };
  
        await this.putToDynamoDB('myDDB', item);
      }
    }
  
    async putToDynamoDB(table, item) {
      console.log(`[DynamoDB] Lambda1 writing to table "${table}":`, item);
      return new Promise((resolve) => {
        setTimeout(() => {
          global.DynamoDB.put(table, item);
          resolve();
        }, Math.random() * 2000); // Simulate async delay
      });
    }
  }
  
  module.exports = new Lambda1();
  