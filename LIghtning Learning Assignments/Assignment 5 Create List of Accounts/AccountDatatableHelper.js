({
    removeRecord : function(component,row){
        let action = component.get("c.deleteAccount");
        action.setParams({accountId:row.Id});
        action.setCallback(this,function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let rows = component.get("v.data");
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
				component.set('v.data',rows);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"success",
                    "title": "Deleted!",
                    "message": "The record has been Deleted successfully."
                });
                toastEvent.fire();
            }else{
                console.log('Some Problem');
            }
        });
        $A.enqueueAction(action);
    }
})