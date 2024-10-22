import express from "express";
import createForm from "./forms/Forms";

const app = express();
const port = 4040;
app.get("/forms", createForm("https://api2.launchingmax.com/old-docs/json"));
app.listen(port, () => {
  console.log("listening on", port);
});
