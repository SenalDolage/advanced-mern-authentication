require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const PORT = process.env.port;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
