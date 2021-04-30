require("dotenv").config();
require("./database/index.js")();

const express = require("express");
const colors = require("colors");
const app = express();
const port = process.env.PORT || 8081;

app.set("view engine", "ejs");
app.use(express.static("./views"));

app.use("/", require("./routers/oauth/index.js"));
app.use("/", require("./routers/controller/redirectPage.js"));
app.use("/", require("./routers/controller/renderPage.js"));
app.use("/dashboard", require("./routers/config/dashboard.js"));
// app.use("/", require("./routers/payments/paypal.js"));

app.listen(port, () => {
    console.log(colors.green(`[SERVER] - Servidor Iniciado com Sucesso na Porta ${port};`));
});