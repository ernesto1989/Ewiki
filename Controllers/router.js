
const express = require('express');
const router = express.Router();
const templates = require('./templates')
const sectionsRestApi = require("./API/sectionsRest")
const multer = require('multer');
var fs = require('fs-extra')


/*UI Pages */
router.get('/', templates.index);
router.get('/notes', templates.homePage);
router.get('/sections', templates.sections);

/* API SECTION */
router.get("/notes/api/sections",sectionsRestApi.getData);
router.get("/notes/api/section/id",sectionsRestApi.getOne);
router.post("/notes/api/section",sectionsRestApi.insertItem);
router.put("/notes/api/section",sectionsRestApi.updateItem);
router.delete("/notes/api/section",sectionsRestApi.deleteItem);



/**
 * Generic file upload rest service
 */
const str = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+file.originalname)
    }
});

const upload = multer({ storage: str })

router.post('/notes/api/:url/file-upload', upload.single('file'), (req,res) =>{
    try {
        console.log(req.params.url)
        console.log(req.file.filename)

        fs.move('./upload/' + req.file.filename, './upload/'+req.params.url+'/'+ req.file.filename, function (err) {
            if (err){
                return console.error(err)
                res.status(500).json({ error: error })
            }else{
                console.log("success!")
                res.status(200).json({ success: "file upload successful" })
            }
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
});


module.exports = router;