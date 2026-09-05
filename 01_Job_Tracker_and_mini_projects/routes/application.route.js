const express = require('express');
const { getAllApplications, getApplicationById, createApplication, updateApplication, deleteApplication, urlApplication } = require("../controllers/application.controllers.js")
const authenticate = require("../middleware/auth.middleware.js")
const router = express.Router();

// Here order of route matters
router.use(authenticate);
//Get all Applications
router.get('/', getAllApplications);

//Get Single Application by ID
router.get('/:id', getApplicationById)

router.post('/', createApplication);

router.post('/urlredirect', urlApplication);

router.patch('/:id', updateApplication);

router.delete('/:id', deleteApplication)

module.exports = router;