// import { mongoWebUser, mongoWebPW } from './config.js';

const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// import { getConfig } from './config.js';

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
var MongoClient = require('mongodb').MongoClient;
const dbRoute =
  'mongodb+srv://<username>:<password>@nba-data.nftax.azure.mongodb.net/NBA_ML?retryWrites=true&w=majority';

// connects our back end code with the database
MongoClient.connect(dbRoute, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to database')
  var dbo = client.db("2019-2020");

  // (optional) only made for logging and
  // bodyParser, parses the request body to be a readable json format
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger('dev'));

  // Fetch all games 
  router.get('/getAllGames', (req, res) => {
    dbo.collection('games').find().toArray(function(err, result) {
      if (err) return res.json({ success: false, error: err });
      console.log(result.length + ' games received');
      return res.json({ success: true, data: result })
    });
  });

  // Fetch games for a certain date 
  router.get('/getGames/:date', (req, res) => {
    console.log(req.params);
    dateStr = req.params.date;
    query = { date: dateStr };
    dbo.collection('games').find(query).toArray(function(err, result) {
      if (err) return res.json({ success: false, error: err });
      console.log(result.length + ' games received');
      return res.json({ success: true, data: result })
    });
  });

  // append /api for our http requests
  app.use('/api', router);

  // launch our backend into a port
  app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

  db.close();
})
.catch(error => { 
  throw err 
});
