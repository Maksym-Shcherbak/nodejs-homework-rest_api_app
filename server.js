const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
console.log(uriDb);

const connection = mongoose.connect(
  uriDb
  // {
  // promiseLibrary: global.Promise,
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // }
);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch(
    (err) => console.log(`Server not running. Error message: ${err.message}`)
    // process.exit(1);
  );
