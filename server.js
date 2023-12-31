const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("/");
});

app.listen(8080, () => {
  console.log("Server has started");
});
