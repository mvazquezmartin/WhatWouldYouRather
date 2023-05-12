const express = require("express");
const { PORT } = require("./config/app.config");
const router = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(PORT, () => {
  console.log(`Server initialized on PORT:${PORT} `);
});
