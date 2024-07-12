/**
 * Templates file handler.
 * 
 * It defines async functions to handle template GET requests.
 * Each function handles a single template in the /Ewiki/views
 * folder.
 * 
 * It uses ejs template engine.
 * 
 * Ernesto Cantú
 * 07/10/2024
 */

const service = require("../../Service/service")


/**
 * Index handler. It redirects to the main route of the project.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function index(req,res){
    res.redirect('/notes');
}

/**
 * Redirects to the home page of the project.
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function homePage(req,res){
    const menu = [
        {name:'Sections Admin',url:'/manager/sections'},
        {name:'File Upload (DEMO)',url:'/demoFU'},
    ]

    const session = [
        {
            username: 'Ernesto Cantu'
        }
    ]
    const sections = await service.getSections();
    res.render('index', { menu: menu, session, sections: sections});
}

/**
 * Redirects to the Sections web page to manage sections of the wiki
 * @param {Object} req Client Request
 * @param {Object} res Server Response 
 */
async function sections(req,res){
    res.render('manager/sections');
}

async function sectionsView(req,res){
    try{
        const menu = [
            {name:'Sections Admin',url:'/manager/sections'},
            {name:'File Upload (DEMO)',url:'/demoFU'},
        ]
    
        const session = [
            {
                username: 'Ernesto Cantu'
            }
        ]
        const id = req.params.sectionId;
        const qResult = await service.getSectionByID(id);
        const qResult2 = await service.getSubsections(id)
        var section = qResult[0];
        res.render('section_view',{menu:menu,session:session,name:section.name,description:section.description,subsections:qResult2});
    }catch(err){
        res.render('section_view',{name:'',description:'',subsections:[]});
    }
}

async function subsectionsView(req,res){
    try{

        const menu = [
            {name:'Sections Admin',url:'/manager/sections'},
            {name:'File Upload (DEMO)',url:'/demoFU'},
        ]
    
        const session = [
            {
                username: 'Ernesto Cantu'
            }
        ]
        const id = req.params.subsectionId;
        const qResult = await service.getSubsectionById(id);
        const qResult2 = await service.getTopics(id)
        var subsection = qResult[0];
        res.render('subsection_view',{menu:menu,session:session,name:subsection.name,description:subsection.description,topics:qResult2});
    }catch(err){
        res.render('subsection_view',{name:'',description:"",topics:[]});
    }
}

async function viewTopic(req,res){
    const menu = [
        {name:'Sections Admin',url:'/manager/sections'},
        {name:'File Upload (DEMO)',url:'/demoFU'},
    ]

    const session = [
        {
            username: 'Ernesto Cantu'
        }
    ]
    const id = req.params.topicId;
    res.render('topic',{topicId:id,menu:menu,session:session,name:id})
}

/**
 * Demo File Upload UI Handler
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function demoFU(req,res){
    res.render('test-upload');
}

module.exports = {index,homePage,sections,sectionsView,subsectionsView,viewTopic,demoFU}