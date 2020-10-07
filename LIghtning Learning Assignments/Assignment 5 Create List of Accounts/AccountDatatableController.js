({
    init: function (component, event, helper) {
        var actions = [
            { label: 'view', name: 'view' },
            { label: 'edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ];
        component.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'Name' },
            { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
            { label: 'Site', fieldName: 'Site', type: 'Text' },
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        let action = component.get("c.fetchAccountData");
        action.setCallback(this,function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let data = component.get("v.data");
                component.set('v.data',response.getReturnValue());
            }else{
                console.log('Some Problem');
            }
        });
        $A.enqueueAction(action);
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'view':
                component.find("navId").navigate({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId : row.Id , 
                        actionName: 'view', 
                        objectApiName: 'Account' 
                    }}, true);
                break;
            case 'edit':
                component.find("navId").navigate({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId : row.Id , 
                        actionName: 'edit',  
                        objectApiName: 'Account'
                    }}, true);
                break;
            case 'delete':
                helper.removeRecord(component, row);
                break;
        }
    }
})