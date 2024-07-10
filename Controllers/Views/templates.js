async function index(req,res){
    res.redirect('/notes');
}

async function homePage(req,res){
    var menu = [
        {name:'Sections Admin',url:'/sections'},
        {name:'File Upload',url:'/demoFU'},
        {name:'Preferences',url:'/pref'}
    ]

    res.render('index', { name: 'Ernesto', menu: menu, sections: sections});
}

async function sections(req,res){
    res.render('sections');
}

async function demoFU(req,res){
    res.render('test-upload');
}

module.exports = {index,homePage,sections,demoFU}