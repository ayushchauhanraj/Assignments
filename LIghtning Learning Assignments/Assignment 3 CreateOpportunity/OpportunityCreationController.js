({
    doInit : function(component, event, helper) {
        let monthDays = component.get('v.monthDays');
        let maxMonthDays = component.get('v.maxMonthDays');
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let year = new Date().getFullYear();
        for(let i = 1 ; i <= months.length ; i++){
            monthDays.push({'Key':i,'Value':new Date(year,i,0).getDate(),'label':months[i-1]});
        }
        for(let i =1; i <= 31 ;i++){
            maxMonthDays[i-1] = i;
        }
        component.set('v.year',year);
        component.set('v.monthDays',monthDays);
        component.set('v.maxMonthDays',maxMonthDays);
    },
    
    handleSelectAll : function(component,event,helper){
        let checked =event.getSource().get('v.checked');  
        let opportunity = component.get('v.opportunity');
        opportunity = [];  
        let singleOppDay = component.find('opp');
        let length = singleOppDay.length;
        for(let i = 0 ;i < length ;i++){
            if(checked){
                opportunity.push(singleOppDay[i].get('v.value'));
                singleOppDay[i].set('v.checked',true);
            }else{
                singleOppDay[i].set('v.checked',false);
            }
        }
        component.set('v.opportunity',opportunity);
    },
    
    handleCheckboxes :  function(component,event,helper){
        let checked = event.getSource().get('v.checked');
        let name = event.getSource().get('v.name');
        let value = event.getSource().get('v.value');
        let opportunity = component.get('v.opportunity');
        if(name === 'days'){
            helper.handleCheckboxSelection(component,event,value,checked,0,opportunity);
        }else if(name === 'months'){
            helper.handleCheckboxSelection(component,event,value,checked,1,opportunity);
        }else{
            let index = opportunity.indexOf(value);
            if(checked && index == -1){
                opportunity.push(value);
            }else{
                if(index != -1){
                    opportunity.splice(index,1);
                }                
            }
            component.set('v.opportunity',opportunity);
        }
    },
    
    createOpportunity:function(component,event,helper){
        console.log('i am inside the opp');
        helper.createOpportunities(component,event);
    },
})