require("dotenv").config();
const express = require("express");
const { json } = require("express");
const cors = require("cors");
const getVideoInfo = require("./controller/getVideoInfo");

const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use("/api/video", require("./Routes/Video"));
app.use("/api/callback", require("./Routes/callBack"));
app.listen(PORT, () => {
  console.log(`TO DO list backend is listening on http://localhost:${PORT}`);
});

app.use("/", (req, res) => {
  res.json({ success: true, Endpoint: "home" });
});
