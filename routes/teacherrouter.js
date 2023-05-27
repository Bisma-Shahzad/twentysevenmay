const express = require("express");
const teacherModel = require('../models/teacherModel');
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const result = await teacherModel.find();
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    } catch (e) {
        console.log(e);
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
    }
});
route.get("/search", async (req, res) => {
    let { name } = req.body;
    if (name) {
        let result = await teacherModel.find({
            name: name,
        });
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    }
});
route.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const result = await teacherModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    } catch (e) {
        console.log(e);
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
    }
});
route.post("/", async (req, res) => {
    let { name, contact, course } = req.body;
    try {
        let errArr = [];

        if (!name) {
            errArr.push("Required : name");
        }
        if (!contact) {
            errArr.push("Required : contact");
        }
        if (!course) {
            errArr.push("Required : course");
        }


        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        } else {
            let obj = { name, contact, course };
            let teacher = new teacherModel(obj);
            await teacher.save();
            if (!teacher) {
                res
                    .send(sendResponse(false, null, "Internal Server Error"))
                    .status(400);
            } else {
                res.send(sendResponse(true, teacher, "Saved Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal Servre Error"));
    }
});
route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await teacherModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
            let updateResult = await teacherModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updateResult) {
                res.send(sendResponse(false, null, "Error")).status(404);
            } else {
                res
                    .send(sendResponse(true, updateResult, "Updated Successfully"))
                    .status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Error")).status(400);
    }
});
route.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await teacherModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this ID")).status(404);
        } else {
            let delResult = await teacherModel.findByIdAndDelete(id);
            if (!delResult) {
                res.send(sendResponse(false, null, "Error")).status(404);
            } else {
                res.send(sendResponse(true, null, "Deleted Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "No Data on this ID")).status(404);
    }
});

module.exports = route;