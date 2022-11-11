const dotenv = require("dotenv").config();
const express = require("express");
const http = require("http");
const router = require("./route/app");
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require("cors")
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT ;

// dotenv.config({ path: '/.env' });
console.log(PORT)

app.listen(PORT, () => {
    console.log(`app started at ${PORT}`);
});
app.use(fileUpload({
    useTempFiles: true
}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);



