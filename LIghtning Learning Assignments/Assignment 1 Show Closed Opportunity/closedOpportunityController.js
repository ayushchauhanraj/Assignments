({
    getOpp:function(component, event, helper) {
        let action = component.get("c.getClosedOpportunity");
        action.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.opportunites",response.getReturnValue());
            }else{
                console.log("Failed With State : " + state);
            }
        });
        $A.enqueueAction(action);
    },
})