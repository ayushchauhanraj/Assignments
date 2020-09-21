public with sharing class onlineShoppingServiceImpl implements onlineShoppingService.API {
    public static List<Purchase_Order__c> getPurchaseOrders(String sortExpression){
        return new purchaseOrdersSelector().selectAll(sortExpression);
    }
    
    public static List<Product2> getProducts(){
        return new productSelector(true).selectAll();
    }
    
    public static Purchase_Order__c insertOrder(Purchase_Order__c purchaseOrder,List<Product2> productItemsList, List<PurchaseOrderLineItem__c> purchaseOrderLineItemList){
        fflib_SObjectUnitOfWork uow = new fflib_SObjectUnitOfWork(
            new Schema.SObjectType[] {
                Product2.SObjectType,
                    Purchase_Order__c.SObjectType,
                    PurchaseOrderLineItem__c.SObjectType
                    }
        );
        uow.registerNew(purchaseOrder);
        for(PurchaseOrderLineItem__c purchaseOrderlineItem : purchaseOrderLineItemList){
            uow.registerRelationship(purchaseOrderlineItem,PurchaseOrderLineItem__c.PurchaseOrderId__c,purchaseOrder);
        }
        uow.registerDirty(productItemsList);
        uow.commitWork();
        return purchaseOrder;
    }
}