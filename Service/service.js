const db = require('../Datasource/SQLiteQueryMngr');
const constants = require("../constants");


async function getSections(){
    try{
        var query = constants.allSectionsQuery;
        qResult = await db.getData(query);
        return qResult.rows; //will only exec if await promise resolve
    }catch(err){
        return [];//will only exec if await promise reject
    }
}

async function getSectionByID(id){
    try{
        var query = constants.sectionByIdQuery;
        var params =[id];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;   
    }catch(err){
        return [];
    }
}


async function getSubsections(sectionId){

    try{
        const query = constants.allSubsectionsQuery;
        const params =[sectionId];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

async function getSubsectionById(subsectionId){
    try{
        const query = constants.subsectionByIdQuery;
        const params =[subsectionId];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

async function getTopics(subsectionId){
    try{
        const query = constants.allTopicsQuery;
        const params =[subsectionId];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}


async function getTopicContent(topicId){
    try{
        const query = constants.topicContentQuery;
        const params =[topicId];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

async function searchUser(username,password){
    try{
        const query = constants.userQuery;
        const params =[username,password];
        qResult = await db.getDataWithParams(query,params);
        const user = qResult.rows[0]
        return user;
    }catch(err){
        return [];
    }
}


module.exports = {getSections,getSectionByID,getSubsections,getSubsectionById,getTopics,getTopicContent,searchUser}