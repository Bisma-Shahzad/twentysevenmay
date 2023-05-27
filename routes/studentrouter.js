// const express = require('express')
// const StudentModel = require('../models/studentModel');
// const { sendResponse } = require('../helper/helper')

// const route = express.Router();

// route.get("/", async (req, res) => {
//     try {
//         const result = await StudentModel.find();
//         if (!result) {
//             res.send(sendResponse(false, null, null, "No data found")).status(404)
//         } else {
//             res.send(sendResponse(true, result)).status(200)
//         }
//     }
//     catch (e) {
//         console.log(e)
//         res.send(sendResponse(false, null, null, "Internal Server Error")).status(400)
//     }
// })

// route.get("/search", async (res, req) => {
//     let { firstName, lastName } = req.body;
//     if (firstName) {
//         let result = await StudentModel.find({
//             firstName: firstName,
//             lastName: lastName,
//         })
//         if (!result) {
//             res.send(sendResponse(false, null, null, "No Data founf")).status(404)
//         } else {
//             res.send(sendResponse(true, result)).status(200)
//         }
//     }
// })

// route.get('/:id', async (req, res) => {
//     try {
//         let id = req.params.id;
//         const result = await StudentModel.findById(id)
//         if (!result) {
//             res.send(sendResponse(false, null, null, "No Data Found")).status(404)
//         } else {
//             res.send(sendResponse(true, result)).status(200)
//         }
//     }
//     catch (e) {
//         console.log(e)
//         res.send(sendResponse(false, null, null, "Internal Server Error"))
//     }
// })

// route.post("/", async (req, res) => {
//     let { firstName, lastName, email, password, contact } = req.body
//     try {
//         let errArr = []
//         if (!firstName) {
//             errArr.push("Required: First Name")
//         }
//         if (!lastName) {
//             errArr.push("Required: Last Name")
//         }
//         if (!email) {
//             errArr.push("Required: email")
//         }
//         if (!password) {
//             errArr.push("Required: password")
//         }
//         if (!contact) {
//             errArr.push("Required: contact")
//         }
//         if (errArr.lenght > 0) {
//             res.send(sendResponse(false, null, null, "Required All Fields")).status(400)
//             return;
//         } else {
//             let obj = { firstName, lastName, email, password, contact }
//             let student = new StudentModel(obj)
//             await student.save()
//             if (!student) {
//                 res.send(sendResponse(false, null, null, "No Data Found")).status(404)
//             } else {
//                 res.send(sendResponse(true, student, "Saved Successfully")).status(200)
//             }
//         }
//     }
//     catch (e) {
//         console.log(e)
//         res.send(sendResponse(false, null, null, "Internal server error")).status(400)
//     }
// })

// route.put('/:id', async (req, res) => {
//     try {
//         let id = req.params.id;
//         let result = await StudentModel.findById(id)
//         if (!result) {
//             res.send(sendResponse(false, null, null, "No Data found")).status(404)
//         } else {
//             let updateResult = await StudentModel.findByIdAndUpdate(id, req.body, {
//                 new: true,
//             })
//             if (!updateResult) {
//                 res.send(sendResponse(false, null, null, "Error")).status(400)
//             } else {
//                 res.send(sendResponse(true, updateResult, "Updated Successfully")).status(200)
//             }
//         }
//     }
//     catch (e) {
//         console.log(e)
//         res.send(sendResponse(true, null, null, "Internal server Error")).status(400)
//     }
// })

// route.delete("/:id", async (req, res) => {
//     try {
//         let id = req.params.id
//         let result = await StudentModel.findById(id)
//         if (!result) {
//             res.send(sendResponse(false, null, null, "No student Found")).status(404)
//         } else {
//             let delStudent = await StudentModel.findByIdAndDelete(id)
//             if (!delStudent) {
//                 res.send(sendResponse(false, null, null, "Error")).status(400)
//             } else {
//                 res.send(sendResponse(true, delStudent, "Deleted Successfully")).status(200)
//             }
//         }
//     }
//     catch (e) {
//         console.log(e)
//         res.send(sendResponse(false, null, null, "No Data on this id")).status(404)
//     }
// })

// module.exports = route

const express = require("express");
const studentModel = require("../models/studentModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const result = await studentModel.find();
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
    let { firstName, LastName } = req.body;
    if (firstName) {
        let result = await studentModel.find({
            firstName: firstName,
            LastName: LastName,
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
        const result = await studentModel.findById(id);
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
    let { firstName, lastName, contact, course } = req.body;
    try {
        let errArr = [];

        if (!firstName) {
            errArr.push("Required : First Name");
        }
        if (!contact) {
            errArr.push("Required : Contact");
        }
        if (!course) {
            errArr.push("Required : Course");
        }

        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        } else {
            let obj = { firstName, lastName, contact, course };
            let student = new studentModel(obj);
            await student.save();
            if (!student) {
                res
                    .send(sendResponse(false, null, "Internal Server Error"))
                    .status(400);
            } else {
                res.send(sendResponse(true, student, "Saved Successfully")).status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal Servre Error"));
    }
});
route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
            let updateResult = await studentModel.findByIdAndUpdate(id, req.body, {
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
        let result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this ID")).status(404);
        } else {
            let delResult = await studentModel.findByIdAndDelete(id);
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