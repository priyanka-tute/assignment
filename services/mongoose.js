var mongoose = require("mongoose");
const uri = `mongodb+srv://tutedude:${process.env.MONGO_PASSWORD}@cluster0.osgcx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB mongoose database connection established successfully");
});

mongoose.set('debug', true);
