public class EsriMapAreasController {
    
    @AuraEnabled
    public static List<sObject> getItemsFromRecord (Id recordId, String objectName, String queryFields, String lookupField, String sortString) {
        return Database.query('SELECT Name, Formatted_Tab_URL__c, Coordinates__c, Item_Color__c' +
                              queryFields + ' FROM ' + objectName + ' WHERE ' + lookupField + ' = :recordId' + sortString);
    }
    
}