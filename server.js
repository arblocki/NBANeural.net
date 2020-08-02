
require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
app.use(cors());
const router = express.Router();

const API_PORT = process.env.PORT || 3001;
const isProd = (process.env.NODE_ENV === 'production');

app.set('port', API_PORT); 
console.log("Running on port " + app.get('port'));

// this is our MongoDB database
var MongoClient = require('mongodb').MongoClient;
const dbRoute =
  'mongodb+srv://' + process.env.MONGO_WEB_USER + ':' + process.env.MONGO_WEB_PW + '@nba-data.nftax.azure.mongodb.net/NBA_ML?retryWrites=true&w=majority';

// connects our back end code with the database
MongoClient.connect(dbRoute, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to database')
  var dbo = client.db("2019-2020");

  // (optional) only made for logging and
  // bodyParser, parses the request body to be a readable json format
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(logger('dev'));

  // Fetch all games 
  router.get('/getAllGames', (req, res) => {
    dbo.collection('games').find().toArray(function(err, result) {
      if (err) return res.json({ success: false, error: err });
      if (!isProd) { console.log(result.length + ' games received') }
      return res.json({ success: true, data: result })
    });
  });

  // Fetch games for a certain date 
  router.get('/getGames/:date', (req, res) => {
    if (!isProd) { console.log(req.params) }
    dateStr = req.params.date;
    query = { date: dateStr };
    sortByTip = { startTime: 1 }
    dbo.collection('games').find(query).sort(sortByTip).toArray(function(err, result) {
      if (err) return res.json({ success: false, error: err });
      if (!isProd) { console.log(result.length + ' games received') }
      return res.json({ success: true, data: result })
    });
  });

  // Fetch record 
  router.get('/getRecord', (req, res) => {
    dbo.collection('record').find().toArray(function(err, result) {
      if (err) return res.json({ success: false, error: err });
      if (!isProd) { 
        console.log('Record rec\'d: ' + result[0].wins + '-' + result[0].losses + '-' + result[0].pushes); 
      }
      return res.json({ success: true, data: result })
    });
  });

  // append /api for our http requests
  app.use('/api', router);

  if (isProd) {
    // When running in prod, send to production build 
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  } 
  
  // launch our backend into a port
  app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
})
.catch(error => { 
  throw error
});
