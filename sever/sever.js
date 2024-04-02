
const config = require("./config/db")

const { default: mongoose } = require("mongoose");
const app = require("./app")


async function startServer() {
  try {
      await mongoose.connect(config.db.uri);
      console.log("Connected to the database!");

      const PORT = config.app.port;
      app.listen(PORT, () => {
          console.log(`Sever is running on port ${PORT}.`);
      });
  } catch (error) {
      console.log("Cannot connect to the database!",error);
      process.exit();
  }
}

startServer();
