//Module imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require("./Controllers/router");


function initWebProject(port){
   
    const app = express();
    app.set('view engine', 'ejs');
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static('public'));
     
    app.use(router);

    app.listen(port, () => {
        console.log(`Service running on port ${port}`);
    });

}

module.exports = {initWebProject};