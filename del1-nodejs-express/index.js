const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Received a POST request");
});

app.put("/", (req, res) => {
  res.send("Received a PUT request");
});

app.delete("/", (req, res) => {
  res.send("Received a DELETE request");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
