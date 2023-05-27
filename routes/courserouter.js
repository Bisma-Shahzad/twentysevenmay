const express = require("express");
const courseModel = require("../models/courseModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const result = await courseModel.find();
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
        let result = await courseModel.find({
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
        const result = await courseModel.findById(id);
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
    let { name, shortName, duration, fees } = req.body;
    try {
        let errArr = [];

        if (!name) {
            errArr.push("Required : name");
        }
        if (!shortName) {
            errArr.push("Required : shortName");
        }
        if (!duration) {
            errArr.push("Required : duration");
        }
        if (!fees) {
            errArr.push("Required : fees");
        }

        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        } else {
            let obj = { name, shortName, duration, fees };
            let course = new courseModel(obj);
            await course.save();
            if (!course) {
                res
                    .send(sendResponse(false, null, "Internal Server Error"))
                    .status(400);
            } else {
                res.send(sendResponse(true, course, "Saved Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal Servre Error"));
    }
});
route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await courseModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
            let updateResult = await courseModel.findByIdAndUpdate(id, req.body, {
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
        let result = await courseModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this ID")).status(404);
        } else {
            let delResult = await courseModel.findByIdAndDelete(id);
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