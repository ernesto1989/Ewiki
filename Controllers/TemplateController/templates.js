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

async function login(req,res){
    res.render('login',{error:0,message:''});
}


async function handleLogin(req,res){
    const { username, password } = req.body;

    const result = await service.searchUser(username,password);

    if(result){
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.name = result.name;
        res.redirect('/notes');
    }else{
        res.render('login',{error:'1',message:'WORNG PASSWORD, TRY AGAIN'});
    }
}

async function handleLogOut(req,res){
    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.render('login',{error:'1',message:'SESSION TERMINATED'});
        }
    });
}




/**
 * Redirects to the home page of the project.
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function homePage(req,res){
    const isLoggedIn = req.session.isLoggedIn;
    const usuario = req.session.username;
    const nombre = req.session.name;
    if(isLoggedIn){
        const menu = [
            {name:'Sections Admin',url:'/manager/sections'},
            {name:'File Upload (DEMO)',url:'/demoFU'},
        ]
    
        const session = [
            {
                username: usuario,
                name: nombre
            }
        ]
        const sections = await service.getSections();
        res.render('index', { menu: menu, session, sections: sections});
    }else{
        res.render('login',{error:'1',message:'NEED TO SIGN IN'});
    }
    
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
    const isLoggedIn = req.session.isLoggedIn;
    const usuario = req.session.username;
    const nombre = req.session.name;

    if(isLoggedIn){
        try{
            const menu = [
                {name:'Sections Admin',url:'/manager/sections'},
                {name:'File Upload (DEMO)',url:'/demoFU'},
            ]
        
            const session = [
                {
                    username: usuario,
                    name: nombre
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
    }else{
        res.render('login',{error:'1',message:'NEED TO SIGN IN'});
    }
}

async function subsectionsView(req,res){
    const isLoggedIn = req.session.isLoggedIn;
    const usuario = req.session.username;
    const nombre = req.session.name;

    if(isLoggedIn){
        try{

            const menu = [
                {name:'Sections Admin',url:'/manager/sections'},
                {name:'File Upload (DEMO)',url:'/demoFU'},
            ]
        
            const session = [
                {
                    username: usuario,
                    name: nombre
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
    }else{
        res.render('login',{error:'1',message:'NEED TO SIGN IN'});
    }
}

async function viewTopic(req,res){
    const isLoggedIn = req.session.isLoggedIn;
    const usuario = req.session.username;
    const nombre = req.session.name;

    if(isLoggedIn){
        const menu = [
            {name:'Sections Admin',url:'/manager/sections'},
            {name:'File Upload (DEMO)',url:'/demoFU'},
        ]

        const session = [
            {
                username: usuario,
                name: nombre
            }
        ]
        const id = req.params.topicId;
        const qResult = await service.getTopicContent(id);
        let c = qResult[0]
        //const content = c.content.replaceAll('<br>','\n')
        res.render('topic',{topicId:id,menu:menu,session:session,name:id,content:c.content})
    }else{
        res.render('login',{error:'1',message:'NEED TO SIGN IN'});
    }
}

async function editTopic(req,res){
    const isLoggedIn = req.session.isLoggedIn;
    const usuario = req.session.username;
    const nombre = req.session.name;

    if(isLoggedIn){
        const menu = [
            {name:'Sections Admin',url:'/manager/sections'},
            {name:'File Upload (DEMO)',url:'/demoFU'},
        ]

        const session = [
            {
                username: usuario,
                name: nombre
            }
        ]
        const id = req.params.topicId;
        const qResult = await service.getTopicContent(id);
        let c = qResult[0]
        //const content = c.content.replaceAll('<br>','\n')
        res.render('topic_edit',{topicId:id,menu:menu,session:session,name:id,content:c.content})
    }else{
        res.render('login',{error:'1',message:'NEED TO SIGN IN'});
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

module.exports = {index,login,handleLogin,handleLogOut,homePage,sections,sectionsView,subsectionsView,viewTopic,editTopic,demoFU}