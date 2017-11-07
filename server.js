var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express ();
var PORT = process.env.PORT || 3000;

//Create application/json parser
var jsonParser = bodyParser.json()

//create application form -url encoded parser
var urlencodedParser = bodyParser.urlencoded({extended:false})

// Sets up the Express app to handle data parsing

//parse various different custom JSON types as JSON
app.use(bodyParser.json({type:'application/*+json'}));

//parse some custom thing into a buffer
app.use(bodyParser.raw({type:'application/vnd.custom-type'}));
//parse an html body into a string
app.use(bodyParser.text({type: 'text/html'}));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js") (app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});