const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const Connection = require("./db");

const userRoutes = require("./routes/userRoutes");

Connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on ${port}...`));
