//Rest API DEFINITION

//SQLite Datasource
const db = require('../../Datasource/SQLiteQueryMngr')

async function getData(req,res,getAllQuery){
    try{
        var result = await db.getData(getAllQuery);
        if(result.status){
            //Succeded!
            console.log(result.rows.length);
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : result.getRows().length,
                "records" : result.getRows()        
            });
        }else{
            throw Exception;
        }
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function getOne(req,res,searchBYIdQuery,params){
    try{
        console.log("GetOne");
        var result = await db.getDataWithParams(searchBYIdQuery,params);
        if(result.status){
            //Succeded!
            console.log(result.rows.length);
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : result.getRows().length,
                "records" : result.getRows()  
            });
        }
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function insertItem(req,res,insertQuery,params){
    try{
        console.log("Insert");
        
        var result = await db.insertItem(insertQuery,params);
        if(result.status){
            //Succeded!
            console.log(result.rows.length);
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : 0,
                "records" : {},
                "inserted_id": result.getGenId()
            });
        }
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function insertItemsBatch(req,res,insertQuery,params,redirect){
    try{
        console.log("Insert");
        
        for(var i=0;i<params.length;i++){
            var result = await db.insertItem(insertQuery,params[i]);
        }
        
        if(result.status){
            //Succeded!
            console.log(result.rows.length);
            res.status(303);
            res.redirect(redirect)
        }
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}

async function updateItem(req,res,updateQuery,params){
    try{
        console.log("Update");
        var result = await db.updateItem(updateQuery,params);
        if(result.status){
            //Succeded!
            console.log(result.rows.length);
            res.json({
                "status"  : "success",
                "total"   : 0,
                "records" : {},
                "affected_rows": result.getChanges()
            });
            res.status(200);
        }
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}


async function deleteItem(req,res,deleteQuery,params){
    try{
        console.log("Delete");
        var result = await db.updateItem(deleteQuery,params);
        if(result.status){
            //Succeded!
            console.log(result.rows.length);
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : 0,
                "records" : {},
                "affected_rows": result.getChanges()
            });
        }
    }catch(error){
        console.log(error.getErr());
        res.status(500);
        res.send(error);
    }
}
  

module.exports = {getData,getOne,insertItem,insertItemsBatch,updateItem,deleteItem};