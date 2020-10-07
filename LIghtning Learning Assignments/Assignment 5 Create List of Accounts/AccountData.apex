public class AccountsData {
    @auraEnabled 
    public static List<Account> fetchAccountData(){
        return [Select Id,Name,Phone,Site from Account Where CreatedDate =  LAST_N_DAYS:30];
    }
    
    @auraEnabled 
    public static void deleteAccount(Id accountId){
        Account acc = new Account(id = accountId);
        delete acc;
    }
}