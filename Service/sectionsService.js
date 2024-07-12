const db = require('../Datasource/SQLiteQueryMngr')


async function getSections(){
    try{
        var query = 'SELECT id,name,description FROM sections';
        qResult = await db.getData(query);
        return qResult.rows; //will only exec if await promise resolve
    }catch(err){
        return [];//will only exec if await promise reject
    }
}

async function getSectionByID(id){
    try{
        var query = 'SELECT * FROM sections WHERE id = ?';
        var params =[id];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;   
    }catch(err){
        return [];
    }
}


async function getSubsections(sectionId){

    try{
        const query = 'SELECT * FROM subsections WHERE section_id = ?';
        const params =[sectionId];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

async function getSubsectionById(subsectionId){
    try{
        const query = 'SELECT * FROM subsections WHERE id = ?';
        const params =[subsectionId];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

async function getTopics(subsectionId){
    try{
        const query = 'SELECT * FROM topics WHERE subsection_id = ?';
        const params =[subsectionId];
        qResult = await db.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}


module.exports = {getSections,getSectionByID,getSubsections,getSubsectionById,getTopics}