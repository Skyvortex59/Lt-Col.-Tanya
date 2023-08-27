// Server.js

const express = require('express');
const path = require('path');
const multer = require('multer');
const { processFile } = require('./fileProcessor.js');

class Server {
  constructor() {
    this.app = express();
    this.port = 8081;
    this.server = null;
    this.initialize();
  }

  initialize() {
    this.configureMiddleware();
    this.configureRoutes();
    this.startListening();
  }

  configureMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(express.urlencoded({ extended: true }));

    // Configuration de Multer pour gérer les fichiers téléchargés
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Storage/zip'));
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    });

    this.upload = multer({ storage: storage });
  }

  configureRoutes() {
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../web/index.html'));
    });
    
    // Route pour gérer le téléchargement du fichier
    this.app.post('/upload', this.upload.single('file'), async (req, res) => {
      const uploadedFile = req.file;
      if (uploadedFile) {
        // Fonction de mise à jour de la progression
        const updateProgress = (progress) => {
          // Envoyer la progression au client via Socket.io ou tout autre moyen
          // Par exemple : socket.emit('progress', progress);
        };
    
        // Appel de la fonction pour traiter le fichier téléchargé en passant la fonction de mise à jour de la progression
        await processFile(uploadedFile, updateProgress);
        res.send('File uploaded and processed successfully.');
      } else {
        res.status(400).send('No file uploaded.');
      }
    });
    

    // Ajoutez ici d'autres routes selon vos besoins
  }

  startListening() {
    this.server = this.app.listen(this.port, () => {
      console.log(`\nServer is listening on port ${this.port}`);
    });

    process.on('SIGINT', () => {
      this.stopListening();
    });
  }

  stopListening() {
    if (this.server) {
      this.server.close();
      console.log('Server stopped listening.');
    }
  }
}

module.exports = Server;
