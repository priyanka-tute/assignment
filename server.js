var app = require("./app");
//  var debug = require("debug")("file-upload-nodejs:server");
// var http = require("http");

// var server = http.createServer(() => {
//   console.log("Server is up...");
// });
// app = app.route("/assignment");

const port = process.env.PORT || 3002;
// app.listen("/assignment");
app.listen(port, () => {
  console.log("Server listening on port ", port);
});
