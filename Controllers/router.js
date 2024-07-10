
const express = require('express');
const router = express.Router();
const templates = require('./TemplateController/templates')
const sectionsRestApi = require("./API/sectionsRest")
const fuRestApi = require("./API/fuRest")
const multer = require('multer');
var fs = require('fs-extra')


/*UI Pages */
router.get('/', templates.index);
router.get('/notes', templates.homePage);
router.get('/notes/sections', templates.sections);
router.get('/notes/demoFU', templates.demoFU);


/* API SECTION */
router.get("/notes/api/sections",sectionsRestApi.getData);
router.get("/notes/api/section/id",sectionsRestApi.getOne);
router.post("/notes/api/section",sectionsRestApi.insertItem);
router.put("/notes/api/section",sectionsRestApi.updateItem);
router.delete("/notes/api/section",sectionsRestApi.deleteItem);
router.get("/notes/api/section/:loadFile",sectionsRestApi.manageFileUpload);

router.get("/notes/api/demoFU",fuRestApi.getData);
router.get("/notes/api/demoFU/id",fuRestApi.getOne);
router.post("/notes/api/demoFU",fuRestApi.insertItem);
router.put("/notes/api/demoFU",fuRestApi.updateItem);
router.delete("/notes/api/demoFU",fuRestApi.deleteItem);
router.get("/notes/api/demoFU/:loadFile",fuRestApi.manageFileUpload);



/**
 * Generic file upload rest service
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