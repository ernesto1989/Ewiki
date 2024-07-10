/**
 * https://www.npmjs.com/package/read-excel-file <- Excel file reader
 */

const rest = require('./rest')
const readXlsxFile = require('read-excel-file/node')
const fs = require('fs');


const fuGetAllQuery = 'SELECT id as recid,month,date,qtty FROM file_upload';
const fuSearchBYIdQuery = 'SELECT id as recid,month,date,qtty FROM file_upload WHERE id = ?';
const fuInsertQuery = 'INSERT INTO file_upload(id,month,date,qtty) VALUES (?,?,?,?)';
const fuUpdateQuery = 'UPDATE file_upload SET month = ?,date = ?,qtty = ? WHERE id = ?';
const fuDeleteQuery = 'DELETE FROM sections WHERE id = ?';


async function getData(req,res){
    rest.getData(req,res,fuGetAllQuery);
}

async function getOne(req,res){
    try{
        console.log("GetOne");
        params = [req.body.recid];
        rest.getOne(req,res,fuSearchBYIdQuery,params);
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function insertItem(req,res){
    try{
        console.log("Insert");
        var params = [req.body.recid,req.body.month,req.body.date,req.body.qtty];
        rest.insertItem(req,res,fuInsertQuery,params)
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function updateItem(req,res){
    try{
        console.log("Update");
        var params = [req.body.month,req.body.date,req.body.qtty,req.body.recid];
        rest.updateItem(req,res,fuUpdateQuery,params)
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
        rest.deleteItem(req,res,fuDeleteQuery,params)
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
        console.log("Handle File: " + '/Conciencia/files/demoFU/'+req.params.loadFile);

        readXlsxFile(Buffer.from(fs.readFileSync('/Conciencia/files/demoFU/'+req.params.loadFile))).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            params = [];
            for(var i=1;i<rows.length;i++){
                params.push(rows[i]);
            }
            rest.insertItemsBatch(req,res,fuInsertQuery,params,'/notes/demoFU');
        })
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}
  

module.exports = {getData,getOne,insertItem,updateItem,deleteItem,manageFileUpload};