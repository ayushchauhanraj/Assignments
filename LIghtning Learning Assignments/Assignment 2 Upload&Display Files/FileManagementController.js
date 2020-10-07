({
    handleUploadFinished: function (component, event,handler) {
        var uploadedFiles = event.getParam("files");
        uploadedFiles.forEach(file => console.log(file.name));
        var a = component.get('c.doInit');
        $A.enqueueAction(a);
    },
    doInit: function(component,event,handler){
        let id  = component.get("v.recordId");
        let action = component.get("c.getContentDocs");
        action.setParams({"arecordId":id});
        action.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let attachedDocs = component.get("v.attachedDocs");
                let imageDocs = component.get("v.imageDocs");
                let filesDocs = component.get("v.filesDocs");
                attachedDocs = [];
                imageDocs = [];
                filesDocs = [];
                attachedDocs.push(...response.getReturnValue());
                for(let i =0 ;i < attachedDocs.length ; i++){
                    let fType = attachedDocs[i].FileExtension;
                    attachedDocs[i].FileType = attachedDocs[i].FileType.toLowerCase();
                    if(fType === 'png' || fType === 'jpeg' || fType === 'jpg'){
                        attachedDocs[i].FileExtension  = 'image';
                        imageDocs.push(attachedDocs[i]);
                    }else{
                        let allicons = ['ai','attachment','audio','box_notes','csv','eps','excel','exe','flash','folder','gdoc','gdocs','gform','gpres','gsheet','html','image','keynote','library_folder','link','mp4','overlay','pack','pages','pdf','ppt','psd','quip_doc','quip_sheet','quip_slide','rtf','slide','stypi','txt','unknown','video','visio','webex','word','xml','zip'];
                        if(!allicons.includes(attachedDocs[i].FileExtension)){
                            attachedDocs[i].FileExtension = 'unknown';
                        }
                        filesDocs.push(attachedDocs[i]);
                    }
                }
                component.set("v.attachedDocs",attachedDocs);
                component.set("v.imageDocs",imageDocs);
                component.set("v.filesDocs",filesDocs);
                component.set("v.countOfDocs",attachedDocs.length);
            }else{
                console.log("Some error !");
            }
        });
        $A.enqueueAction(action);
    }
})