const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
//const router = require ('./routes/routas');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//app.use(router);

//const porta = process.env.PORT || 3306;

const porta = 3306;

app.listen(porta, () => {
   console.log(`Servidor iniciado na porta ${porta}`);
});

app.get("/", (request, response) => {
   response.send("Hello World");
});
