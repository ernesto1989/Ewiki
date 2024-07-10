import { w2form, w2grid, query, w2confirm, w2popup, w2ui } from 'https://rawgit.com/vitmalina/w2ui/master/dist/w2ui.es6.min.js'

function openPopupWindow(){
    w2popup.open({
        title   : 'Sections',
        body    : '<div id="form" style="width: 100%; height: 100%;"></div>',
        style   : 'padding: 15px 0px 0px 0px',
        width   : 700,
        height  : 380,
        showMax : true,
        async onToggle(event) {
            await event.complete
            w2ui.form.resize();
        }
    })
    .then((event) => {
        w2ui.form.render('#form')
    });
}

function createNewForm(isNewItem, selectedItem){
    var gridRecord;
    if(isNewItem){
        gridRecord = {
            recid: 0,
            name: '',
            url: '',
            description: ''
        };
    }else{
        gridRecord = {
            recid: selectedItem.recid,
            name: selectedItem.name,
            url:selectedItem.url,
            description:selectedItem.description
        };
    }

    w2ui.form = new w2form({
        name: 'form',
        style: 'border: 0px; background-color: transparent;',
        fields: [
            { field: 'name', type: 'text', required: true, html: { label: 'Section Name' } },
            { field: 'url', type: 'text', required: true, html: { label: 'Section URL' } },
            { field: 'description', type: 'textarea', required: false, html: { label: 'Description', attr: 'style="width: 400px; height: 60px; resize: none"' } }
        ],
        record: gridRecord,
        actions: {
            Reset() { 
                if(isNewItem)
                    this.clear() 
                else{
                    this.record = gridRecord
                }
            },
            Save() { 
                var arr = this.validate() 
                if(arr.length == 0){
                    var toSaveItem = this.record; 
                    if(toSaveItem.recid === 0){
                        $.post('/notes/api/section', toSaveItem, function(respuesta){
                            w2popup.close(); 
                            w2ui.myGrid.reload();
                        });
                    }else{
                        $.ajax({
                            type: 'PUT',
                            url: '/notes/api/section',
                            data: toSaveItem,
                            async: false,
                            dataType: "json",
                            success: (data,state) => {
                                w2popup.close(); 
                                w2ui.myGrid.reload();
                            }
                            
                        }); 
                    } 
                }else{
                  alert("Missing info");
                }
            }
        }
    });

}

$("document").ready(()=>{
    let myGrid = new w2grid({
        name   : 'myGrid',
        box : '#myGrid',
        header  : 'WIKI Sections',
        show: {
            toolbar: true,
            toolbarAdd: true,
            toolbarEdit: true,
            toolbarDelete: true
        },
        toolbar: {
            items: [
                { type: 'break' },
                { type: 'button', id: 'upload', text: 'Upload File', icon: 'fa fa-file' }
            ],
            onClick: function (target, data) {
                if(target === 'upload')
                    alert("Not implemented yet!");
            }
        },
        url:"/notes/api/sections",
        columns: [
            { field: 'name', text: 'Section Name', size: '15%' },
            { field: 'url', text: 'URL', size: '15%' },
            { field: 'description', text: 'Description', size: '70%' }
        ],
        onAdd:function(){
            createNewForm(true,{});
            openPopupWindow();
        },
        onEdit:function(e){
            let selectedElement = myGrid.get(myGrid.getSelection());
            createNewForm(false,selectedElement[0]);
            openPopupWindow();
        },
        onDelete:function(e){
            e.preventDefault();
            var element = myGrid.get(myGrid.getSelection())[0];
            w2confirm('Are you sure you want to delete this section? RECID: ' + element.recid,
            function btn(answer) {
                console.log(answer); // Yes or No -- case-sensitive
                if(answer === 'yes'){
                    $.ajax({
                        type: 'DELETE',
                        url: '/notes/api/section',
                        data: element,
                        async: false,
                        dataType: "json",
                        success: (data,state) => {
                            w2popup.close(); 
                            w2ui.myGrid.reload();
                        }
                        
                    }); 
                }
            })
        }
    });    
});