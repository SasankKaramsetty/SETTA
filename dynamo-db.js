class DynamoDB {
    constructor() {
      this.tables = {};
    }
  
    createTable(tableName) {
      if (!this.tables[tableName]) {
        this.tables[tableName] = [];
      }
    }
  
    put(tableName, item) {
      if (!this.tables[tableName]) {
        console.error(`[DynamoDB] Table "${tableName}" does not exist.`);
        return;
      }
  
      this.tables[tableName].push(item); // Add new item
      console.log(`[DynamoDB] Table "${tableName}" updated:`, this.tables[tableName]);
    }
  }
  
  module.exports = new DynamoDB();
  