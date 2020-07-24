public with sharing class AssignmentFetchAccountRecords {
    @AuraEnabled(cacheable=true)
    public static list<SObject> retriveDetails(String objectName,String fieldName) {
        String strQuery = 'SELECT '+fieldName+' FROM '+objectName ;
        List<SObject> listData = Database.query(strQuery);
        return listData;
    }
}
