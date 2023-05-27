const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
require("dotenv").config();
const StudentRouter = require('./routes/studentrouter');
const CourseRouter = require('./routes/courserouter');
const instituteModel = require('./routes/instituterouter')
const teacherModel = require('./routes/teacherrouter')


const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/student", StudentRouter);
app.use("/api/course", CourseRouter);
app.use("/api/teacher", teacherModel);
app.use("/api/institute", instituteModel);


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                "Database Connected Successfully and server is listening on this port 5000"
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });