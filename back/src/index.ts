import app from './app';
import * as https from 'https';
import * as fs from 'fs';


const PORT = process.env.PORT;

const httpsOptions = {
//  key: fs.readFileSync('./config/key.pem'),
//  cert: fs.readFileSync('./config/cert.pem')
};

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});