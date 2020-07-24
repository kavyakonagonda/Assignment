import { LightningElement,api,track,wire } from 'lwc';
import retriveObjectDetails from '@salesforce/apex/AssignmentFetchAccountRecords.retriveObjectDetails';
import retriveDetails from '@salesforce/apex/AssignmentFetchAccountRecords.retriveDetails';
import { NavigationMixin } from 'lightning/navigation';
//import { refreshApex } from '@salesforce/apex';
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord } from 'lightning/uiRecordApi';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ID_FIELD from '@salesforce/schema/Contact.Id';
const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];

export default class AssignmentChildComponent extends NavigationMixin(LightningElement) {
    @track columns;
    @track contacts;
    @api objectName;
    @api mainString;
    @api mainStringList=[];
    @api date;
    @track data = [];
    @track error;
    @track accList ;
    @track opps; 
    @track showTable = false; 
    @track recordsToDisplay = []; 
    @track rowNumberOffset; 
    @track draftValues = [];
    @wire(retriveDetails,{objectName:'$objectName',fieldName:'$mainString'})
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            console.log('data is'+JSON.stringify(data));
            this.contacts=data;
            let recs = [];
            for(let i=0; i<data.length; i++){
                let opp = {};
                opp.rowNumber = ''+(i+1);
                opp.oppLink = '/'+data[i].Id;
                this.date=data[i].CreatedDate;
                console.log('date is'+this.date);
                
                this.items='';
                this.mainStringList=this.mainString.split(',');
                console.log('mainstringlist',this.mainStringList[1]);
                this.columns=[
                   
                    {
                        label: this.mainStringList[1],
                        fieldName: this.mainStringList[1],
                    
                    },
                    {
                        label: this.mainStringList[2],
                        fieldName: this.mainStringList[2],
                    
                    },
                    {
                        label: this.mainStringList[3],
                        fieldName: this.mainStringList[3],
                    
                    },
                    {
                        label: this.mainStringList[4],
                        fieldName: this.mainStringList[4],
                    
                    },
                    {
                        type: 'action',
                        typeAttributes: { rowActions: actions },
                    }, 
                
                ];
                opp = Object.assign(opp, data[i]);
                recs.push(opp);
            }
            this.opps = recs;
            this.showTable = true;
        }else{
            this.error = error;
        } 
          
    }
    //console.log(this.mainStringList[1]);
    
    handlePaginatorChange(event){
        this.recordsToDisplay = event.detail;
        this.rowNumberOffset = this.recordsToDisplay[0].rowNumber-1;
    } 
    handleRowAction( event ) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log('id is'+row.Id);
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }

    
}