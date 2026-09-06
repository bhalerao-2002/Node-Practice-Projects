const express = require('express');
const { getAllApplications, getApplicationById, createApplication, updateApplication, deleteApplication, urlApplication } = require("../controllers/application.controllers.js")
const authenticate = require("../middleware/auth.middleware.js")
const router = express.Router();

// Here order of route matters
router.use(authenticate);
/**
 * @swagger
 * /application:
 *   get:
 *     tags: [Applications]
 *     summary: Get all job applications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         description: Filter applications by status
 *         schema: { type: string }
 *       - in: query
 *         name: sort
 *         description: Field used to sort applications
 *         schema: { type: string, enum: [createdAt, company, position, status], default: createdAt }
 *       - in: query
 *         name: order
 *         description: Sort direction
 *         schema: { type: string, enum: [asc, desc], default: desc }
 *       - in: query
 *         name: page
 *         description: Page number
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         description: Number of applications per page
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *     responses:
 *       200:
 *         description: Applications returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationListResponse'
 *       400:
 *         description: Invalid pagination parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to fetch applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Authentication required
 */
router.get('/', getAllApplications);

/**
 * @swagger
 * /application/{id}:
 *   get:
 *     tags: [Applications]
 *     summary: Get an application by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/applicationId'
 *     responses:
 *       200:
 *         description: Application returned successfully
 *       404:
 *         description: Application not found
 */
router.get('/:id', getApplicationById)

/**
 * @swagger
 * /application:
 *   post:
 *     tags: [Applications]
 *     summary: Create a job application
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationInput'
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Company and position are required
 */
router.post('/', createApplication);

/**
 * @swagger
 * /application/urlredirect:
 *   post:
 *     tags: [Applications]
 *     summary: Redirect to an application URL
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [url]
 *             properties:
 *               url: { type: string, format: uri, example: https://example.com/jobs/123 }
 *     responses:
 *       302:
 *         description: Redirect issued
 */
router.post('/urlredirect', urlApplication);

/**
 * @swagger
 * /application/{id}:
 *   patch:
 *     tags: [Applications]
 *     summary: Update a job application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/applicationId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationUpdate'
 *     responses:
 *       200:
 *         description: Application updated successfully
 *       400:
 *         description: Invalid application ID or request body
 *       404:
 *         description: Application not found
 */
router.patch('/:id', updateApplication);

/**
 * @swagger
 * /application/{id}:
 *   delete:
 *     tags: [Applications]
 *     summary: Delete a job application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/applicationId'
 *     responses:
 *       200:
 *         description: Application deleted successfully
 *       404:
 *         description: Application not found
 */
router.delete('/:id', deleteApplication)

module.exports = router;