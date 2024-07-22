import express from "express";
const port = 3100;

const app = express();

app.get("/", (req, res) => {
  return res.send("App initiated");
});

app.listen(port, () => {
  console.log("server is up & listening on port", port);
});
