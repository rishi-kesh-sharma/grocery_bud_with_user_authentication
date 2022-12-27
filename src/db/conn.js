const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("connection not successful");
    console.log(err);
  });
