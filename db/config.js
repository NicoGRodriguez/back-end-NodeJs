const Mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await Mongoose.connect(process.env.BD_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Interna Server Error");
  }
};

module.exports = {
  dbConnection,
};
