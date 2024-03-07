const express = require("express");
const app = express();
const cors = require("cors");


const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/dishes");
const orderRouter = require("./routes/order");
const usersRouter = require("./routes/users");
const config = require("./config/db");
const MongoDB = require("./utils/mongodb_utils");


app.use(cors());
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

async function startServer() {
  try {
      await MongoDB.connect(config.db.uri);
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
