const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
app = express();
const routes = require("./routes/employee.routes");
app.use(express.json());

app.use('/api/v1', routes)

const PORT = process.env.PORT || 4000;
const start = async () => {
    await connectDB(process.env.DB_URL)
    app.listen(PORT, console.log('server is listening to port ' + PORT))
}
start();
