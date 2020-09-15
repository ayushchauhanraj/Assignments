public class ContactCreate {
    @auraEnabled
    public static contact createContact(contact contactRecord){
            insert contactRecord;
            return contactRecord;
    }
}
