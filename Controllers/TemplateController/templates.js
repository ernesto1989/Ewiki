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
    console.log(req.params.sv);
    res.render('section_view',{section:req.params.sv});
}

/**
 * Demo File Upload UI Handler
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function demoFU(req,res){
    res.render('test-upload');
}

module.exports = {index,homePage,sections,sectionsView,demoFU}