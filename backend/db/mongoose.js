var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://root:cmpe295@ds147821.mlab.com:47821/smartbidding", {
    poolSize: 10
    // other options can go here
},
    () => {
        console.log("connected to mongoDB");
    }
);

module.exports = { mongoose };