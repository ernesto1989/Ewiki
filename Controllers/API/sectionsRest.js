const rest = require('./rest')

const sectionsGetAllQuery = 'SELECT id as recid,name,description,url FROM sections';
const sectionsSearchBYIdQuery = 'SELECT id as recid,name,description,url FROM sections WHERE id = ?';
const sectionsInsertQuery = 'INSERT INTO sections(name,url,description) VALUES (?,?,?)';
const sectionsUpdateQuery = 'UPDATE sections SET name = ?,url = ?,description = ? WHERE id = ?';
const sectionsDeleteQuery = 'DELETE FROM sections WHERE id = ?';


async function getData(req,res){
    rest.getData(req,res,sectionsGetAllQuery);
}

async function getOne(req,res){
    try{
        console.log("GetOne");
        params = [req.body.recid];
        rest.getOne(req,res,sectionsSearchBYIdQuery,params);
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function insertItem(req,res){
    try{
        console.log("Insert");
        var params = [req.body.name,req.body.url,req.body.description];
        rest.insertItem(req,res,sectionsInsertQuery,params)
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function updateItem(req,res){
    try{
        console.log("Update");
        var params = [req.body.name,req.body.url,req.body.description,req.body.recid];
        rest.updateItem(req,res,sectionsUpdateQuery,params)
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}


async function deleteItem(req,res){
    try{
        console.log("Delete");
        var params = [req.body.recid];
        rest.deleteItem(req,res,sectionsDeleteQuery,params)
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}
  
//https://stackoverflow.com/questions/33214717/why-post-redirects-to-get-and-put-redirects-to-put
//this is why it is a GET!
async function manageFileUpload(req,res){
    try{
        console.log("Handle File: " + req.params.loadFile);
        res.status(200);
        res.json({
            "status"  : "success",
            "total_process_elements"   : 100        
        })
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}
  

module.exports = {getData,getOne,insertItem,updateItem,deleteItem,manageFileUpload};