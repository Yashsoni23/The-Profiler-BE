const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const router = require("./route/app");
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require("cors")
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 5000;

dotenv.config({ path: '/config.env' });



if (process.env.NODE_ENV == "production") {
    app.use(express.static("FE/build"))
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'FE', 'build', 'index.html')
        )
    })

}
app.listen(PORT, () => {
    console.log("app started");
});
app.use(fileUpload({
    useTempFiles: true
}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);



