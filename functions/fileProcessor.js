const fs = require('fs');
const yauzl = require('yauzl');
const path = require('path');
const axios = require('axios');

function processFile(file) {
  return new Promise((resolve, reject) => {
    const zipFilePath = file.path;
    const folders = [];

    function processEntry(entry, parentPath) {
      if (/\/$/.test(entry.fileName)) {
        const folderName = path.basename(entry.fileName);
        const regex = /^RJ(\d+)/;

        const match = folderName.match(regex);
        if (match) {
          const folderValue = match[0];
          if (!folders.includes(folderValue)) {
            folders.push(folderValue);
          }
        }
      }
    }

    function processEntries(zipfile, parentPath) {
      zipfile.readEntry();
      zipfile.on('entry', (entry) => {
        processEntry(entry, parentPath);

        if (/\/$/.test(entry.fileName)) {
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) throw err;
            readStream.on('end', () => {
              zipfile.readEntry();
            });
            readStream.resume();
          });
        } else {
          zipfile.readEntry();
        }
      });

      zipfile.on('end', async () => {
        const jsonFilePath = path.join(__dirname, '../Storage/result.json');

        let existingData = [];
        if (fs.existsSync(jsonFilePath)) {
          const existingContent = fs.readFileSync(jsonFilePath, 'utf-8');
          const existingJsonData = JSON.parse(existingContent);
          if (Array.isArray(existingJsonData.folders)) {
            existingData = existingJsonData.folders;
          }
        }

        const allData = [...existingData, ...folders];
        const uniqueData = [...new Set(allData)]; // Supprime les doublons

        // Parcourir chaque élément de la liste et envoyer une requête POST distincte
        for (const folder of uniqueData) {
          const jsonData = {
            code: folder,
            request: 'create'
          };
          console.log(jsonData);
          // Envoyer la requête POST à votre API avec l'élément actuel
          try {
            const response = await axios.post('http://localhost/API_php/api/dlsite/', JSON.stringify(jsonData));
            console.log('API response:', response.data);
          } catch (error) {
            console.error('Error sending POST request to API:', error);
            reject(error); // Rejette la promesse en cas d'erreur
            return;
          }
        }

        // Écrire les données dans le fichier result.json
        const jsonData = {
          folders: uniqueData
        };
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
        console.log('Data added to result.json:', jsonData);

        console.log('File processing completed.');

        // Supprimer le fichier zip
        fs.unlinkSync(zipFilePath);
        console.log('Zip file deleted:', zipFilePath);

        resolve(); // Résoud la promesse lorsque le traitement est terminé
      });

      zipfile.on('error', (err) => {
        console.error('An error occurred during file processing:', err);
        reject(err); // Rejette la promesse en cas d'erreur
      });
    }

    yauzl.open(zipFilePath, {
      lazyEntries: true
    }, (err, zipfile) => {
      if (err) {
        console.error('Error opening zip file:', err);
        reject(err); // Rejette la promesse en cas d'erreur
        return;
      }

      processEntries(zipfile, '');

      zipfile.on('end', () => {
        zipfile.close();
      });
    });
  });
}

module.exports = {
  processFile
};