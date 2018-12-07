'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var multer = require('multer')
// require and use "multer"...

var app = express();

app.use(cors());
app.use(bodyParser());
app.use('/public', express.static(process.cwd() + '/public'));

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })



app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single("upfile"), function(req, res){
    var metaData = req.file;
    //result = { "size" : req.file.size }
   res.json({"name":metaData.originalname,"type":metaData.mimetype,"size":metaData.size});
}) 


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
