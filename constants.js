const dsPath = 'C:/Conciencia/Projects/EWiki/Demo.db';


// queries

const allSectionsQuery = 'SELECT id,name,description FROM sections';
const sectionByIdQuery = 'SELECT * FROM sections WHERE id = ?';
const allSubsectionsQuery = 'SELECT * FROM subsections WHERE section_id = ?';
const subsectionByIdQuery = 'SELECT * FROM subsections WHERE id = ?';
const allTopicsQuery = 'SELECT * FROM topics WHERE subsection_id = ?';
const topicContentQuery = 'SELECT * FROM content WHERE topic_id = ?';


//URLS 

const indexURL = '/';
const contextURL = '/notes';
const loginURL = '/login';
const logoutURL = '/logout';
const sectionsURL = '/sections/:sectionId';
const subsectionsURL = '/subsections/:subsectionId';
const topicsURL = '/topic/:topicId';

module.exports= {
    dsPath,
    allSectionsQuery,
    sectionByIdQuery,
    allSubsectionsQuery,
    subsectionByIdQuery,
    allTopicsQuery,
    topicContentQuery,
    indexURL,
    loginURL,
    logoutURL,
    contextURL,
    sectionsURL,
    subsectionsURL,
    topicsURL
}