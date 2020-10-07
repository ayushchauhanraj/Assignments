({
    handleCheckboxSelection : function(component,event,value,checked,splitIndex,opportunity) {
        let singleOppDay = component.find('opp');
        let length = singleOppDay.length;
        for(let i = 0 ; i < length ;i++){
            if(value == singleOppDay[i].get('v.name').split(' ')[splitIndex]){
                let index = opportunity.indexOf(singleOppDay[i].get('v.value'));
                if(checked){
                    singleOppDay[i].set('v.checked',true);
                    if(index == -1){
                        opportunity.push(singleOppDay[i].get('v.value'));
                    }
                }else{
                    singleOppDay[i].set('v.checked',false);
                    if(index != -1){
                        opportunity.splice(index,1);
                    }
                }
            }
        }
        component.set('v.opportunity',opportunity);
    },
    
    createOpportunities : function(component,event){
        let allOpportunitiesClosedDates = component.get('v.opportunity');
        let actions = component.get("c.createOpportunityWithClosedDate");
        actions.setParams({"closedDate":allOpportunitiesClosedDates});
        actions.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"success",
                    "title": "Success!",
                    "message": "Opportunity Has been successfully Created."
                });
                toastEvent.fire();
            }else{
                console.log("Some Error !");
            }
        });
        $A.enqueueAction(actions);
    }
})