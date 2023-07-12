const ssh = require("ssh2-sftp-client")

class SFTPClient {
    constructor() {
        this.client = new ssh();
    }
    async connect(options) {
        console.log(`Connecting to ${options.host}:${options.port}`);
        try {
            await this.client.connect(options);
        } catch (err) {
            console.log('Failed to connect:', err);
        }
    }
    
    async disconnect() {
        await this.client.end();
    }

    async listFiles(remoteDir, fileGlob) {
        console.log(`Listing ${remoteDir} ...`);
        let fileObjects;
        try {
          fileObjects = await this.client.list(remoteDir, fileGlob);
        } catch (err) {
          console.log('Listing failed:', err);
        }
      
        const fileNames = [];
      
        for (const file of fileObjects) {
          if (file.type === 'd') {
            // console.log(`${new Date(file.modifyTime).toISOString()} PRE ${file.name}`);
            console.log("");
          } else {
            // console.log(`${new Date(file.modifyTime).toISOString()} ${file.size} ${file.name}`);
            console.log("");
          }
      
          fileNames.push(file.name);
        }
      
        return fileNames;
      }

};

module.exports = SFTPClient