require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/error");
const PORT = process.env.PORT;

connectDb();

const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/api/auth/`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
