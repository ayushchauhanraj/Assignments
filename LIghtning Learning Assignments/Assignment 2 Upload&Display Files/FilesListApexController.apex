public class FilesListApexController {
    @AuraEnabled
    public static List<ContentDocument> getContentDocs(Id arecordId)
    {   
        List<ContentDocumentLink> CDLs = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :arecordId];
        if (CDLs.size() < 1) return new List<ContentDocument>(); 

        List <Id> CDIdList = new List <Id> ();
        for (ContentDocumentLink nextCDL : CDLs) {
            CDIdList.add(nextCDL.ContentDocumentId); }        
        
        List<ContentDocument> entries = [SELECT Id,FileExtension,ContentSize,LastModifiedDate,Title, FileType FROM ContentDocument WHERE ContentDocument.Id IN :CDIdList];
        return entries;
    }
}