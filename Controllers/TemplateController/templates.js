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

const sectionService = require("../../Service/sectionsService")


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
    var menu = [
        {name:'Sections Admin',url:'/manager/sections'},
        {name:'File Upload',url:'/demoFU'},
        {name:'Preferences',url:'/pref'}
    ]

    const sections = await sectionService.getSections();
    res.render('index', { name: 'Ernesto', menu: menu, sections: sections});
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
        const id = req.params.sectionId;
        const qResult = await sectionService.getSectionByID(id);
        const qResult2 = await sectionService.getSubsections(id)
        var section = qResult[0];
        res.render('section_view',{name:section.name,description:section.description,subsections:qResult2});
    }catch(err){
        res.render('section_view',{name:'',description:'',subsections:[]});
    }
}

async function subsectionsView(req,res){
    try{
        const id = req.params.subsectionId;
        const qResult = await sectionService.getSubsectionById(id);
        const qResult2 = await sectionService.getTopics(id)
        var subsection = qResult[0];
        res.render('subsection_view',{name:subsection.name,description:subsection.description,topics:qResult2});
    }catch(err){
        res.render('subsection_view',{name:'',description:"",topics:[]});
    }
}

/**
 * Demo File Upload UI Handler
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function demoFU(req,res){
    res.render('test-upload');
}

module.exports = {index,homePage,sections,sectionsView,subsectionsView,demoFU}