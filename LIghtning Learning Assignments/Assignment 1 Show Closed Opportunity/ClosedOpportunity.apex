global class ClosedOpportunity {
	@auraEnabled
    global static List<Opportunity> getClosedOpportunity(){
        return [Select Name,Account.Name,CloseDate,Amount,LeadSource from Opportunity WHERE CloseDate < TODAY];
    }
}