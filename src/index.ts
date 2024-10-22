import express from "express";
import createForm from "./forms/Forms";

const app = express();
const port = 4040;
app.get("/forms", createForm("http://localhost:2020/_docs/json"));
app.listen(port, () => {
  console.log("listening on", port);
});
