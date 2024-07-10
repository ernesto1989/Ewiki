
const express = require('express');
const router = express.Router();
const templates = require('./templates')
const sectionsRestApi = require("./API/sectionsRest")

//UI Pages

/**
 * Root of the project.
 * 
 * Redirects to home page /notes
 */
router.get('/', templates.index);

/** 
 * Main route - Goes to the index page of the app.
 * 
 * Send to the main page the available sections in order to
 * navigate throug the app.
 */
router.get('/notes', templates.homePage);

/**
 * Renders the Sections Template
 */
router.get('/sections', templates.sections);



/**
 * API SECTION 
 * 
 * Uses the Api/rest.js File to define the disctint api's methods.
 */
router.get("/notes/api/sections",sectionsRestApi.getData);
router.get("/notes/api/section/id",sectionsRestApi.getOne);
router.post("/notes/api/section",sectionsRestApi.insertItem);
router.put("/notes/api/section",sectionsRestApi.updateItem);
router.delete("/notes/api/section",sectionsRestApi.deleteItem);



module.exports = router;