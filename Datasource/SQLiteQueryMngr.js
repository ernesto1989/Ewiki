/**
 * SQLite Connection Manager
 * 
 * A collection of abstract methods on a SQLite database in
 * order to reduce code writing.
 * 
 * Ernesto Cantú 
 * July 8 2024
 */
const sqlite3 = require('sqlite3').verbose();
var dsPath = 'C:/Conciencia/Projects/EWiki/Demo.db';

/**
 * Class definition for query results.
 * 
 * status property referes to a boolean object that tells if query was succesfully executed.
 * rows contains the result set.
 * gen_id contains a generated id. Works only when insert
 * changes contains the number of affected rows on update and delete.
 * error contains the error message.
 */
class QueryResult{

    constructor(status,rows, gen_id, changes ,err){
        this.status = status;
        this.rows = rows;
        this.gen_id = gen_id;
        this.changes = changes;
        this.err = err;
    }

    getStatus = () => { return this.status;}
    getRows = () => { return this.rows;}
    getGenId = () => { return this.gen_id;}
    getChanges = () => { return this.changes;}
    getErr = () => { return this.err;}
}

/**
 * Method that creates a connection to a specific database
 * @returns an SQLite connection
 */
async function open() {
    let db = new sqlite3.Database(dsPath, (err) => {
        if (err) {
            console.error(err.message);        
        } else {
            console.log(`Connection opened for database ${dsPath}`);
        }
    });
    return db;
}

/**
 * This method abstracts the query to a dataabse without params.
 * 
 * @param {String} query The query that will be executed
 * @returns {Object} An object of the class QueryResult
 */
async function getData(query){
    try{
        console.log("GetData");
        const conn = await open();
        p = new Promise(function (resolve, reject) {
            var result;

            conn.all(query, function(err, rows) {
                conn.close();
                if (err) {
                    console.error(err.message);
                    result = new QueryResult(false,{},0,0,err.message);
                    reject(result);
                } else {
                    result = new QueryResult(true,rows,0,0,'');                
                    resolve(result);
                }      
            });
        });
        return p;
    }catch(error){
      console.log(error);
    }
}

/**
 * This method executes a query with params
 * Perfect for search queries.
 * 
 * @param {String} query the search query
 * @param {Array} params array of params
 * @returns {Object} An object of the class QueryResult
 */
async function getDataWithParams(query,params){
    try{
        console.log("GetData");
        const conn = await open();
        p = new Promise(function (resolve, reject) {
            var result;
            conn.all(query,params, function(err, rows) {
                conn.close();
                if (err) {
                    console.error(err.message);
                    result = new QueryResult(false,{},0,0,err.message);
                    reject(result);
                } else {
                    result = new QueryResult(true,rows,0,0,'');                
                    resolve(result);
                }    
            });
        });
        return p;
    }catch(error){
      console.log(error);
    }
}

/**
 * This method allows to insert an element in the database.
 * 
 * @param {String} query the insert query
 * @param {Array} params the param's array
 * @returns {Object} An object of the class QueryResult
 */
async function insertItem(query,params){
    try{
        console.log("Insert");
        const conn = await open();
        p = new Promise(function (resolve, reject) {
            var result;
            conn.run(query,params, function(err) {
                conn.close();
                if (err) {
                    console.error(err.message);
                    result = new QueryResult(false,{},0,0,err.message);
                    reject(result);
                } else {
                    result = new QueryResult(true,{},this.lastID,0,'');                
                    resolve(result);
                }    
            });
        });
        return p;
    }catch(error){
      console.log(error);
    }
}

/**
 * This method allows update and delete queries on a SQLite Database
 * 
 * @param {String} query the query that will be executed
 * @param {Array} params the param's array
 * @returns {Object} An object of the class QueryResult
 */
async function updateItem(query,params){
    try{
        console.log("Update");
        const conn = await open();
        p = new Promise(function (resolve, reject) {
            var result;
            conn.run(query,params, function(err) {
                conn.close();
                if (err) {
                    console.error(err.message);
                    result = new QueryResult(false,{},0,0,err.message);
                    reject(result);
                } else {
                    result = new QueryResult(true,{},0,this.changes,'');                
                    resolve(result);
                }    
            });
        });
        return p;
    }catch(error){
      console.log(error);
    }
}


module.exports = {getData,getDataWithParams,insertItem,updateItem};