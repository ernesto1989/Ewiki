/**
 * Router configuration file for the specific web application.
 * 
 * 1. Imports the corresponding express library and router.
 * 2. Reads the templates handler file
 * 3. Reads the api handler file
 * 4. Defines a Generic Upload File Rest Service that redirects to a specific 
 *    Upload handler
 * 
 * Ernesto Cantú
 * 07/10/2024
 */
const express = require('express');
const router = express.Router();
const templates = require('./TemplateController/templates')
const sectionsRestApi = require("./API/sectionsRest")
const fuRestApi = require("./API/fuRest")
const multer = require('multer');
var fs = require('fs-extra')


/*TEMPLATES routes */

router.get('/', templates.index);
router.get('/notes', templates.homePage);
router.get('/notes/manager/sections', templates.sections);
router.get('/notes/sections/:sv', templates.sectionsView);
router.get('/notes/demoFU', templates.demoFU);


/* API SECTION */
// NOTES
router.get("/notes/api/sectionMngr",sectionsRestApi.getData);
router.get("/notes/api/sectionMngr/id",sectionsRestApi.getOne);
router.post("/notes/api/sectionMngr",sectionsRestApi.insertItem);
router.put("/notes/api/sectionMngr",sectionsRestApi.updateItem);
router.delete("/notes/api/sectionMngr",sectionsRestApi.deleteItem);
router.get("/notes/api/sectionMngr/:loadFile",sectionsRestApi.manageFileUpload);

//DEMO FILE UPLOAD or GENERIC REST API. PLEASE ERRASE!
router.get("/notes/api/demoFU",fuRestApi.getData);
router.get("/notes/api/demoFU/id",fuRestApi.getOne);
router.post("/notes/api/demoFU",fuRestApi.insertItem);
router.put("/notes/api/demoFU",fuRestApi.updateItem);
router.delete("/notes/api/demoFU",fuRestApi.deleteItem);
router.get("/notes/api/demoFU/:loadFile",fuRestApi.manageFileUpload);



/* Generic file upload service */

/**
 * The disk storage routine defines a fixed location to store the 
 * received files on the server.
 * 
 */
const str = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/Conciencia/files/')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+file.originalname)
    }
});

const upload = multer({ storage: str })

/**
 * GENERIC URL for posting files (Receives all types of files).
 * 
 * How it works:
 * 
 * 1. Receives the file from the client form.
 * 2. Uses the Disk storage constant to generate a random name for the file.
 * 3. After asigning a random name, it enters to the post method. Moves the hole file
 *    to a defined location on the disk.
 * 4. If everything works fine and the file is uploaded, it redirects to a GET endpoint
 *    of a specific type (:url in the request path).
 * 
 */
router.post('/notes/api/file-upload/:url', upload.single('file'), (req,res) =>{
    try {
        console.log(req.params.url)
        console.log(req.file.filename)

        fs.move('/Conciencia/files/' + req.file.filename, '/Conciencia/files/'+req.params.url+'/'+ req.file.filename, function (err) {
            if (err){
                return console.error(err)
                res.status(500).json({ error: error })
            }else{
                console.log("success!");
                res.redirect('/notes/api/' + req.params.url + '/'+req.file.filename);
            }
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
});


module.exports = router;