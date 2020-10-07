public class OpportunityCreation {
    @auraEnabled
    public static void createOpportunityWithClosedDate(List<String> closedDate){
        List<Opportunity> opportunityList = new List<Opportunity>();
        for(Integer i = 0 ; i < closedDate.size(); i++){
            Date dt = Date.parse(closedDate[i]);
            opportunityList.add(new Opportunity(name='opportunity'+i,StageName='Closed Won',CloseDate = dt ));
        }
        insert opportunityList;
    }
}