const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require('cors');
const { db_url } = require("./db_config");
const route_conf = require("./routes");
const { routes } = route_conf;
const { addBook } = require("./BookListActions/addBook");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8000;

// db connection
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
    console.log("connection error", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
})

app.listen(PORT, () => {
    console.log(`app is listening to PORT ${PORT}`)
})

// Routers handler
app.post(routes.ADD_BOOK, addBook)