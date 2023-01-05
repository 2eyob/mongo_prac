const mongoose = require("mongoose");

const connect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://eyob:1234@cluster0.kh3sxqa.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected`);
  } catch (e) {
    console.log(e);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connect, disconnect };
