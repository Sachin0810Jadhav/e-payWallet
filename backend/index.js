const express = require("express");
const userMiddleware = require("./middlewares/userSignupInputCheck");
const { User } = require("./db/index");
const cors = require("cors");
const userValidation = require("./middlewares/userValidation");
const myRouter = require("./routes/index");
require("dotenv").config();



const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


app.use("/api/v1",myRouter);

app.get("/", (req, res) => {
  res.send("hii");
});



app.post("/note", userValidation, async (req, res) => {
    res.send("note crested suscessfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
