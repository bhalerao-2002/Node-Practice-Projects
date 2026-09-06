const fs = require('fs');
const mongoose = require("mongoose");
const Job = require("../models/application.model");

// const filePath = path.join(__dirname, "../applicationData.json")

function readData() {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw).applications;
}

function writeData(applications) {
    fs.writeFileSync(filePath, JSON.stringify({ applications }, null, 2));
}

function sendSuccess(res, statusCode, data) {
    return res.status(statusCode).json({ "status": true, "Data": data })
}

function sendFailure(res, statusCode, data) {
    return res.status(statusCode).json({ "status": false, "Error Msg": data })
}

exports.getAllApplications = async (req, res) => {
    try {
        const { status, sort = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;

        const pageNumber = Number(page);
        const pageSize = Number(limit);

        if (!Number.isInteger(pageNumber) || pageNumber < 1) {
            return sendFailure(res, 400, "Invalid Pagination params")
        }

        if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
            return sendFailure(res, 400, "Page Limit must be between 1 and 100");
        }

        //Filter

        const filter = {};
        if (status) {
            filter.status = status;
        }

        //sorting
        const allwoedSortFields = [
            "createdAt", "company", "position", "status"
        ];

        const sortField = allwoedSortFields.includes(sort)
            ? sort : "createdAt";

        const sortOrder = order === "asc" ? 1 : -1;

        const sortOptions = {
            [sortField]: sortOrder,
            _id: -1
        }

        //offset - limit
        const skip = (pageNumber - 1) * pageSize;

        //query

        const [applications, total] = await Promise.all([
            Job.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(pageSize)
                .lean(),

            Job.countDocuments(filter)
        ]);

        sendSuccess(res, 200, {
            applications,
            pagination: {
                page: pageNumber,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
                hasNextPage: pageNumber < Math.ceil(total / pageSize),
                hasPrevioutPage: pageNumber > 1
            }
        });
    } catch (err) {
        console.error(err);

        sendFailure(res, 500, "Failed to fetch applications")
    }
}

exports.getApplicationById = async (req, res) => {
    // const id = Number(req.params.id);
    // const application = readData().find((app) => app.id === id);

    const id = req.params.id;
    const application = await Job.findById(id);

    if (!application) {
        return sendFailure(res, 404, "Application not found")
    };

    sendSuccess(res, 200, application);
}

exports.createApplication = async (req, res) => {
    const { company, position, status } = req.body;

    if (!company || !position) {
        return sendFailure(res, 400, "Company and position is mandatory Field/s")
    }

    // const applications = readData();
    // //id calc
    // const nextId = applications.length > 0 ? Math.max(...applications.map((a) => a.id)) + 1 : 1; const appliedDate = new Date().toISOString().split("T")[0];
    // const newApplication = {
    //     id: nextId,
    //     company,
    //     role,
    //     status: status || "applied",
    //     appliedDate
    // }
    // applications.push(newApplication);

    // writeData(applications);

    const result = await Job.create({
        company,
        position,
        status
    })

    sendSuccess(res, 201, `New Application Added with id : ${result.id}`);
}

exports.updateApplication = async (req, res) => {
    // const id = Number(req.params.id);
    // let applications = readData();
    // let application = applications.find((app) => app.id === id);

    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        return sendFailure(
            res,
            400,
            `Invalid application id: ${id}`
        );
    }

    const { company, position, status } = req.body;

    const updatedApplication = await Job.findByIdAndUpdate(id, {
        ...(company !== undefined && { company }),
        ...(position !== undefined && { position }),
        ...(status !== undefined && { status }),
        $inc: { version: 1 }
    },
        { new: true, runValidators: true })

    if (!updatedApplication) {
        return sendFailure(res, 404, "Application Don't exist with given id");
    }
    // writeData(applications);

    sendSuccess(res, 200, `Application with id : ${updatedApplication.id} and version : ${updatedApplication.version} is updated successfully`);
}

// exports.deleteApplication = (req, res) => {
//     const applications = readData();
//     const id = Number(req.params.id);

//     const idx = applications.findIndex((app) => app.id === id);

//     if (idx === -1) {
//         return sendFailure(res, 404, `There is no application with id : ${id}`);
//     }

//     applications.splice(idx, 1);
//     writeData(applications);
//     sendSuccess(res, 200, `Application with id : ${id} is successfully deleted.`)
// }

exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return sendFailure(
                res,
                400,
                `Invalid application id: ${id}`
            );
        }

        const deletedApplication = await Job.findByIdAndDelete(id);

        if (!deletedApplication) {
            return sendFailure(
                res,
                404,
                "Application not found"
            );
        }

        return sendSuccess(
            res,
            200,
            `Application with id : ${id} is successfully deleted.`
        );

    } catch (error) {
        console.error(error);

        return sendFailure(
            res,
            500,
            "Failed to delete application"
        );
    }
};



exports.urlApplication = async (req, res) => {
    const { url } = req.body;
    res.redirect(url);
}
