// Dependencies
// ===================================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mysql = require("mysql");
var exphbs = require("express-handlebars");

// Start the Express App
// ===================================================================
var app = express();

// Incorporate Body Parser
app.use(bodyParser.urlencoded({
  extended: false
}));

// Incorporate Handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Connect to MySQL
// ===================================================================
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CodingRocks!",
  database: "quotes_db"
});

connection.connect(function (err){
  if (err) {
    console.log("Error connecting" + err.stack);
    return;
  }

  console.log("Successfully connected as id " + connection.threadId);

})

// ROUTES 
// ===================================================================

// Get Route (To retrieve the quotes)
app.get("/", function( req, res ) {

  connection.query("SELECT * FROM QUOTES;", function(err, data) {
    if (err) throw err;
    
    console.log(data);
    res.render("index", { quotes: data})
  })

});

// Post Route (To save new quotes)
app.post("/", function( req, res ) {

  var author = req.body.author;
  var quote = req.body.quote;

  connection.query("INSERT INTO QUOTES (author, quote) VALUES (?, ?)", [author, quote] , function(err, result) {
    if (err) throw err;
    
    console.log("DATA POSTED");
    res.redirect("/");
  })

});


// Put Route (To update quotes)
app.update("/", function( req, res ) {

  // connection.query("SELECT * FROM QUOTES;", function(err, data) {
  //   if (err) throw err;
    
  //   console.log(data);
  //   res.send("DATA LOADED");
  // })

});
// Delete Route (To delete quotes)
app.delete("/", function( req, res ) {

  // connection.query("SELECT * FROM QUOTES;", function(err, data) {
  //   if (err) throw err;
    
  //   console.log(data);
  //   res.send("DATA LOADED");
  // })

});

// LISTENER
// ===================================================================
var port = process.env.PORT || 8080;
app.listen(port, function() { 
  console.log("Listening on PORT " + port);
})