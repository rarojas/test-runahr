import app from './app';


const PORT = process.env.PORT;

const httpsOptions = {
//  key: fs.readFileSync('./config/key.pem'),
//  cert: fs.readFileSync('./config/cert.pem')
};

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
