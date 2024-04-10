const express = require("express");
const userRouter = require("./router/userRouter.js");
const bodyParser = require("body-parser");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send(<h1>2Gheter!</h1>);
});

app.use(bodyParser.json());
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log("Servidor online!");
});