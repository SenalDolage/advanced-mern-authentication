require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");

connectDb();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

const server = app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/api/auth/`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
